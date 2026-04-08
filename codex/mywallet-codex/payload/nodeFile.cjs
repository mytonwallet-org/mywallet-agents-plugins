"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNodeFileStorage = createNodeFileStorage;
var _nodeCrypto = require("node:crypto");
var _promises = require("node:fs/promises");
var _nodeOs = require("node:os");
var _nodePath = require("node:path");
const HEADLESS_STORAGE_DIR_NAME = 'mywallet';
const BIGINT_STORAGE_TAG = '__mtw_bigint';
const UINT8_ARRAY_STORAGE_TAG = '__mtw_uint8array';
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
        const data = await readStorageFile(filePath);
        data[name] = value;
        await writeStorageFile(filePath, data);
      });
    },
    async removeItem(name) {
      await enqueueOperation(async () => {
        const data = await readStorageFile(filePath);
        delete data[name];
        await writeStorageFile(filePath, data);
      });
    },
    async clear() {
      await enqueueOperation(async () => {
        await writeStorageFile(filePath, {});
      });
    },
    async getAll() {
      return readStorageFile(filePath);
    },
    async setMany(items) {
      await enqueueOperation(async () => {
        const data = await readStorageFile(filePath);
        await writeStorageFile(filePath, {
          ...data,
          ...items
        });
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
function resolveStorageFilePath(config) {
  if (config.path) {
    return (0, _nodePath.resolve)(config.path);
  }
  if (config.profile) {
    return (0, _nodePath.join)((0, _nodeOs.tmpdir)(), HEADLESS_STORAGE_DIR_NAME, `${config.profile}.json`);
  }
  throw new Error('Node file storage requires an explicit `path` or `profile`');
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
  await (0, _promises.mkdir)((0, _nodePath.dirname)(filePath), {
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
