/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createNodeFileStorage: () => (/* binding */ createNodeFileStorage),
  resolveDefaultNodeFileStoragePath: () => (/* binding */ resolveDefaultNodeFileStoragePath)
});

;// external "node:os"
const external_node_os_namespaceObject = require("node:os");
;// external "node:crypto"
const external_node_crypto_namespaceObject = require("node:crypto");
;// external "node:fs/promises"
const promises_namespaceObject = require("node:fs/promises");
;// ./src/util/lockedJsonFile.ts


const LOCK_DIR_SUFFIX = '.lock';
const LOCK_METADATA_FILE_NAME = 'owner.json';
const LOCK_STALE_MS = 30_000;
const LOCK_RETRY_DELAY_MS = 50;
const LOCK_MAX_ATTEMPTS = 200;
function createLockedJsonFileStore(options) {
  let operationPromise = Promise.resolve();
  return {
    async read() {
      return readJsonFile(options.filePath, options.reviveValue);
    },
    mutate(callback) {
      return enqueueOperation(async () => {
        const releaseLock = await acquireFileLock(options.filePath);
        try {
          const data = await readJsonFile(options.filePath, options.reviveValue);
          const result = await callback(data);
          await writeJsonFile(options.filePath, data, options.replaceValue);
          return result;
        } finally {
          await releaseLock();
        }
      });
    }
  };
  function enqueueOperation(callback) {
    const nextPromise = operationPromise.then(callback, callback);
    operationPromise = nextPromise.then(() => undefined, () => undefined);
    return nextPromise;
  }
}
async function acquireFileLock(filePath) {
  const lockDirPath = `${filePath}${LOCK_DIR_SUFFIX}`;
  const lockMetadata = JSON.stringify({
    pid: process.pid,
    createdAt: Date.now()
  });
  await (0,promises_namespaceObject.mkdir)(dirnamePath(filePath), {
    recursive: true
  });
  for (let attempt = 1; attempt <= LOCK_MAX_ATTEMPTS; attempt += 1) {
    try {
      await (0,promises_namespaceObject.mkdir)(lockDirPath);
      await (0,promises_namespaceObject.writeFile)(joinFilePath(lockDirPath, LOCK_METADATA_FILE_NAME), lockMetadata, 'utf8');
      return async () => {
        try {
          await (0,promises_namespaceObject.rm)(lockDirPath, {
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
        await (0,promises_namespaceObject.rm)(lockDirPath, {
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
    const lockStat = await (0,promises_namespaceObject.stat)(lockDirPath);
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
async function readJsonFile(filePath, reviveValue) {
  try {
    const content = await (0,promises_namespaceObject.readFile)(filePath, 'utf8');
    return JSON.parse(content, reviveValue);
  } catch (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
      return {};
    }
    throw err;
  }
}
async function writeJsonFile(filePath, data, replaceValue) {
  await (0,promises_namespaceObject.mkdir)(dirnamePath(filePath), {
    recursive: true
  });
  const tempFilePath = `${filePath}.${process.pid}.${(0,external_node_crypto_namespaceObject.randomUUID)()}.tmp`;
  const content = JSON.stringify(data, replaceValue);
  await (0,promises_namespaceObject.writeFile)(tempFilePath, content, 'utf8');
  await (0,promises_namespaceObject.rename)(tempFilePath, filePath);
}
function joinFilePath() {
  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
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
;// ./src/api/storages/nodeFile.ts


const HEADLESS_STORAGE_DIR_NAME = 'mywallet';
const HEADLESS_STORAGE_FILE_NAME = 'storage.json';
const BIGINT_STORAGE_TAG = '__mtw_bigint';
const UINT8_ARRAY_STORAGE_TAG = '__mtw_uint8array';
function createNodeFileStorage(config) {
  const filePath = resolveStorageFilePath(config);
  const fileStore = createLockedJsonFileStore({
    filePath,
    replaceValue: replaceStorageValue,
    reviveValue: reviveStorageValue
  });
  return {
    async getItem(name) {
      const data = await fileStore.read();
      return data[name];
    },
    async setItem(name, value) {
      await fileStore.mutate(data => {
        data[name] = value;
      });
    },
    async mutateItem(name, mutate) {
      return fileStore.mutate(data => {
        const nextValue = mutate(data[name]);
        data[name] = nextValue;
        return nextValue;
      });
    },
    async removeItem(name) {
      await fileStore.mutate(data => {
        delete data[name];
      });
    },
    async clear() {
      await fileStore.mutate(data => {
        for (const key of Object.keys(data)) {
          delete data[key];
        }
      });
    },
    async getAll() {
      return fileStore.read();
    },
    async setMany(items) {
      await fileStore.mutate(data => {
        Object.assign(data, items);
      });
    },
    async getMany(keys) {
      const data = await fileStore.read();
      return Object.fromEntries(keys.map(key => [key, data[key]]));
    }
  };
}
function resolveDefaultNodeFileStoragePath() {
  let profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HEADLESS_STORAGE_DIR_NAME;
  return nodeFile_joinFilePath((0,external_node_os_namespaceObject.homedir)(), `.${HEADLESS_STORAGE_DIR_NAME}`, profile, HEADLESS_STORAGE_FILE_NAME);
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
  return filePath.replace(/\$\{HOME\}/g, (0,external_node_os_namespaceObject.homedir)());
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
function nodeFile_joinFilePath() {
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
function resolveFilePath(filePath) {
  if (isAbsolutePath(filePath)) {
    return filePath;
  }
  return nodeFile_joinFilePath(process.cwd(), filePath);
}
function isAbsolutePath(filePath) {
  return filePath.startsWith('/') || filePath.startsWith('\\') || /^[a-zA-Z]:[\\/]/.test(filePath);
}
module.exports = __webpack_exports__;
/******/ })()
;