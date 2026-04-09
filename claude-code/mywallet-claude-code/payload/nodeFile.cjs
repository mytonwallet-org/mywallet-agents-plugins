"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodeFileStorage = createNodeFileStorage;
exports.resolveDefaultNodeFileStoragePath = resolveDefaultNodeFileStoragePath;
var _nodeCrypto = require("node:crypto");
var _promises = require("node:fs/promises");
var _nodeOs = require("node:os");
const HEADLESS_STORAGE_DIR_NAME = 'mywallet';
const HEADLESS_STORAGE_FILE_NAME = 'storage.json';
const BIGINT_STORAGE_TAG = '__mtw_bigint';
const UINT8_ARRAY_STORAGE_TAG = '__mtw_uint8array';
const LOCK_DIR_SUFFIX = '.lock';
const LOCK_METADATA_FILE_NAME = 'owner.json';
const LOCK_STALE_MS = 30_000;
const LOCK_RETRY_DELAY_MS = 50;
const LOCK_MAX_ATTEMPTS = 200;
function createNodeFileStorage(config) {
  const filePath = resolveStorageFilePath(config);
  let operationPromise = Promise.resolve();
  return {
    async getItem(name) {
      const data = await readStorageFile(filePath);
      return data[name];
    },
    async setItem(name, value) {
      await enqueueOperation(async () => {
        await mutateStorageFile(filePath, data => {
          data[name] = value;
          return data;
        });
      });
    },
    async mutateItem(name, mutate) {
      return enqueueOperation(async () => {
        let nextValue;
        await mutateStorageFile(filePath, data => {
          nextValue = mutate(data[name]);
          data[name] = nextValue;
          return data;
        });
        return nextValue;
      });
    },
    async removeItem(name) {
      await enqueueOperation(async () => {
        await mutateStorageFile(filePath, data => {
          delete data[name];
          return data;
        });
      });
    },
    async clear() {
      await enqueueOperation(async () => {
        await mutateStorageFile(filePath, () => ({}));
      });
    },
    async getAll() {
      return readStorageFile(filePath);
    },
    async setMany(items) {
      await enqueueOperation(async () => {
        await mutateStorageFile(filePath, data => ({
          ...data,
          ...items
        }));
      });
    },
    async getMany(keys) {
      const data = await readStorageFile(filePath);
      return Object.fromEntries(keys.map(key => [key, data[key]]));
    }
  };
  function enqueueOperation(callback) {
    const nextPromise = operationPromise.then(callback, callback);
    operationPromise = nextPromise.then(() => undefined, () => undefined);
    return nextPromise;
  }
}
function resolveDefaultNodeFileStoragePath() {
  let profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HEADLESS_STORAGE_DIR_NAME;
  return joinFilePath((0, _nodeOs.homedir)(), `.${HEADLESS_STORAGE_DIR_NAME}`, profile, HEADLESS_STORAGE_FILE_NAME);
}
function resolveStorageFilePath(config) {
  if (config.path) {
    return resolveFilePath(expandNodeFileStoragePath(config.path));
  }
  if (config.profile) {
    return resolveDefaultNodeFileStoragePath(config.profile);
  }
  throw new Error('Node file storage requires an explicit `path` or `profile`');
}
function expandNodeFileStoragePath(filePath) {
  return filePath.replace(/\$\{HOME\}/g, (0, _nodeOs.homedir)());
}
async function mutateStorageFile(filePath, mutate) {
  const releaseLock = await acquireStorageLock(filePath);
  try {
    const data = await readStorageFile(filePath);
    await writeStorageFile(filePath, mutate(data));
  } finally {
    await releaseLock();
  }
}
async function acquireStorageLock(filePath) {
  const lockDirPath = `${filePath}${LOCK_DIR_SUFFIX}`;
  const lockMetadata = JSON.stringify({
    pid: process.pid,
    createdAt: Date.now()
  });
  await (0, _promises.mkdir)(dirnamePath(filePath), {
    recursive: true
  });
  for (let attempt = 1; attempt <= LOCK_MAX_ATTEMPTS; attempt++) {
    try {
      await (0, _promises.mkdir)(lockDirPath);
      await (0, _promises.writeFile)(joinFilePath(lockDirPath, LOCK_METADATA_FILE_NAME), lockMetadata, 'utf8');
      return async () => {
        try {
          await (0, _promises.rm)(lockDirPath, {
            recursive: true,
            force: true
          });
        } catch (err) {
          if ((err === null || err === void 0 ? void 0 : err.code) !== 'ENOENT') {
            throw err;
          }
        }
      };
    } catch (err) {
      if ((err === null || err === void 0 ? void 0 : err.code) !== 'EEXIST') {
        throw err;
      }
      if (await isStaleLock(lockDirPath)) {
        await (0, _promises.rm)(lockDirPath, {
          recursive: true,
          force: true
        });
        continue;
      }
      if (attempt === LOCK_MAX_ATTEMPTS) {
        throw new Error(`Timed out acquiring node-file storage lock for ${filePath}`);
      }
      await wait(LOCK_RETRY_DELAY_MS);
    }
  }
  throw new Error(`Failed to acquire node-file storage lock for ${filePath}`);
}
async function isStaleLock(lockDirPath) {
  try {
    const lockStat = await (0, _promises.stat)(lockDirPath);
    return Date.now() - lockStat.mtimeMs >= LOCK_STALE_MS;
  } catch (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
      return false;
    }
    throw err;
  }
}
function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
async function readStorageFile(filePath) {
  try {
    const content = await (0, _promises.readFile)(filePath, 'utf8');
    return JSON.parse(content, reviveStorageValue);
  } catch (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
      return {};
    }
    throw err;
  }
}
async function writeStorageFile(filePath, data) {
  await (0, _promises.mkdir)(dirnamePath(filePath), {
    recursive: true
  });
  const tempFilePath = `${filePath}.${process.pid}.${(0, _nodeCrypto.randomUUID)()}.tmp`;
  const content = JSON.stringify(data, replaceStorageValue);
  await (0, _promises.writeFile)(tempFilePath, content, 'utf8');
  await (0, _promises.rename)(tempFilePath, filePath);
}
function replaceStorageValue(_key, value) {
  if (typeof value === 'bigint') {
    return {
      [BIGINT_STORAGE_TAG]: value.toString()
    };
  }
  if (value instanceof Uint8Array) {
    return {
      [UINT8_ARRAY_STORAGE_TAG]: Array.from(value)
    };
  }
  return value;
}
function reviveStorageValue(_key, value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return value;
  }
  if (BIGINT_STORAGE_TAG in value) {
    return BigInt(value[BIGINT_STORAGE_TAG]);
  }
  if (UINT8_ARRAY_STORAGE_TAG in value) {
    return new Uint8Array(value[UINT8_ARRAY_STORAGE_TAG]);
  }
  return value;
}
function joinFilePath() {
  for (var _len = arguments.length, parts = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
    parts[_key2] = arguments[_key2];
  }
  const separator = parts.some(part => part.includes('\\')) ? '\\' : '/';
  const [firstPart = '', ...restParts] = parts.filter(Boolean);
  if (!firstPart) {
    return '';
  }
  const normalizedFirstPart = firstPart === '/' || firstPart === '\\' ? firstPart : firstPart.replace(/[\\/]+$/, '');
  const normalizedRestParts = restParts.map(part => part.replace(/^[\\/]+|[\\/]+$/g, '')).filter(Boolean);
  if (!normalizedRestParts.length) {
    return normalizedFirstPart;
  }
  const base = normalizedFirstPart.endsWith(separator) ? normalizedFirstPart.slice(0, -1) : normalizedFirstPart;
  return `${base}${separator}${normalizedRestParts.join(separator)}`;
}
function dirnamePath(filePath) {
  const normalizedPath = filePath.replace(/[\\/]+$/, '');
  const lastSeparatorIndex = Math.max(normalizedPath.lastIndexOf('/'), normalizedPath.lastIndexOf('\\'));
  if (lastSeparatorIndex < 0) {
    return '.';
  }
  if (lastSeparatorIndex === 0) {
    return normalizedPath[0];
  }
  if (lastSeparatorIndex === 2 && normalizedPath[1] === ':') {
    return normalizedPath.slice(0, 3);
  }
  return normalizedPath.slice(0, lastSeparatorIndex);
}
function resolveFilePath(filePath) {
  if (isAbsolutePath(filePath)) {
    return filePath;
  }
  return joinFilePath(process.cwd(), filePath);
}
function isAbsolutePath(filePath) {
  return filePath.startsWith('/') || filePath.startsWith('\\') || /^[a-zA-Z]:[\\/]/.test(filePath);
}
