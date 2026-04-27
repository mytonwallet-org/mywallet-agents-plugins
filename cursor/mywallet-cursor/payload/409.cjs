"use strict";
exports.id = 409;
exports.ids = [409];
exports.modules = {

/***/ 86863
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  runHeadlessMcpServer: () => (/* binding */ runHeadlessMcpServer)
});

// UNUSED EXPORTS: createHeadlessMcpServer

// EXTERNAL MODULE: external "node:child_process"
var external_node_child_process_ = __webpack_require__(31421);
// EXTERNAL MODULE: external "node:path"
var external_node_path_ = __webpack_require__(76760);
// EXTERNAL MODULE: external "node:util"
var external_node_util_ = __webpack_require__(57975);
// EXTERNAL MODULE: ./src/api/storages/types.ts
var types = __webpack_require__(61679);
// EXTERNAL MODULE: ./src/config.ts
var config = __webpack_require__(50352);
;// ./src/api/runtime.ts
const browserApiRuntime = {
  shouldInstallWindowBridge: true,
  shouldInitDappRuntime: true
};
const nodeApiRuntime = {
  shouldInstallWindowBridge: false,
  shouldInitDappRuntime: false
};
const nodeApiRuntimeContext = {
  profile: nodeApiRuntime
};
let currentApiRuntimeContext;
let apiRuntimeContextResolver;
let asyncLocalRuntimeContextStore;
let hasAttemptedAsyncLocalRuntimeContextStore = false;
function getApiRuntimeContext() {
  var _apiRuntimeContextRes, _getAsyncLocalRuntime;
  return ((_apiRuntimeContextRes = apiRuntimeContextResolver) === null || _apiRuntimeContextRes === void 0 ? void 0 : _apiRuntimeContextRes()) ?? ((_getAsyncLocalRuntime = getAsyncLocalRuntimeContextStore()) === null || _getAsyncLocalRuntime === void 0 ? void 0 : _getAsyncLocalRuntime.getStore()) ?? currentApiRuntimeContext;
}
function getDirectApiRuntimeContext() {
  var _getApiRuntimeContext;
  return {
    ...nodeApiRuntimeContext,
    ...getApiRuntimeContext(),
    profile: ((_getApiRuntimeContext = getApiRuntimeContext()) === null || _getApiRuntimeContext === void 0 ? void 0 : _getApiRuntimeContext.profile) ?? nodeApiRuntime
  };
}
function withApiRuntimeContext(context, fn) {
  const asyncLocalStorage = getAsyncLocalRuntimeContextStore();
  if (asyncLocalStorage) {
    return asyncLocalStorage.run(context, fn);
  }
  const previousApiRuntimeContext = currentApiRuntimeContext;
  currentApiRuntimeContext = context;
  try {
    const result = fn();
    if (isPromiseLike(result)) {
      return result.finally(() => {
        if (currentApiRuntimeContext === context) {
          currentApiRuntimeContext = previousApiRuntimeContext;
        }
      });
    }
    currentApiRuntimeContext = previousApiRuntimeContext;
    return result;
  } catch (err) {
    currentApiRuntimeContext = previousApiRuntimeContext;
    throw err;
  }
}
function setApiRuntimeContextResolver(resolver) {
  apiRuntimeContextResolver = resolver;
}
function createNodeApiRuntimeContext(storage) {
  return {
    ...nodeApiRuntimeContext,
    storage
  };
}
function getAsyncLocalRuntimeContextStore() {
  var _process$versions;
  if (hasAttemptedAsyncLocalRuntimeContextStore) {
    return asyncLocalRuntimeContextStore;
  }
  hasAttemptedAsyncLocalRuntimeContextStore = true;
  if (typeof process !== 'object' || !((_process$versions = process.versions) !== null && _process$versions !== void 0 && _process$versions.node)) {
    return undefined;
  }
  const nodeRequire = getNodeRequire();
  if (!nodeRequire) {
    return undefined;
  }
  const {
    AsyncLocalStorage
  } = loadAsyncLocalStorage(nodeRequire) ?? {};
  if (!AsyncLocalStorage) {
    return undefined;
  }
  asyncLocalRuntimeContextStore = new AsyncLocalStorage();
  return asyncLocalRuntimeContextStore;
}
function loadAsyncLocalStorage(nodeRequire) {
  try {
    return nodeRequire('node:async_hooks');
  } catch (_err) {
    try {
      return nodeRequire('async_hooks');
    } catch (_innerErr) {
      return undefined;
    }
  }
}
function getNodeRequire() {
  try {
    var _globalThis$eval;
    const indirectRequire = (_globalThis$eval = globalThis.eval) === null || _globalThis$eval === void 0 ? void 0 : _globalThis$eval.call(globalThis, 'require');
    if (typeof indirectRequire === 'function') {
      return indirectRequire;
    }
  } catch (_err) {
    // Ignore environments where indirect require is unavailable
  }
  if (true) {
    return __webpack_require__(98282);
  }
  // removed by dead control flow

  // removed by dead control flow

}
function isPromiseLike(value) {
  return Boolean(value) && typeof value.finally === 'function';
}
// EXTERNAL MODULE: ./src/api/storages/capacitorStorage.ts
var capacitorStorage = __webpack_require__(98673);
// EXTERNAL MODULE: ./src/api/storages/extension.ts
var extension = __webpack_require__(4303);
// EXTERNAL MODULE: ./src/api/storages/idb.ts
var idb = __webpack_require__(15363);
// EXTERNAL MODULE: ./src/api/storages/localStorage.ts
var localStorage = __webpack_require__(63404);
;// ./src/api/storages/index.ts







const defaultStorage = config/* IS_EXTENSION */.hL1 ? extension/* default */.A : config/* IS_CAPACITOR */.UMQ ? capacitorStorage/* default */.A : idb/* default */.A;
function resolveStorage() {
  var _getApiRuntimeContext;
  return ((_getApiRuntimeContext = getApiRuntimeContext()) === null || _getApiRuntimeContext === void 0 ? void 0 : _getApiRuntimeContext.storage) ?? defaultStorage;
}
const storage = {
  getItem(name, force) {
    return resolveStorage().getItem(name, force);
  },
  setItem(name, value) {
    return resolveStorage().setItem(name, value);
  },
  removeItem(name) {
    return resolveStorage().removeItem(name);
  },
  clear() {
    return resolveStorage().clear();
  },
  async getAll() {
    const runtimeStorage = resolveStorage();
    return runtimeStorage.getAll ? runtimeStorage.getAll() : {};
  },
  async setMany(items) {
    const runtimeStorage = resolveStorage();
    if (runtimeStorage.setMany) {
      await runtimeStorage.setMany(items);
      return;
    }
    await Promise.all(Object.entries(items).map(_ref => {
      let [key, value] = _ref;
      return runtimeStorage.setItem(key, value);
    }));
  },
  async getMany(keys) {
    const runtimeStorage = resolveStorage();
    if (runtimeStorage.getMany) {
      return runtimeStorage.getMany(keys);
    }
    const items = await Promise.all(keys.map(async key => {
      return [key, await runtimeStorage.getItem(key)];
    }));
    return Object.fromEntries(items);
  }
};
/* harmony default export */ const storages = ({
  [types/* StorageType */.e.IndexedDb]: idb/* default */.A,
  [types/* StorageType */.e.LocalStorage]: localStorage/* default */.A,
  [types/* StorageType */.e.ExtensionLocal]: extension/* default */.A,
  [types/* StorageType */.e.CapacitorStorage]: capacitorStorage/* default */.A
});
// EXTERNAL MODULE: external "node:async_hooks"
var external_node_async_hooks_ = __webpack_require__(16698);
// EXTERNAL MODULE: external "node:crypto"
var external_node_crypto_ = __webpack_require__(77598);
// EXTERNAL MODULE: external "node:fs/promises"
var promises_ = __webpack_require__(51455);
// EXTERNAL MODULE: external "node:os"
var external_node_os_ = __webpack_require__(48161);
;// ./src/api/storages/nodeFile.ts
/* unused harmony import specifier */ var randomUUID;
/* unused harmony import specifier */ var mkdir;
/* unused harmony import specifier */ var writeFile;
/* unused harmony import specifier */ var rm;
/* unused harmony import specifier */ var stat;
/* unused harmony import specifier */ var readFile;
/* unused harmony import specifier */ var rename;
/* unused harmony import specifier */ var homedir;



const DEFAULT_STORAGE_DIRECTORY_NAME = 'mywallet';
const DEFAULT_STORAGE_FILE_NAME = 'storage.json';
const BIGINT_STORAGE_TAG = '__mtw_bigint';
const UINT8_ARRAY_STORAGE_TAG = '__mtw_uint8array';
const LOCK_DIRECTORY_SUFFIX = '.lock';
const LOCK_METADATA_FILE_NAME = 'owner.json';
const LOCK_STALE_MS = 30_000;
const LOCK_RETRY_DELAY_MS = 50;
const LOCK_MAX_ATTEMPTS = 200;
function createNodeFileStorage(config) {
  const filePath = resolveStorageFilePath(config);
  let operationPromise = Promise.resolve();
  function enqueueOperation(callback) {
    const nextPromise = operationPromise.then(callback, callback);
    operationPromise = nextPromise.then(() => undefined, () => undefined);
    return nextPromise;
  }
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
function resolveDefaultNodeFileStoragePath() {
  let profile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STORAGE_DIRECTORY_NAME;
  return joinFilePath(homedir(), `.${DEFAULT_STORAGE_DIRECTORY_NAME}`, profile, DEFAULT_STORAGE_FILE_NAME);
}
function expandNodeFileStoragePath(filePath) {
  return filePath.replace(/\$\{HOME\}/g, homedir());
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
  const lockDirectoryPath = `${filePath}${LOCK_DIRECTORY_SUFFIX}`;
  const lockMetadata = JSON.stringify({
    processId: process.pid,
    createdAt: Date.now()
  });
  await mkdir(getDirectoryPath(filePath), {
    recursive: true
  });
  for (let attempt = 1; attempt <= LOCK_MAX_ATTEMPTS; attempt++) {
    try {
      await mkdir(lockDirectoryPath);
      await writeFile(joinFilePath(lockDirectoryPath, LOCK_METADATA_FILE_NAME), lockMetadata, 'utf8');
      return async () => {
        try {
          await rm(lockDirectoryPath, {
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
      if (await isStaleLock(lockDirectoryPath)) {
        await rm(lockDirectoryPath, {
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
async function isStaleLock(lockDirectoryPath) {
  try {
    const lockDirectoryStat = await stat(lockDirectoryPath);
    return Date.now() - lockDirectoryStat.mtimeMs >= LOCK_STALE_MS;
  } catch (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
      return false;
    }
    throw err;
  }
}
function wait(delayMs) {
  return new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });
}
async function readStorageFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    return JSON.parse(content, reviveStorageValue);
  } catch (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) === 'ENOENT') {
      return {};
    }
    throw err;
  }
}
async function writeStorageFile(filePath, data) {
  await mkdir(getDirectoryPath(filePath), {
    recursive: true
  });
  const tempFilePath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  const content = JSON.stringify(data, replaceStorageValue);
  await writeFile(tempFilePath, content, 'utf8');
  await rename(tempFilePath, filePath);
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
function getDirectoryPath(filePath) {
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
;// ./headless/storage.ts
/* unused harmony import specifier */ var storage_createNodeApiRuntimeContext;
/* unused harmony import specifier */ var sharedStorage;
/* unused harmony import specifier */ var storage_createNodeFileStorage;




const queueByKey = new Map();
const runtimeContext = new external_node_async_hooks_.AsyncLocalStorage();
setApiRuntimeContextResolver(() => runtimeContext.getStore());
function createHeadlessStorage(config) {
  if (!config) {
    return storage_createNodeFileStorage({
      path: resolveHeadlessStoragePath()
    });
  }
  if (config.type !== 'nodeFile') {
    throw new Error('Unsupported headless storage type');
  }
  return storage_createNodeFileStorage({
    path: config.path,
    profile: config.profile
  });
}
function runWithHeadlessStorage(runtimeStorage, fn) {
  return runtimeContext.run(storage_createNodeApiRuntimeContext(runtimeStorage), fn);
}
function resolveSrcApiInitArgs(apiInitArgs) {
  const {
    storage: _storage,
    ...srcApiInitArgs
  } = apiInitArgs;
  return srcApiInitArgs;
}
async function mutateHeadlessStoredItem(key, mutate) {
  const previous = queueByKey.get(key) ?? Promise.resolve();
  const run = previous.catch(() => undefined).then(async () => {
    const current = await sharedStorage.getItem(key);
    const next = await mutate(current);
    if (next === undefined) {
      await sharedStorage.removeItem(key);
      return undefined;
    }
    await sharedStorage.setItem(key, next);
    return next;
  });
  const tracked = run.then(() => undefined, () => undefined);
  queueByKey.set(key, tracked);
  try {
    return await run;
  } finally {
    if (queueByKey.get(key) === tracked) {
      queueByKey.delete(key);
    }
  }
}
function resolveHeadlessStoragePath() {
  var _process$env$STORAGE_;
  const configuredPath = (_process$env$STORAGE_ = undefined) === null || _process$env$STORAGE_ === void 0 ? void 0 : _process$env$STORAGE_.trim();
  return configuredPath || '.mywallet/storage.json';
}
;// ./headless/runtime/autonomyMode.ts
/* unused harmony import specifier */ var autonomyMode_storage;
/* unused harmony import specifier */ var autonomyMode_mutateHeadlessStoredItem;
/* unused harmony import specifier */ var AUTONOMY_MODE_STORAGE_KEY;
/* unused harmony import specifier */ var INVALID_AUTONOMY_MODE_ERROR;



const HEADLESS_AUTONOMY_MODES = ['review-first', 'policy', 'autonomous-wallet'];
const DEFAULT_AUTONOMY_MODE = 'review-first';
async function restoreAutonomyMode() {
  const storedMode = await autonomyMode_storage.getItem(AUTONOMY_MODE_STORAGE_KEY);
  return normalizeAutonomyMode(storedMode);
}
async function persistAutonomyMode(mode) {
  await autonomyMode_mutateHeadlessStoredItem(AUTONOMY_MODE_STORAGE_KEY, () => mode);
}
function isHeadlessAutonomyMode(mode) {
  return HEADLESS_AUTONOMY_MODES.includes(mode);
}
function assertHeadlessAutonomyMode(mode) {
  if (isHeadlessAutonomyMode(mode)) {
    return mode;
  }
  throw new Error(`${INVALID_AUTONOMY_MODE_ERROR}: ${mode}`);
}
function normalizeAutonomyMode(mode) {
  if (mode && isHeadlessAutonomyMode(mode)) {
    return mode;
  }
  return DEFAULT_AUTONOMY_MODE;
}
function resolveSensitiveActionRouting(mode, action, approvalPolicy) {
  if (mode === 'review-first') {
    return 'approval';
  }
  if (mode === 'autonomous-wallet') {
    return 'execute';
  }
  const policyAction = action === 'swap' ? 'transfer' : action;
  return approvalPolicy[policyAction].mode === 'allowImmediate' ? 'execute' : 'block';
}
;// ./headless/runtime/assetCapabilities.ts
const HEADLESS_CAPABILITY_STATUSES = (/* unused pure expression or super */ null && (['supported', 'partial', 'unavailable', 'unsupported']));
const HEADLESS_RUNTIME_CAPABILITIES = (/* unused pure expression or super */ null && (['nativeBalances', 'fungibleTokenBalances', 'collectibles', 'selectedCurrencyValues', 'historicalPrices', 'recentActivity', 'transactionActivityLookup', 'transfers', 'collectibleTransfers', 'transferApprovals', 'signMessageApprovals', 'swaps']));
const HEADLESS_TOKEN_TRANSFER_STANDARDS = {
  ton: 'jetton',
  solana: 'spl',
  tron: 'trc20'
};
const SNAPSHOT_BALANCE_NOTE = 'Native balances ship today; readiness remains snapshot-based ' + 'and can be not-ready, missing, or stale before refresh.';
const COLLECTIBLES_PARTIAL_NOTE = 'Collectible listing ships today, but runtime responses can ' + 'still be incomplete via `isComplete` and `unavailableChains`.';
const VALUE_ENRICHMENT_PARTIAL_NOTE = 'Value enrichment ships today and explicitly degrades to ' + '`partial` or `unavailable` when returned asset values, token metadata, or pricing timestamps remain unresolved.';
const HISTORICAL_PRICES_PARTIAL_NOTE = 'Historical-price lookup ships today as a per-asset ' + 'enrichment surface; unsupported assets remain explicit instead of looking ' + 'like runtime failure, and degraded results keep explicit reasons when runtime can distinguish them.';
const RECENT_ACTIVITY_NOTE = 'Recent activity lookup ships today; empty results are data ' + 'absence, not feature absence.';
const COLLECTIBLE_TRANSFERS_SUPPORTED_NOTE = 'Collectible transfer preparation and submission ' + 'ship today as a distinct runtime surface.';
const TRANSFER_APPROVALS_NOTE = 'Transfer approval requests ship today and inherit the same ' + 'transfer support boundaries as direct execution.';
const SIGN_MESSAGE_APPROVALS_NOTE = 'Sign-message approval requests ship today and do not ' + 'widen signing support beyond the existing runtime operation.';
const SWAPS_TON_SUPPORTED_NOTE = 'TON-mainnet DEX-only swaps ship today through ' + '`getSwapAssets`, `getSwapEstimate`, and `submitSwap`.';
const SWAPS_UNSUPPORTED_NOTE = 'Swaps are TON-only in v1. This chain does not support swaps in the current runtime.';
const HEADLESS_CAPABILITY_MATRIX = {
  ton: {
    nativeBalances: {
      status: 'supported',
      notes: SNAPSHOT_BALANCE_NOTE
    },
    fungibleTokenBalances: {
      status: 'supported',
      notes: 'Jetton balances ship today; downstream value enrichment can still ' + 'degrade when token metadata is unresolved.'
    },
    collectibles: {
      status: 'partial',
      notes: COLLECTIBLES_PARTIAL_NOTE
    },
    selectedCurrencyValues: {
      status: 'partial',
      notes: VALUE_ENRICHMENT_PARTIAL_NOTE
    },
    historicalPrices: {
      status: 'partial',
      notes: HISTORICAL_PRICES_PARTIAL_NOTE
    },
    recentActivity: {
      status: 'supported',
      notes: RECENT_ACTIVITY_NOTE
    },
    transactionActivityLookup: {
      status: 'supported',
      notes: 'Single-transaction lookup ships today; TON uses the existing runtime ' + 'transaction-identifier path for this chain.'
    },
    transfers: {
      status: 'supported',
      notes: 'Native and jetton transfers ship today through `prepareTransfer` and ' + '`submitTransfer`; omitted `tokenAddress` keeps native-transfer semantics.'
    },
    collectibleTransfers: {
      status: 'supported',
      notes: COLLECTIBLE_TRANSFERS_SUPPORTED_NOTE
    },
    transferApprovals: {
      status: 'supported',
      notes: TRANSFER_APPROVALS_NOTE
    },
    signMessageApprovals: {
      status: 'supported',
      notes: SIGN_MESSAGE_APPROVALS_NOTE
    },
    swaps: {
      status: 'supported',
      notes: SWAPS_TON_SUPPORTED_NOTE
    }
  },
  solana: {
    nativeBalances: {
      status: 'supported',
      notes: SNAPSHOT_BALANCE_NOTE
    },
    fungibleTokenBalances: {
      status: 'supported',
      notes: 'SPL token balances ship today; downstream value enrichment can still ' + 'degrade when token metadata is unresolved.'
    },
    collectibles: {
      status: 'partial',
      notes: COLLECTIBLES_PARTIAL_NOTE
    },
    selectedCurrencyValues: {
      status: 'partial',
      notes: VALUE_ENRICHMENT_PARTIAL_NOTE
    },
    historicalPrices: {
      status: 'partial',
      notes: HISTORICAL_PRICES_PARTIAL_NOTE
    },
    recentActivity: {
      status: 'supported',
      notes: RECENT_ACTIVITY_NOTE
    },
    transactionActivityLookup: {
      status: 'supported',
      notes: 'Single-transaction lookup ships today; Solana keeps the same runtime ' + 'feature while chain identifier semantics differ from other chains.'
    },
    transfers: {
      status: 'supported',
      notes: 'Native and SPL transfers ship today through `prepareTransfer` and ' + '`submitTransfer`; omitted `tokenAddress` keeps native-transfer semantics.'
    },
    collectibleTransfers: {
      status: 'supported',
      notes: COLLECTIBLE_TRANSFERS_SUPPORTED_NOTE
    },
    transferApprovals: {
      status: 'supported',
      notes: TRANSFER_APPROVALS_NOTE
    },
    signMessageApprovals: {
      status: 'supported',
      notes: SIGN_MESSAGE_APPROVALS_NOTE
    },
    swaps: {
      status: 'unsupported',
      notes: SWAPS_UNSUPPORTED_NOTE
    }
  },
  tron: {
    nativeBalances: {
      status: 'supported',
      notes: SNAPSHOT_BALANCE_NOTE
    },
    fungibleTokenBalances: {
      status: 'supported',
      notes: 'TRC-20 balances ship today; downstream value enrichment can still ' + 'degrade when token metadata is unresolved.'
    },
    collectibles: {
      status: 'unsupported',
      notes: 'Collectible listing is not part of the shipped TRON wallet runtime ' + 'surface.'
    },
    selectedCurrencyValues: {
      status: 'partial',
      notes: VALUE_ENRICHMENT_PARTIAL_NOTE
    },
    historicalPrices: {
      status: 'partial',
      notes: HISTORICAL_PRICES_PARTIAL_NOTE
    },
    recentActivity: {
      status: 'supported',
      notes: RECENT_ACTIVITY_NOTE
    },
    transactionActivityLookup: {
      status: 'supported',
      notes: 'Single-transaction lookup ships today; TRON keeps the same runtime ' + 'feature while hash-based identifiers remain chain-specific.'
    },
    transfers: {
      status: 'supported',
      notes: 'Native and TRC-20 transfers ship today through `prepareTransfer` and ' + '`submitTransfer`; omitted `tokenAddress` keeps native-transfer semantics.'
    },
    collectibleTransfers: {
      status: 'unsupported',
      notes: 'Collectible transfer preparation and submission are not part of the ' + 'shipped TRON wallet runtime surface.'
    },
    transferApprovals: {
      status: 'supported',
      notes: TRANSFER_APPROVALS_NOTE
    },
    signMessageApprovals: {
      status: 'supported',
      notes: SIGN_MESSAGE_APPROVALS_NOTE
    },
    swaps: {
      status: 'unsupported',
      notes: SWAPS_UNSUPPORTED_NOTE
    }
  }
};
function getHeadlessCapabilitiesForChain(chain) {
  return HEADLESS_CAPABILITY_MATRIX[chain];
}
function getHeadlessCapability(chain, capability) {
  return HEADLESS_CAPABILITY_MATRIX[chain][capability];
}
function supportsHeadlessCollectibleTransfers(chain) {
  return getHeadlessCapability(chain, 'collectibleTransfers').status === 'supported';
}
function getHeadlessTokenTransferStandard(chain) {
  return HEADLESS_TOKEN_TRANSFER_STANDARDS[chain];
}
function getHeadlessTransferAmountUnit(chain, tokenAddress) {
  if (tokenAddress && getHeadlessTokenTransferStandard(chain)) {
    return 'token-base-units';
  }
  return 'native';
}
;// ./headless/adapters/commandRegistry.ts


const CHAIN_VALUES = ['ton', 'tron', 'solana'];
const NETWORK_VALUES = ['mainnet', 'testnet'];
const BASE_CURRENCY_VALUES = ['USD', 'EUR', 'RUB', 'CNY', 'BTC', 'TON'];
const PRICE_HISTORY_RANGE_VALUES = ['1D', '7D', '1M', '3M', '1Y', 'ALL'];
const APPROVAL_STATUS_VALUES = ['pending', 'rejected', 'executed'];
const APPROVAL_POLICY_MODE_VALUES = ['allowImmediate', 'requireApproval'];
const STRING_PROPERTY = {
  type: 'string'
};
const ACCOUNT_ID_PROPERTY = {
  type: 'string'
};
const PASSWORD_PROPERTY = {
  type: 'string'
};
const ADDRESS_PROPERTY = {
  type: 'string'
};
const CHAIN_PROPERTY = {
  type: 'string',
  enum: [...CHAIN_VALUES]
};
const NETWORK_PROPERTY = {
  type: 'string',
  enum: [...NETWORK_VALUES]
};
const SELECTED_CURRENCY_PROPERTY = {
  type: 'string',
  enum: [...BASE_CURRENCY_VALUES]
};
const PRICE_HISTORY_RANGE_PROPERTY = {
  type: 'string',
  enum: [...PRICE_HISTORY_RANGE_VALUES]
};
const APPROVAL_STATUS_PROPERTY = {
  type: 'string',
  enum: [...APPROVAL_STATUS_VALUES]
};
const APPROVAL_POLICY_MODE_PROPERTY = {
  type: 'string',
  enum: [...APPROVAL_POLICY_MODE_VALUES]
};
const BOOLEAN_PROPERTY = {
  type: 'boolean'
};
const NUMBER_PROPERTY = {
  type: 'number'
};
const INTEGER_NUMBER_PROPERTY = {
  type: 'number'
};
const RAW_BASE_UNITS_AMOUNT_PROPERTY = {
  type: 'number',
  description: 'Amount in raw base units. Use an integer number.'
};
function createObjectInputSchema(properties) {
  let required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return {
    type: 'object',
    additionalProperties: false,
    ...(required.length > 0 ? {
      required
    } : {}),
    properties
  };
}
const EMPTY_OBJECT_INPUT_SCHEMA = createObjectInputSchema({});
const OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY
});
const LIST_ACCOUNTS_INPUT_SCHEMA = createObjectInputSchema({
  shouldIncludeViewAccounts: BOOLEAN_PROPERTY
});
const ACTIVATE_ACCOUNT_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY
}, ['accountId']);
const GET_ADDRESS_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  chain: CHAIN_PROPERTY
}, ['chain']);
const GET_ADDRESS_INFO_INPUT_SCHEMA = createObjectInputSchema({
  chain: CHAIN_PROPERTY,
  network: NETWORK_PROPERTY,
  address: ADDRESS_PROPERTY
}, ['chain', 'network', 'address']);
const LIST_COLLECTIBLES_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  chain: CHAIN_PROPERTY,
  limit: INTEGER_NUMBER_PROPERTY
});
const GET_SELECTED_CURRENCY_VALUES_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  selectedCurrency: SELECTED_CURRENCY_PROPERTY
}, ['selectedCurrency']);
const GET_PORTFOLIO_SUMMARY_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  selectedCurrency: SELECTED_CURRENCY_PROPERTY
}, ['selectedCurrency']);
const GET_HISTORICAL_PRICES_INPUT_SCHEMA = createObjectInputSchema({
  selectedCurrency: SELECTED_CURRENCY_PROPERTY,
  range: PRICE_HISTORY_RANGE_PROPERTY,
  kind: {
    type: 'string',
    enum: ['native', 'token']
  },
  chain: CHAIN_PROPERTY,
  slug: {
    type: 'string',
    description: 'Token slug. Provide when kind is token.'
  },
  tokenAddress: {
    type: 'string',
    description: 'Optional token address when kind is token.'
  }
}, ['selectedCurrency', 'range', 'kind', 'chain']);
const GET_RECENT_ACTIVITY_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  limit: INTEGER_NUMBER_PROPERTY,
  toTimestamp: NUMBER_PROPERTY
});
const TRANSACTION_ACTIVITY_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  chain: CHAIN_PROPERTY,
  txId: {
    type: 'string',
    description: 'Transaction id lookup key. Provide exactly one of txId or txHash.'
  },
  txHash: {
    type: 'string',
    description: 'Transaction hash lookup key. Provide exactly one of txId or txHash.'
  }
}, ['chain']);
const WAIT_FOR_BALANCES_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  timeoutMs: NUMBER_PROPERTY
});
const EXPORT_MNEMONIC_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  password: PASSWORD_PROPERTY
}, ['password']);
const EXPORT_PRIVATE_KEY_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  chain: CHAIN_PROPERTY,
  password: PASSWORD_PROPERTY
}, ['chain', 'password']);
const TRANSFER_PAYLOAD_INPUT_SCHEMA = createObjectInputSchema({
  type: {
    type: 'string',
    enum: ['comment', 'binary', 'base64'],
    description: 'Payload kind. Use comment for text comments, or binary/base64 for encoded payload data.'
  },
  text: {
    type: 'string',
    description: 'Comment text when payload.type is comment.'
  },
  shouldEncrypt: {
    type: 'boolean',
    description: 'Whether to encrypt the comment when payload.type is comment.'
  },
  data: {
    type: 'string',
    description: 'Payload data when payload.type is binary or base64.'
  }
});
const CREATE_WALLET_INPUT_SCHEMA = createObjectInputSchema({
  network: {
    ...NETWORK_PROPERTY,
    description: 'Provide a wallet network unless the runtime default network is already configured.'
  },
  password: PASSWORD_PROPERTY,
  isBip39: BOOLEAN_PROPERTY
}, ['password']);
const PREPARE_TRANSFER_INPUT_SCHEMA = createObjectInputSchema({
  chain: CHAIN_PROPERTY,
  accountId: ACCOUNT_ID_PROPERTY,
  toAddress: ADDRESS_PROPERTY,
  amount: RAW_BASE_UNITS_AMOUNT_PROPERTY,
  tokenAddress: ADDRESS_PROPERTY,
  payload: TRANSFER_PAYLOAD_INPUT_SCHEMA,
  shouldAllowGasless: BOOLEAN_PROPERTY,
  stateInit: STRING_PROPERTY
}, ['chain', 'toAddress']);
const PREPARE_COLLECTIBLE_TRANSFER_INPUT_SCHEMA = createObjectInputSchema({
  chain: CHAIN_PROPERTY,
  accountId: ACCOUNT_ID_PROPERTY,
  assetId: STRING_PROPERTY,
  address: ADDRESS_PROPERTY,
  toAddress: ADDRESS_PROPERTY,
  comment: STRING_PROPERTY
}, ['chain', 'toAddress']);
const SUBMIT_TRANSFER_INPUT_SCHEMA = createObjectInputSchema({
  chain: CHAIN_PROPERTY,
  accountId: ACCOUNT_ID_PROPERTY,
  toAddress: ADDRESS_PROPERTY,
  amount: RAW_BASE_UNITS_AMOUNT_PROPERTY,
  tokenAddress: ADDRESS_PROPERTY,
  payload: TRANSFER_PAYLOAD_INPUT_SCHEMA,
  shouldAllowGasless: BOOLEAN_PROPERTY,
  stateInit: STRING_PROPERTY,
  password: PASSWORD_PROPERTY,
  realFee: RAW_BASE_UNITS_AMOUNT_PROPERTY,
  shouldUseGaslessTransfer: BOOLEAN_PROPERTY,
  dieselAmount: RAW_BASE_UNITS_AMOUNT_PROPERTY,
  shouldUseGaslessWithStars: BOOLEAN_PROPERTY
}, ['chain', 'toAddress', 'amount']);
const SUBMIT_COLLECTIBLE_TRANSFER_INPUT_SCHEMA = createObjectInputSchema({
  chain: CHAIN_PROPERTY,
  accountId: ACCOUNT_ID_PROPERTY,
  assetId: STRING_PROPERTY,
  address: ADDRESS_PROPERTY,
  toAddress: ADDRESS_PROPERTY,
  comment: STRING_PROPERTY,
  password: PASSWORD_PROPERTY,
  realFee: RAW_BASE_UNITS_AMOUNT_PROPERTY
}, ['chain', 'toAddress']);
const SIGN_MESSAGE_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY,
  chain: CHAIN_PROPERTY,
  message: {
    type: 'string',
    description: 'Message text to sign. Use a string representation for fresh-session tool calls.'
  },
  password: PASSWORD_PROPERTY,
  origin: STRING_PROPERTY
}, ['chain', 'message']);
const SET_AUTONOMY_MODE_INPUT_SCHEMA = createObjectInputSchema({
  mode: {
    type: 'string',
    enum: [...HEADLESS_AUTONOMY_MODES]
  }
}, ['mode']);
const SET_AUTONOMOUS_WALLET_INPUT_SCHEMA = createObjectInputSchema({
  accountId: ACCOUNT_ID_PROPERTY
});
const GET_APPROVAL_REQUEST_INPUT_SCHEMA = createObjectInputSchema({
  id: STRING_PROPERTY
}, ['id']);
const LIST_APPROVAL_REQUESTS_INPUT_SCHEMA = createObjectInputSchema({
  status: APPROVAL_STATUS_PROPERTY,
  accountId: ACCOUNT_ID_PROPERTY
});
const APPROVE_APPROVAL_REQUEST_INPUT_SCHEMA = createObjectInputSchema({
  id: STRING_PROPERTY,
  password: PASSWORD_PROPERTY
}, ['id']);
const REJECT_APPROVAL_REQUEST_INPUT_SCHEMA = createObjectInputSchema({
  id: STRING_PROPERTY,
  reason: STRING_PROPERTY
}, ['id']);
function createTransferApprovalRuleInputSchema() {
  return createObjectInputSchema({
    maxAmount: RAW_BASE_UNITS_AMOUNT_PROPERTY,
    allowedDestinations: {
      type: 'array',
      items: STRING_PROPERTY
    },
    allowUnknownAssets: BOOLEAN_PROPERTY
  });
}
function createSignMessageApprovalRuleInputSchema() {
  return createObjectInputSchema({
    allowedOrigins: {
      type: 'array',
      items: STRING_PROPERTY
    }
  });
}
function createByChainInputSchema(ruleSchema) {
  return createObjectInputSchema({
    ton: ruleSchema,
    tron: ruleSchema,
    solana: ruleSchema
  });
}
const SET_APPROVAL_POLICY_INPUT_SCHEMA = createObjectInputSchema({
  transfer: createObjectInputSchema({
    mode: APPROVAL_POLICY_MODE_PROPERTY,
    defaultRule: createTransferApprovalRuleInputSchema(),
    byChain: createByChainInputSchema(createTransferApprovalRuleInputSchema())
  }),
  signMessage: createObjectInputSchema({
    mode: APPROVAL_POLICY_MODE_PROPERTY,
    defaultRule: createSignMessageApprovalRuleInputSchema(),
    byChain: createByChainInputSchema(createSignMessageApprovalRuleInputSchema())
  })
});
const ADD_SAVED_ADDRESS_INPUT_SCHEMA = createObjectInputSchema({
  name: STRING_PROPERTY,
  address: ADDRESS_PROPERTY,
  chain: CHAIN_PROPERTY
}, ['name', 'address', 'chain']);
const REMOVE_SAVED_ADDRESS_INPUT_SCHEMA = createObjectInputSchema({
  address: ADDRESS_PROPERTY,
  chain: CHAIN_PROPERTY
}, ['address', 'chain']);
const UPDATE_SAVED_ADDRESS_INPUT_SCHEMA = createObjectInputSchema({
  name: STRING_PROPERTY,
  address: ADDRESS_PROPERTY,
  chain: CHAIN_PROPERTY
}, ['name', 'address', 'chain']);
const DECIMAL_AMOUNT_PROPERTY = {
  type: 'string',
  description: 'Amount as a decimal string (e.g., "1.5").'
};
const SLIPPAGE_PROPERTY = {
  type: 'number',
  description: 'Slippage tolerance as a percentage (0-100).'
};
const GET_SWAP_ASSETS_INPUT_SCHEMA = EMPTY_OBJECT_INPUT_SCHEMA;
const GET_SWAP_ESTIMATE_INPUT_SCHEMA = createObjectInputSchema({
  from: {
    ...STRING_PROPERTY,
    description: 'Source asset symbol or token address.'
  },
  to: {
    ...STRING_PROPERTY,
    description: 'Destination asset symbol or token address.'
  },
  fromAmount: DECIMAL_AMOUNT_PROPERTY,
  slippage: SLIPPAGE_PROPERTY
}, ['from', 'to', 'fromAmount', 'slippage']);
const SUBMIT_SWAP_INPUT_SCHEMA = createObjectInputSchema({
  from: {
    ...STRING_PROPERTY,
    description: 'Source asset symbol or token address.'
  },
  to: {
    ...STRING_PROPERTY,
    description: 'Destination asset symbol or token address.'
  },
  fromAmount: DECIMAL_AMOUNT_PROPERTY,
  slippage: SLIPPAGE_PROPERTY,
  password: PASSWORD_PROPERTY
}, ['from', 'to', 'fromAmount', 'slippage']);
const HEADLESS_COMMANDS = {
  init: {
    mcp: {
      toolName: 'mywallet_init',
      description: 'Initialize the wallet runtime and inspect restored runtime state',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    execute(runtime) {
      return {
        state: runtime.getState()
      };
    }
  },
  status: {
    mcp: {
      toolName: 'mywallet_status',
      description: 'Inspect restored wallet runtime state and active-account balance readiness',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    async execute(runtime) {
      const state = runtime.getState();
      const balanceSnapshot = state.activeAccountId ? await runtime.getBalanceSnapshot({
        accountId: state.activeAccountId
      }) : undefined;
      return {
        state,
        balanceSnapshot
      };
    }
  },
  listAccounts: {
    mcp: {
      toolName: 'mywallet_list_accounts',
      description: 'List wallet accounts',
      inputSchema: LIST_ACCOUNTS_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.listAccounts(input);
    }
  },
  getCurrentAccount: {
    mcp: {
      toolName: 'mywallet_get_current_account',
      description: 'Inspect the restored active wallet account',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    async execute(runtime) {
      return runtime.getCurrentAccount();
    }
  },
  getAutonomyMode: {
    mcp: {
      toolName: 'mywallet_get_autonomy_mode',
      description: 'Inspect the persisted runtime autonomy mode',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    execute(runtime) {
      return {
        mode: runtime.getAutonomyMode()
      };
    }
  },
  setAutonomyMode: {
    mcp: {
      toolName: 'mywallet_set_autonomy_mode',
      description: 'Update the persisted runtime autonomy mode',
      inputSchema: SET_AUTONOMY_MODE_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return {
        mode: await runtime.setAutonomyMode(input.mode)
      };
    }
  },
  getAutonomousWallet: {
    mcp: {
      toolName: 'mywallet_get_autonomous_wallet',
      description: 'Inspect the persisted runtime autonomous wallet profile',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    async execute(runtime) {
      return runtime.getAutonomousWallet();
    }
  },
  setAutonomousWallet: {
    mcp: {
      toolName: 'mywallet_set_autonomous_wallet',
      description: 'Update the persisted runtime autonomous wallet profile',
      inputSchema: SET_AUTONOMOUS_WALLET_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.setAutonomousWallet(input);
    }
  },
  clearAutonomousWallet: {
    mcp: {
      toolName: 'mywallet_clear_autonomous_wallet',
      description: 'Clear the persisted runtime autonomous wallet profile',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    async execute(runtime) {
      return runtime.clearAutonomousWallet();
    }
  },
  activateAccount: {
    mcp: {
      toolName: 'mywallet_activate_account',
      description: 'Activate a stored wallet account',
      inputSchema: ACTIVATE_ACCOUNT_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      await runtime.activateAccount(input);
      return {
        state: runtime.getState()
      };
    }
  },
  getAddress: {
    mcp: {
      toolName: 'mywallet_get_address',
      description: 'Get an address for the requested or restored active account and chain',
      inputSchema: GET_ADDRESS_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getAddress(input);
    }
  },
  getAddressInfo: {
    mcp: {
      toolName: 'mywallet_get_address_info',
      description: 'Get normalized address information for a chain, network, and address',
      inputSchema: GET_ADDRESS_INFO_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getAddressInfo(input);
    }
  },
  getBalances: {
    mcp: {
      toolName: 'mywallet_get_balances',
      description: 'Get balances for the requested account or the restored active account',
      inputSchema: OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getBalances(input);
    }
  },
  getTokenBalances: {
    mcp: {
      toolName: 'mywallet_get_token_balances',
      description: 'Get fungible token balances for the requested account or the restored active account',
      inputSchema: OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getTokenBalances(input);
    }
  },
  listCollectibles: {
    mcp: {
      toolName: 'mywallet_list_collectibles',
      description: 'List owned collectibles for the requested account or the restored active account',
      inputSchema: LIST_COLLECTIBLES_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.listCollectibles(input);
    }
  },
  getSelectedCurrencyValues: {
    mcp: {
      toolName: 'mywallet_get_selected_currency_values',
      description: 'Get native and fungible-token values in an explicitly selected currency',
      inputSchema: GET_SELECTED_CURRENCY_VALUES_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getSelectedCurrencyValues(input);
    }
  },
  getPortfolioSummary: {
    mcp: {
      toolName: 'mywallet_get_portfolio_summary',
      description: 'Get a read-only portfolio summary with total value, per-asset breakdown, and per-chain subtotals',
      inputSchema: GET_PORTFOLIO_SUMMARY_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getPortfolioSummary(input);
    }
  },
  getHistoricalPrices: {
    mcp: {
      toolName: 'mywallet_get_historical_prices',
      description: 'Get normalized historical price points for one explicitly identified asset',
      inputSchema: GET_HISTORICAL_PRICES_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getHistoricalPrices(input);
    }
  },
  getRecentActivity: {
    mcp: {
      toolName: 'mywallet_get_recent_activity',
      description: 'Get recent activity for the requested account or the restored active account',
      inputSchema: GET_RECENT_ACTIVITY_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getRecentActivity(input);
    }
  },
  getTransactionActivity: {
    mcp: {
      toolName: 'mywallet_get_transaction_activity',
      description: ['Get transaction activity for a txId or txHash', 'using the requested account or the restored active account'].join(' '),
      inputSchema: TRANSACTION_ACTIVITY_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getTransactionActivity(input);
    }
  },
  hasBalancesSnapshot: {
    mcp: {
      toolName: 'mywallet_has_balances_snapshot',
      description: 'Check whether balances are ready for the requested or restored active account',
      inputSchema: OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return {
        isReady: await runtime.hasBalancesSnapshot(input)
      };
    }
  },
  getBalanceSnapshot: {
    mcp: {
      toolName: 'mywallet_get_balance_snapshot',
      description: 'Get balance snapshot metadata for the requested or restored active account',
      inputSchema: OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getBalanceSnapshot(input);
    }
  },
  waitForBalances: {
    mcp: {
      toolName: 'mywallet_wait_for_balances',
      description: 'Wait for balances for the requested account or the restored active account',
      inputSchema: WAIT_FOR_BALANCES_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.waitForBalances(input);
    }
  },
  exportMnemonic: {
    mcp: {
      toolName: 'mywallet_export_mnemonic',
      description: 'Export mnemonic words for the requested or restored active account',
      inputSchema: EXPORT_MNEMONIC_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.exportMnemonic(input);
    }
  },
  exportPrivateKey: {
    mcp: {
      toolName: 'mywallet_export_private_key',
      description: 'Export a chain-specific private key for the requested or restored active account',
      inputSchema: EXPORT_PRIVATE_KEY_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.exportPrivateKey(input);
    }
  },
  createWallet: {
    mcp: {
      toolName: 'mywallet_create_wallet',
      description: 'Create a wallet, return the mnemonic-bearing result, and activate it',
      inputSchema: CREATE_WALLET_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.createWallet(input);
    }
  },
  prepareTransfer: {
    mcp: {
      toolName: 'mywallet_prepare_transfer',
      description: 'Prepare a transfer draft without submitting it',
      inputSchema: PREPARE_TRANSFER_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.prepareTransfer(input);
    }
  },
  prepareCollectibleTransfer: {
    mcp: {
      toolName: 'mywallet_prepare_collectible_transfer',
      description: 'Prepare a collectible transfer draft without submitting it',
      inputSchema: PREPARE_COLLECTIBLE_TRANSFER_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.prepareCollectibleTransfer(input);
    }
  },
  submitTransfer: {
    mcp: {
      toolName: 'mywallet_submit_transfer',
      description: 'Submit a transfer through the runtime autonomy flow',
      inputSchema: SUBMIT_TRANSFER_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.submitTransfer(input);
    }
  },
  submitCollectibleTransfer: {
    mcp: {
      toolName: 'mywallet_submit_collectible_transfer',
      description: 'Submit a collectible transfer immediately',
      inputSchema: SUBMIT_COLLECTIBLE_TRANSFER_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.submitCollectibleTransfer(input);
    }
  },
  signMessage: {
    mcp: {
      toolName: 'mywallet_sign_message',
      description: 'Sign a message through the runtime autonomy flow',
      inputSchema: SIGN_MESSAGE_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.signMessage(input);
    }
  },
  createTransferApprovalRequest: {
    mcp: {
      toolName: 'mywallet_create_transfer_approval_request',
      description: 'Create a pending transfer approval request',
      inputSchema: SUBMIT_TRANSFER_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.createTransferApprovalRequest(input);
    }
  },
  createSignMessageApprovalRequest: {
    mcp: {
      toolName: 'mywallet_create_sign_message_approval_request',
      description: 'Create a pending sign-message approval request',
      inputSchema: SIGN_MESSAGE_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.createSignMessageApprovalRequest(input);
    }
  },
  getApprovalRequest: {
    mcp: {
      toolName: 'mywallet_get_approval_request',
      description: 'Get a stored approval request by id',
      inputSchema: GET_APPROVAL_REQUEST_INPUT_SCHEMA
    },
    execute(runtime, input) {
      return runtime.getApprovalRequest(input);
    }
  },
  listApprovalRequests: {
    mcp: {
      toolName: 'mywallet_list_approval_requests',
      description: 'List stored approval requests',
      inputSchema: LIST_APPROVAL_REQUESTS_INPUT_SCHEMA
    },
    execute(runtime, input) {
      return runtime.listApprovalRequests(input);
    }
  },
  approveApprovalRequest: {
    mcp: {
      toolName: 'mywallet_approve_approval_request',
      description: 'Approve and execute a pending approval request',
      inputSchema: APPROVE_APPROVAL_REQUEST_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.approveApprovalRequest(input);
    }
  },
  rejectApprovalRequest: {
    mcp: {
      toolName: 'mywallet_reject_approval_request',
      description: 'Reject a pending approval request',
      inputSchema: REJECT_APPROVAL_REQUEST_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.rejectApprovalRequest(input);
    }
  },
  getApprovalPolicy: {
    mcp: {
      toolName: 'mywallet_get_approval_policy',
      description: 'Inspect the persisted runtime approval policy',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    execute(runtime) {
      return runtime.getApprovalPolicy();
    }
  },
  setApprovalPolicy: {
    mcp: {
      toolName: 'mywallet_set_approval_policy',
      description: 'Update the persisted runtime approval policy',
      inputSchema: SET_APPROVAL_POLICY_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.setApprovalPolicy(input);
    }
  },
  listSavedAddresses: {
    mcp: {
      toolName: 'mywallet_list_saved_addresses',
      description: 'List all saved addresses in the runtime address book',
      inputSchema: EMPTY_OBJECT_INPUT_SCHEMA
    },
    execute(runtime) {
      return runtime.listSavedAddresses();
    }
  },
  addSavedAddress: {
    mcp: {
      toolName: 'mywallet_add_saved_address',
      description: 'Add a saved address to the runtime address book',
      inputSchema: ADD_SAVED_ADDRESS_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.addSavedAddress(input);
    }
  },
  removeSavedAddress: {
    mcp: {
      toolName: 'mywallet_remove_saved_address',
      description: 'Remove a saved address from the runtime address book',
      inputSchema: REMOVE_SAVED_ADDRESS_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.removeSavedAddress(input);
    }
  },
  updateSavedAddress: {
    mcp: {
      toolName: 'mywallet_update_saved_address',
      description: 'Update the name of a saved address in the runtime address book',
      inputSchema: UPDATE_SAVED_ADDRESS_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.updateSavedAddress(input);
    }
  },
  getSwapAssets: {
    mcp: {
      toolName: 'mywallet_get_swap_assets',
      description: 'List available swap assets (TON-mainnet DEX-only)',
      inputSchema: GET_SWAP_ASSETS_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getSwapAssets(input);
    }
  },
  getSwapEstimate: {
    mcp: {
      toolName: 'mywallet_get_swap_estimate',
      description: 'Estimate a swap without executing it (TON-mainnet DEX-only)',
      inputSchema: GET_SWAP_ESTIMATE_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getSwapEstimate(input);
    }
  },
  submitSwap: {
    mcp: {
      toolName: 'mywallet_submit_swap',
      description: 'Submit a swap through the runtime autonomy flow (TON-mainnet DEX-only)',
      inputSchema: SUBMIT_SWAP_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.submitSwap(input);
    }
  },
  getStakingPositions: {
    mcp: {
      toolName: 'mywallet_get_staking_positions',
      description: 'Get active staking positions with balances, APY, and pool identity (TON-only, read-only)',
      inputSchema: OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getStakingPositions(input);
    }
  },
  getStakingHistory: {
    mcp: {
      toolName: 'mywallet_get_staking_history',
      description: 'Get staking profit history (TON-only, read-only)',
      inputSchema: OPTIONAL_ACCOUNT_ID_INPUT_SCHEMA
    },
    async execute(runtime, input) {
      return runtime.getStakingHistory(input);
    }
  }
};
const HEADLESS_CLI_COMMANDS = Object.keys(HEADLESS_COMMANDS);
const HEADLESS_MCP_TOOLS = Object.entries(HEADLESS_COMMANDS).filter(_ref => {
  let [, command] = _ref;
  return command.mcp;
}).map(_ref2 => {
  let [name, command] = _ref2;
  return {
    name: command.mcp.toolName,
    description: command.mcp.description,
    command: name,
    inputSchema: command.mcp.inputSchema
  };
});
const HEADLESS_MCP_TOOL_BY_NAME = Object.fromEntries(HEADLESS_MCP_TOOLS.map(tool => [tool.name, tool]));
function getHeadlessCommand(command) {
  return HEADLESS_COMMANDS[command];
}
function parseHeadlessCliCommand(value) {
  if (value in HEADLESS_COMMANDS) {
    return value;
  }
  throw new Error(`Unknown command: ${value}`);
}
;// ./headless/adapters/mcp/index.ts




const {
  version: SERVER_VERSION
} = __webpack_require__(8330);
const execFileAsync = (0,external_node_util_.promisify)(external_node_child_process_.execFile);
const REPO_ROOT = (0,external_node_path_.resolve)(__dirname, '../../..');
const DEFAULT_HEADLESS_BIN_PATH = (0,external_node_path_.resolve)(REPO_ROOT, 'bin/mywallet');
const HEADLESS_CLI_MAX_BUFFER_BYTES = 16 * 1024 * 1024;
const JSON_RPC_VERSION = '2.0';
const MCP_PROTOCOL_VERSION = '2024-11-05';
const SERVER_NAME = 'mywallet-mcp';
const CONTENT_TYPE_HEADER = 'Content-Type: application/json';
const HEADER_SEPARATOR = '\r\n\r\n';
const CONTENT_LENGTH_HEADER_PREFIX = 'content-length:';
async function runHeadlessMcpServer(argv) {
  const config = parseServerConfig(argv);
  const server = createHeadlessMcpServer(config);
  await server.run();
}
function createHeadlessMcpServer(config) {
  return new McpServer(config);
}
class McpServer {
  apiInitArgs;
  headlessBinPath;
  isPretty;
  pendingBuffer = Buffer.alloc(0);
  transportFraming;
  constructor(config) {
    this.apiInitArgs = config.apiInitArgs;
    this.headlessBinPath = config.headlessBinPath || DEFAULT_HEADLESS_BIN_PATH;
    this.isPretty = Boolean(config.isPretty);
  }
  async run() {
    process.stdin.on('data', chunk => {
      const normalizedChunk = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
      this.pendingBuffer = Buffer.concat([this.pendingBuffer, normalizedChunk]);
      this.consumePendingBuffer().catch(err => {
        this.writeLog(`Failed to process MCP input: ${formatError(err)}`);
      });
    });
    process.stdin.resume();
    await new Promise(resolvePromise => {
      process.stdin.on('end', () => resolvePromise());
    });
  }
  async consumePendingBuffer() {
    while (true) {
      const nextMessage = readNextMessage(this.pendingBuffer);
      if (!nextMessage) {
        return;
      }
      this.pendingBuffer = nextMessage.remainingBuffer;
      this.transportFraming = nextMessage.framing;
      const request = JSON.parse(nextMessage.rawBody);
      const response = await this.handleRequest(request);
      if (response) {
        this.writeMessage(response);
      }
    }
  }
  async handleRequest(request) {
    try {
      if (request.method === 'initialize') {
        return createSuccessResponse(request.id, {
          protocolVersion: MCP_PROTOCOL_VERSION,
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: SERVER_NAME,
            version: SERVER_VERSION
          }
        });
      }
      if (request.method === 'notifications/initialized') {
        return undefined;
      }
      if (request.method === 'tools/list') {
        return createSuccessResponse(request.id, {
          tools: HEADLESS_MCP_TOOLS.map(_ref => {
            let {
              name,
              description,
              inputSchema
            } = _ref;
            return {
              name,
              description,
              inputSchema
            };
          })
        });
      }
      if (request.method === 'tools/call') {
        var _request$params, _request$params2;
        const toolName = (_request$params = request.params) === null || _request$params === void 0 ? void 0 : _request$params.name;
        const input = (_request$params2 = request.params) === null || _request$params2 === void 0 ? void 0 : _request$params2.arguments;
        const result = await this.callTool(toolName, input);
        return createSuccessResponse(request.id, result);
      }
      return createErrorResponse(request.id, -32601, `Method not found: ${request.method}`);
    } catch (err) {
      return createErrorResponse(request.id, -32000, err instanceof Error ? err.message : String(err));
    }
  }
  async callTool(toolName, input) {
    if (!toolName || !(toolName in HEADLESS_MCP_TOOL_BY_NAME)) {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    const tool = HEADLESS_MCP_TOOL_BY_NAME[toolName];
    const normalizedInput = normalizeToolInput(input);
    const cliResult = await executeHeadlessCli({
      apiInitArgs: this.apiInitArgs,
      command: tool.command,
      headlessBinPath: this.headlessBinPath,
      input: normalizedInput
    });
    const toolResult = compactToolResultForMcp(tool.command, cliResult);
    return {
      content: [{
        type: 'text',
        text: summarizeToolResultText(tool.command, toolResult)
      }],
      structuredContent: toolResult,
      isError: !toolResult.ok
    };
  }
  writeMessage(message) {
    const body = JSON.stringify(message);
    if (this.transportFraming === 'ndjson') {
      process.stdout.write(`${body}\n`);
      return;
    }
    const header = `Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n${CONTENT_TYPE_HEADER}\r\n\r\n`;
    process.stdout.write(header);
    process.stdout.write(body);
  }
  writeLog(message) {
    if (!this.isPretty) {
      return;
    }
    process.stderr.write(`[mywallet-mcp] ${message}\n`);
  }
}
async function executeHeadlessCli(options) {
  const cliArgs = [options.command, '--api-init-json', JSON.stringify(options.apiInitArgs), '--json', JSON.stringify(options.input)];
  const invocation = resolveHeadlessCliInvocation(options.headlessBinPath, cliArgs);
  try {
    const {
      stdout
    } = await execFileAsync(invocation.file, invocation.args, {
      cwd: REPO_ROOT,
      env: {
        ...process.env,
        APP_ENV: "test" ?? 0
      },
      maxBuffer: HEADLESS_CLI_MAX_BUFFER_BYTES
    });
    return parseCliResult(stdout);
  } catch (err) {
    if (typeof (err === null || err === void 0 ? void 0 : err.stdout) === 'string' && err.stdout.trim()) {
      return parseCliResult(err.stdout);
    }
    throw err;
  }
}
function resolveHeadlessCliInvocation(headlessBinPath, cliArgs) {
  if (looksLikeNodeScriptPath(headlessBinPath)) {
    return {
      file: process.execPath,
      args: [headlessBinPath, ...cliArgs]
    };
  }
  return {
    file: headlessBinPath,
    args: cliArgs
  };
}
function looksLikeNodeScriptPath(path) {
  return /\.(?:cjs|mjs|js)$/i.test(path);
}
function parseServerConfig(argv) {
  let apiInitJson;
  let headlessBinPath;
  let isPretty = false;
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--pretty') {
      isPretty = true;
      continue;
    }
    if (value === '--api-init-json') {
      apiInitJson = readFlagValue(argv, index);
      index += 1;
      continue;
    }
    if (value === '--mywallet-bin') {
      headlessBinPath = readFlagValue(argv, index);
      index += 1;
      continue;
    }
    throw new Error(`Unknown flag: ${value}`);
  }
  if (!apiInitJson) {
    throw new Error('Missing required --api-init-json');
  }
  return {
    apiInitArgs: JSON.parse(apiInitJson),
    headlessBinPath,
    isPretty
  };
}
function readFlagValue(argv, index) {
  const value = argv[index + 1];
  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${argv[index]}`);
  }
  return value;
}
function parseCliResult(stdout) {
  return JSON.parse(stdout);
}
function compactToolResultForMcp(command, cliResult) {
  if (command !== 'getSwapAssets' || !(cliResult !== null && cliResult !== void 0 && cliResult.ok) || !Array.isArray(cliResult === null || cliResult === void 0 ? void 0 : cliResult.data)) {
    return cliResult;
  }
  const previewLimit = 50;
  const preview = cliResult.data.slice(0, previewLimit);
  return {
    ...cliResult,
    data: {
      assets: preview,
      totalCount: cliResult.data.length,
      truncated: cliResult.data.length > preview.length
    }
  };
}
function summarizeToolResultText(command, cliResult) {
  if (command === 'getSwapAssets' && cliResult !== null && cliResult !== void 0 && cliResult.ok && cliResult !== null && cliResult !== void 0 && cliResult.data && !Array.isArray(cliResult.data)) {
    const totalCount = typeof cliResult.data.totalCount === 'number' ? cliResult.data.totalCount : undefined;
    const previewCount = Array.isArray(cliResult.data.assets) ? cliResult.data.assets.length : 0;
    const suffix = cliResult.data.truncated ? ' (preview truncated)' : '';
    return `Swap assets: ${String(totalCount ?? previewCount)} total, ${String(previewCount)} returned${suffix}`;
  }
  return JSON.stringify(cliResult);
}
function normalizeToolInput(input) {
  if (input === undefined) {
    return {};
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Tool input must be a JSON object');
  }
  return input;
}
function readNextMessage(buffer) {
  if (buffer.length === 0) {
    return undefined;
  }
  if (looksLikeContentLengthFrame(buffer)) {
    return readContentLengthMessage(buffer);
  }
  return readNdjsonMessage(buffer);
}
function looksLikeContentLengthFrame(buffer) {
  const prefixLength = Math.min(buffer.length, 32);
  const prefix = buffer.subarray(0, prefixLength).toString('utf8').toLowerCase();
  return prefix.startsWith(CONTENT_LENGTH_HEADER_PREFIX);
}
function readContentLengthMessage(buffer) {
  const separatorIndex = buffer.indexOf(HEADER_SEPARATOR);
  if (separatorIndex < 0) {
    return undefined;
  }
  const rawHeaders = buffer.subarray(0, separatorIndex).toString('utf8');
  const contentLength = parseContentLength(rawHeaders);
  const bodyStartIndex = separatorIndex + HEADER_SEPARATOR.length;
  const bodyEndIndex = bodyStartIndex + contentLength;
  if (buffer.length < bodyEndIndex) {
    return undefined;
  }
  return {
    framing: 'content-length',
    rawBody: buffer.subarray(bodyStartIndex, bodyEndIndex).toString('utf8'),
    remainingBuffer: buffer.subarray(bodyEndIndex)
  };
}
function readNdjsonMessage(buffer) {
  const newlineIndex = buffer.indexOf('\n');
  if (newlineIndex < 0) {
    return undefined;
  }
  const rawLine = buffer.subarray(0, newlineIndex).toString('utf8').replace(/\r$/, '').trim();
  return {
    framing: 'ndjson',
    rawBody: rawLine,
    remainingBuffer: buffer.subarray(newlineIndex + 1)
  };
}
function parseContentLength(rawHeaders) {
  var _contentLengthHeader$;
  const headerLines = rawHeaders.split('\r\n');
  const contentLengthHeader = headerLines.find(headerLine => headerLine.toLowerCase().startsWith('content-length:'));
  if (!contentLengthHeader) {
    throw new Error('Missing Content-Length header');
  }
  const rawValue = (_contentLengthHeader$ = contentLengthHeader.split(':')[1]) === null || _contentLengthHeader$ === void 0 ? void 0 : _contentLengthHeader$.trim();
  const contentLength = Number(rawValue);
  if (!Number.isFinite(contentLength) || contentLength < 0) {
    throw new Error('Invalid Content-Length header');
  }
  return contentLength;
}
function createSuccessResponse(id, result) {
  return {
    jsonrpc: JSON_RPC_VERSION,
    id,
    result
  };
}
function createErrorResponse(id, code, message, data) {
  return {
    jsonrpc: JSON_RPC_VERSION,
    id,
    error: {
      code,
      message,
      data
    }
  };
}
function formatError(error) {
  if (error instanceof Error) {
    return error.stack || error.message;
  }
  try {
    return JSON.stringify(error);
  } catch (_err) {
    return String(error);
  }
}

/***/ },

/***/ 43942
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ getEnvironment)
/* harmony export */ });
/* unused harmony export setEnvironment */
/* unused harmony import specifier */ var IS_CAPACITOR;
/* unused harmony import specifier */ var IS_EXTENSION;
/* unused harmony import specifier */ var ELECTRON_TONCENTER_MAINNET_KEY;
/* unused harmony import specifier */ var TONCENTER_MAINNET_KEY;
/* unused harmony import specifier */ var ELECTRON_TONCENTER_TESTNET_KEY;
/* unused harmony import specifier */ var TONCENTER_TESTNET_KEY;
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50352);
/*
 * This module is to be used instead of /src/util/environment.ts
 * when `window` is not available (e.g. in a web worker).
 */


const ELECTRON_ORIGIN = 'file://';
let environment;
function getAppOrigin(args) {
  if (args.isElectron) {
    return ELECTRON_ORIGIN;
  } else if (IS_CAPACITOR || IS_EXTENSION) {
    var _self;
    return (_self = self) === null || _self === void 0 ? void 0 : _self.origin;
  } else {
    return undefined;
  }
}
function setEnvironment(args) {
  const appOrigin = getAppOrigin(args);
  environment = {
    ...args,
    isDappSupported: true,
    isSseSupported: args.isElectron || IS_CAPACITOR,
    apiHeaders: appOrigin ? {
      'X-App-Origin': appOrigin
    } : {},
    byNetwork: {
      mainnet: {
        toncenterKey: args.isElectron ? ELECTRON_TONCENTER_MAINNET_KEY : TONCENTER_MAINNET_KEY
      },
      testnet: {
        toncenterKey: args.isElectron ? ELECTRON_TONCENTER_TESTNET_KEY : TONCENTER_TESTNET_KEY
      }
    }
  };
  return environment;
}
function getEnvironment() {
  return environment;
}

/***/ },

/***/ 68759
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  QD: () => (/* reexport */ ApiCommonError)
});

// UNUSED EXPORTS: ApiAuthError, ApiHardwareError, ApiLiquidUnstakeMode, ApiTokenImportError, ApiTransactionDraftError, ApiTransactionError

;// ./src/api/types/misc.ts
/**
 * The `fee` field should contain the final (real) fee, because we want to show the real fee in local transactions
 */

/** 1 USD equivalent to the amount of the other currency, e.g. 1 USD = 0.00000866 BTC */

let ApiLiquidUnstakeMode = /*#__PURE__*/function (ApiLiquidUnstakeMode) {
  ApiLiquidUnstakeMode[ApiLiquidUnstakeMode["Default"] = 0] = "Default";
  ApiLiquidUnstakeMode[ApiLiquidUnstakeMode["Instant"] = 1] = "Instant";
  ApiLiquidUnstakeMode[ApiLiquidUnstakeMode["BestRate"] = 2] = "BestRate";
  return ApiLiquidUnstakeMode;
}({});

// Country codes from ISO-3166-1 spec

/** Each string value can be either an address or a domain name */
;// ./src/api/types/errors.ts
let ApiCommonError = /*#__PURE__*/function (ApiCommonError) {
  ApiCommonError["Unexpected"] = "Unexpected";
  ApiCommonError["ServerError"] = "ServerError";
  ApiCommonError["DebugError"] = "DebugError";
  ApiCommonError["UnsupportedVersion"] = "UnsupportedVersion";
  ApiCommonError["InvalidPassword"] = "InvalidPassword";
  ApiCommonError["InvalidAddress"] = "InvalidAddress";
  ApiCommonError["DomainNotResolved"] = "DomainNotResolved";
  return ApiCommonError;
}({});
let ApiAuthError = /*#__PURE__*/function (ApiAuthError) {
  ApiAuthError["InvalidMnemonic"] = "InvalidMnemonic";
  return ApiAuthError;
}({});
let ApiTransactionDraftError = /*#__PURE__*/function (ApiTransactionDraftError) {
  ApiTransactionDraftError["InvalidAmount"] = "InvalidAmount";
  ApiTransactionDraftError["InvalidToAddress"] = "InvalidToAddress";
  ApiTransactionDraftError["InsufficientBalance"] = "InsufficientBalance";
  ApiTransactionDraftError["InvalidStateInit"] = "InvalidStateInit";
  ApiTransactionDraftError["WalletNotInitialized"] = "WalletNotInitialized";
  ApiTransactionDraftError["InvalidAddressFormat"] = "InvalidAddressFormat";
  ApiTransactionDraftError["InactiveContract"] = "InactiveContract";
  return ApiTransactionDraftError;
}({});
let ApiTransactionError = /*#__PURE__*/function (ApiTransactionError) {
  ApiTransactionError["PartialTransactionFailure"] = "PartialTransactionFailure";
  ApiTransactionError["IncorrectDeviceTime"] = "IncorrectDeviceTime";
  ApiTransactionError["InsufficientBalance"] = "InsufficientBalance";
  ApiTransactionError["UnsuccesfulTransfer"] = "UnsuccesfulTransfer";
  ApiTransactionError["WrongAddress"] = "WrongAddress";
  ApiTransactionError["WrongNetwork"] = "WrongNetwork";
  ApiTransactionError["ConcurrentTransaction"] = "ConcurrentTransaction";
  return ApiTransactionError;
}({});
let ApiHardwareError = /*#__PURE__*/function (ApiHardwareError) {
  /** Used when the chain's Ledger app needs to be updated to support this transaction */
  ApiHardwareError["HardwareOutdated"] = "HardwareOutdated";
  ApiHardwareError["BlindSigningNotEnabled"] = "BlindSigningNotEnabled";
  ApiHardwareError["RejectedByUser"] = "RejectedByUser";
  ApiHardwareError["ProofTooLarge"] = "ProofTooLarge";
  ApiHardwareError["ConnectionBroken"] = "ConnectionBroken";
  ApiHardwareError["WrongDevice"] = "WrongDevice";
  return ApiHardwareError;
}({});
let ApiTokenImportError = /*#__PURE__*/function (ApiTokenImportError) {
  ApiTokenImportError["AddressDoesNotExist"] = "AddressDoesNotExist";
  ApiTokenImportError["NotATokenAddress"] = "NotATokenAddress";
  return ApiTokenImportError;
}({});
;// ./src/api/types/index.ts















/***/ },

/***/ 50352
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UMQ: () => (/* binding */ IS_CAPACITOR),
/* harmony export */   gmk: () => (/* binding */ IS_AIR_APP),
/* harmony export */   hL1: () => (/* binding */ IS_EXTENSION),
/* harmony export */   rQT: () => (/* binding */ INDEXED_DB_STORE_NAME),
/* harmony export */   vPi: () => (/* binding */ INDEXED_DB_NAME)
/* harmony export */ });
/* unused harmony exports APP_ENV, IS_CORE_WALLET, APP_NAME, APP_VERSION, APP_COMMIT_HASH, APP_ENV_MARKER, EXTENSION_NAME, EXTENSION_DESCRIPTION, DEBUG, DEBUG_MORE, DEBUG_API, DEBUG_VIEW_ACCOUNTS, TEST_MNEMONIC, TEST_PASSWORD, IS_PRODUCTION, IS_TEST, IS_PERF, IS_FIREFOX_EXTENSION, IS_OPERA_EXTENSION, IS_PACKAGED_ELECTRON, IS_ANDROID, IS_ANDROID_DIRECT, IS_TELEGRAM_APP, IS_EXPLORER, ELECTRON_HOST_URL, INACTIVE_MARKER, PRODUCTION_URL, BETA_URL, APP_INSTALL_URL, APP_REPO_URL, SELF_UNIVERSAL_HOST_URL, BASE_URL, BOT_USERNAME, SWAP_FEE_ADDRESS, DIESEL_ADDRESS, STRICTERDOM_ENABLED, DEBUG_ALERT_MSG, PIN_LENGTH, NATIVE_BIOMETRICS_USERNAME, NATIVE_BIOMETRICS_SERVER, NATIVE_BIOMETRICS_PROMPT_KEY, IS_TON_MNEMONIC_ONLY, MNEMONIC_COUNT, MNEMONIC_COUNTS, PRIVATE_KEY_HEX_LENGTH, MNEMONIC_CHECK_COUNT, MOBILE_SCREEN_MAX_WIDTH, VIEW_TRANSITION_CLASS_NAME, ANIMATION_END_DELAY, ANIMATED_STICKER_TINY_ICON_PX, ANIMATED_STICKER_ICON_PX, ANIMATED_STICKER_TINY_SIZE_PX, ANIMATED_STICKER_SMALL_SIZE_PX, ANIMATED_STICKER_MIDDLE_SIZE_PX, ANIMATED_STICKER_DEFAULT_PX, ANIMATED_STICKER_BIG_SIZE_PX, ANIMATED_STICKER_HUGE_SIZE_PX, DEFAULT_PORTRAIT_WINDOW_SIZE, DEFAULT_LANDSCAPE_WINDOW_SIZE, DEFAULT_LANDSCAPE_ACTION_TAB_ID, TRANSACTION_ADDRESS_SHIFT, WHOLE_PART_DELIMITER, DEFAULT_SLIPPAGE_VALUE, GLOBAL_STATE_CACHE_DISABLED, GLOBAL_STATE_CACHE_KEY, ANIMATION_LEVEL_MIN, ANIMATION_LEVEL_MED, ANIMATION_LEVEL_MAX, ANIMATION_LEVEL_DEFAULT, THEME_DEFAULT, MAIN_ACCOUNT_ID, TEMPORARY_ACCOUNT_NAME, TONCENTER_MAINNET_URL, TONCENTER_MAINNET_KEY, ELECTRON_TONCENTER_MAINNET_KEY, TONAPIIO_MAINNET_URL, TONCENTER_TESTNET_URL, TONCENTER_TESTNET_KEY, ELECTRON_TONCENTER_TESTNET_KEY, TONAPIIO_TESTNET_URL, BRILLIANT_API_BASE_URL, PROXY_API_BASE_URL, IPFS_GATEWAY_BASE_URL, SSE_BRIDGE_URL, WALLET_CONNECT_BRIDGE_PATTERNS, WALLET_CONNECT_PROJECT_ID, TRON_MAINNET_API_URL, TRON_TESTNET_API_URL, SOLANA_MAINNET_RPC_URL, SOLANA_MAINNET_API_KEY, SOLANA_TESTNET_RPC_URL, SOLANA_TESTNET_API_KEY, SOLANA_TESTNET_API_URL, SOLANA_MAINNET_API_URL, SOLANA_GASLESS_PAYER_ADDRESS, FRACTION_DIGITS, SHORT_FRACTION_DIGITS, MAX_PUSH_NOTIFICATIONS_ACCOUNT_COUNT, SUPPORT_USERNAME, MTW_NEWS_CHANNEL_NAME, MTW_TIPS_CHANNEL_NAME, NFT_MARKETPLACE_TITLES, MTW_STATIC_BASE_URL, MTW_CARDS_BASE_URL, MTW_CARDS_MINT_BASE_URL, MYTONWALLET_PROMO_URL, MYTONWALLET_BLOG, MYTONWALLET_TERMS_OF_USE_URL, MYTONWALLET_PRIVACY_POLICY_URL, MULTISEND_DAPP_URL, PORTFOLIO_DAPP_URL, AGENT_API_URL, NFT_MARKETPLACE_URL, NFT_MARKETPLACE_TITLE, GETGEMS_BASE_MAINNET_URL, GETGEMS_BASE_TESTNET_URL, EMPTY_HASH_VALUE, IFRAME_WHITELIST, SUBPROJECT_URL_MASK, CHANGELLY_SUPPORT_EMAIL, CHANGELLY_LIVE_CHAT_URL, CHANGELLY_SECURITY_EMAIL, CHANGELLY_TERMS_OF_USE, CHANGELLY_PRIVACY_POLICY, CHANGELLY_AML_KYC, CHANGELLY_WAITING_DEADLINE, PROXY_HOSTS, TINY_TRANSFER_MAX_COST, IMAGE_CACHE_NAME, LANG_CACHE_NAME, LANG_LIST, IS_STAKING_DISABLED, VALIDATION_PERIOD_MS, ONE_TON, DEFAULT_FEE, UNSTAKE_TON_GRACE_PERIOD, STAKING_POOLS, LIQUID_POOL, LIQUID_JETTON, STAKING_MIN_AMOUNT, NOMINATORS_STAKING_MIN_AMOUNT, MIN_ACTIVE_STAKING_REWARDS, STAKING_SLUG_PREFIX, TONCONNECT_PROTOCOL_VERSION, TONCONNECT_WALLET_JSBRIDGE_KEY, EMBEDDED_DAPP_BRIDGE_CHANNEL, NFT_FRAGMENT_COLLECTIONS, NFT_FRAGMENT_GIFT_IMAGE_TO_URL_REGEX, TELEGRAM_GIFTS_SUPER_COLLECTION, MTW_CARDS_WEBSITE, MTW_CARDS_COLLECTION, TON_DNS_RENEWAL_WARNING_DAYS, TON_DNS_RENEWAL_NFT_WARNING_DAYS, TONCOIN, TRX, SOLANA, MYCOIN_MAINNET, MYCOIN_TESTNET, STAKED_TON_SLUG, STAKED_MYCOIN_SLUG, MYCOIN_STAKING_POOL, ETHENA_STAKING_VAULT, ETHENA_STAKING_MIN_AMOUNT, ETHENA_ELIGIBILITY_CHECK_URL, STON_PTON_ADDRESS, STON_PTON_SLUG, DNS_IMAGE_GEN_URL, TRC20_USDT_MAINNET, TRC20_USDT_TESTNET, TON_USDT_MAINNET, TON_USDT_TESTNET, TON_USDE, TON_TSUSDE, SOLANA_USDT_MAINNET, SOLANA_USDC_MAINNET, TOKEN_CUSTOM_STYLES, ALL_STAKING_POOLS, PRIORITY_TOKEN_SLUGS, INIT_SWAP_ASSETS, DEFAULT_SWAP_FIRST_TOKEN_SLUG, DEFAULT_SWAP_SECOND_TOKEN_SLUG, DEFAULT_SWAP_AMOUNT, DEFAULT_TRANSFER_TOKEN_SLUG, SWAP_DEX_LABELS, ACTIVE_TAB_STORAGE_KEY, WINDOW_PROVIDER_CHANNEL, WINDOW_PROVIDER_PORT, SHOULD_SHOW_ALL_ASSETS_AND_ACTIVITY, PORTRAIT_MIN_ASSETS_TAB_VIEW, LANDSCAPE_MIN_ASSETS_TAB_VIEW, DEFAULT_PRICE_CURRENCY, CURRENCIES, BURN_ADDRESS, DEFAULT_WALLET_VERSION, POPULAR_WALLET_VERSIONS, DEFAULT_TIMEOUT, DEFAULT_RETRIES, DEFAULT_ERROR_PAUSE, HISTORY_PERIODS, BROWSER_HISTORY_LIMIT, NFT_BATCH_SIZE, NOTCOIN_VOUCHERS_ADDRESS, BURN_CHUNK_DURATION_APPROX_SEC, NOTCOIN_FORWARD_TON_AMOUNT, NOTCOIN_EXCHANGERS, CLAIM_ADDRESS, CLAIM_AMOUNT, CLAIM_COMMENT, MINT_CARD_ADDRESS, MINT_CARD_COMMENT, MINT_CARD_REFUND_COMMENT, RE_LINK_TEMPLATE, RE_TG_BOT_MENTION, STARS_SYMBOL, GIVEAWAY_CHECKIN_URL, AUTOLOCK_OPTIONS_LIST, AUTO_CONFIRM_DURATION_MINUTES, PRICELESS_TOKEN_HASHES, STAKED_TOKEN_SLUGS, DEFAULT_OUR_SWAP_FEE, MTW_AGGREGATOR_QUERY_ID, DEFAULT_STAKING_STATE, DEFAULT_NOMINATORS_STAKING_STATE, SWAP_API_VERSION, TONCENTER_ACTIONS_VERSION, JVAULT_URL, HELP_CENTER_URL, TON_DNS_ZONES, RENEWABLE_TON_DNS_COLLECTIONS, DEFAULT_AUTOLOCK_OPTION, WRONG_ATTEMPTS_BEFORE_LOG_OUT_SUGGESTION, UNKNOWN_TOKEN, DEFAULT_CHAIN */
var _process$env$TEST_MNE;
/* eslint-disable @stylistic/max-len */

const APP_ENV = "test" || 0;
const IS_CORE_WALLET = undefined === '1';
const APP_NAME = (/* unused pure expression or super */ null && ( false || (IS_CORE_WALLET ? 'TON Wallet' : 'MyTonWallet')));
const APP_VERSION = (/* unused pure expression or super */ null && (undefined));
const APP_COMMIT_HASH = (/* unused pure expression or super */ null && (undefined));
const APP_ENV_MARKER = APP_ENV === 'staging' ? 'Beta' : APP_ENV === 'development' ? 'Dev' : undefined;
const EXTENSION_NAME = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'TON Wallet' : 'MyTonWallet · My TON Wallet'));
const EXTENSION_DESCRIPTION = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'Set up your own TON Wallet on The Open Network' : 'The most feature-rich TON+TRON wallet: multi-accounts, multi-send, Telegram Gifts and other collectibles, TON DNS+Proxy, and more.'));
const DEBUG = APP_ENV !== 'production' && APP_ENV !== 'perf' && APP_ENV !== 'test';
const DEBUG_MORE = false;
const DEBUG_API = false;
const DEBUG_VIEW_ACCOUNTS = false;
const TEST_MNEMONIC = (_process$env$TEST_MNE = undefined) === null || _process$env$TEST_MNE === void 0 ? void 0 : _process$env$TEST_MNE.trim();
const TEST_PASSWORD = (/* unused pure expression or super */ null && ( false || 'test'));
const IS_PRODUCTION = APP_ENV === 'production';
const IS_TEST = APP_ENV === 'test';
const IS_PERF = APP_ENV === 'perf';
const IS_EXTENSION = undefined === '1';
const IS_FIREFOX_EXTENSION = (/* unused pure expression or super */ null && (undefined === '1'));
const IS_OPERA_EXTENSION = (/* unused pure expression or super */ null && (undefined === '1'));
const IS_PACKAGED_ELECTRON = undefined === '1';
const IS_ANDROID = (/* unused pure expression or super */ null && (undefined === 'Android'));
const IS_CAPACITOR = undefined === '1';
const IS_ANDROID_DIRECT = (/* unused pure expression or super */ null && (undefined === '1'));
const IS_AIR_APP = undefined === '1';
const IS_TELEGRAM_APP = (/* unused pure expression or super */ null && (undefined === '1'));
const IS_EXPLORER = undefined === '1';
const ELECTRON_HOST_URL = 'https://dumb-host';
const INACTIVE_MARKER = '[Inactive]';
const PRODUCTION_URL = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'https://wallet.ton.org' : 'https://mytonwallet.app'));
const BETA_URL = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'https://beta.wallet.ton.org' : 'https://beta.mytonwallet.app'));
const APP_INSTALL_URL = 'https://get.mytonwallet.io/';
const APP_REPO_URL = 'https://github.com/mytonwallet-org/mytonwallet';
const SELF_UNIVERSAL_HOST_URL = 'https://my.tt';

// GitHub workflow uses an empty string as the default value if it's not in repository variables, so we cannot define a default value here
const BASE_URL = (/* unused pure expression or super */ null && ( false || PRODUCTION_URL));
const BOT_USERNAME = (/* unused pure expression or super */ null && ( false || 'MyTonWalletBot'));
const SWAP_FEE_ADDRESS = (/* unused pure expression or super */ null && ( false || 'UQDUkQbpTVIgt7v66-JTFR-3-eXRFz_4V66F-Ufn6vOg0GOp'));
const DIESEL_ADDRESS = (/* unused pure expression or super */ null && ( false || 'UQC9lQOaEHC6YASiJJ2NrKEOlITMMQmc8j0_iZEHy-4sl3tG'));
const STRICTERDOM_ENABLED = DEBUG && !IS_PACKAGED_ELECTRON;
const DEBUG_ALERT_MSG = 'Shoot!\nSomething went wrong, please see the error details in Dev Tools Console.';
const PIN_LENGTH = 4;
const NATIVE_BIOMETRICS_USERNAME = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'TonWallet' : 'MyTonWallet'));
const NATIVE_BIOMETRICS_SERVER = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'https://wallet.ton.org' : 'https://mytonwallet.app'));
const NATIVE_BIOMETRICS_PROMPT_KEY = 'confirm an action in MyTonWallet';

/** If `true`, the app supports only TON-specific mnemonics */
const IS_TON_MNEMONIC_ONLY = (/* unused pure expression or super */ null && (IS_CORE_WALLET));
const MNEMONIC_COUNT = 24;
const MNEMONIC_COUNTS = (/* unused pure expression or super */ null && (IS_TON_MNEMONIC_ONLY ? [24] : [12, 24]));
const PRIVATE_KEY_HEX_LENGTH = 64;
const MNEMONIC_CHECK_COUNT = 3;
const MOBILE_SCREEN_MAX_WIDTH = 700; // px

const VIEW_TRANSITION_CLASS_NAME = 'active-view-transition';
const ANIMATION_END_DELAY = 50;
const ANIMATED_STICKER_TINY_ICON_PX = 16;
const ANIMATED_STICKER_ICON_PX = 30;
const ANIMATED_STICKER_TINY_SIZE_PX = 70;
const ANIMATED_STICKER_SMALL_SIZE_PX = 110;
const ANIMATED_STICKER_MIDDLE_SIZE_PX = 120;
const ANIMATED_STICKER_DEFAULT_PX = 150;
const ANIMATED_STICKER_BIG_SIZE_PX = 156;
const ANIMATED_STICKER_HUGE_SIZE_PX = 192;
const DEFAULT_PORTRAIT_WINDOW_SIZE = {
  width: 368,
  height: 770
};
const DEFAULT_LANDSCAPE_WINDOW_SIZE = {
  width: 980,
  height: 788
};
const DEFAULT_LANDSCAPE_ACTION_TAB_ID = 0;
const TRANSACTION_ADDRESS_SHIFT = 4;
const WHOLE_PART_DELIMITER = ' '; // https://www.compart.com/en/unicode/U+202F

const DEFAULT_SLIPPAGE_VALUE = 5;
const GLOBAL_STATE_CACHE_DISABLED = false;
const GLOBAL_STATE_CACHE_KEY = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'tonwallet-global-state' : IS_EXPLORER ? 'explorer-global-state' : 'mytonwallet-global-state'));
const ANIMATION_LEVEL_MIN = 0;
const ANIMATION_LEVEL_MED = 1;
const ANIMATION_LEVEL_MAX = 2;
const ANIMATION_LEVEL_DEFAULT = (/* unused pure expression or super */ null && (ANIMATION_LEVEL_MAX));
const THEME_DEFAULT = 'system';
const MAIN_ACCOUNT_ID = '0-ton-mainnet';
const TEMPORARY_ACCOUNT_NAME = 'Wallet';
const TONCENTER_MAINNET_URL = (/* unused pure expression or super */ null && ( false || 'https://toncenter.mytonwallet.org'));
const TONCENTER_MAINNET_KEY = (/* unused pure expression or super */ null && (undefined));
const ELECTRON_TONCENTER_MAINNET_KEY = (/* unused pure expression or super */ null && (undefined));
const TONAPIIO_MAINNET_URL = (/* unused pure expression or super */ null && ( false || 'https://tonapiio.mytonwallet.org'));
const TONCENTER_TESTNET_URL = (/* unused pure expression or super */ null && ( false || 'https://toncenter-testnet.mytonwallet.org'));
const TONCENTER_TESTNET_KEY = (/* unused pure expression or super */ null && (undefined));
const ELECTRON_TONCENTER_TESTNET_KEY = (/* unused pure expression or super */ null && (undefined));
const TONAPIIO_TESTNET_URL = (/* unused pure expression or super */ null && ( false || 'https://tonapiio-testnet.mytonwallet.org'));
const BRILLIANT_API_BASE_URL = (/* unused pure expression or super */ null && ( false || 'https://api.mytonwallet.org'));
const PROXY_API_BASE_URL = (/* unused pure expression or super */ null && ( false || 'https://api.mytonwallet.org/proxy'));
const IPFS_GATEWAY_BASE_URL = 'https://ipfs.io/ipfs/';
const SSE_BRIDGE_URL = 'https://tonconnectbridge.mytonwallet.org/bridge/';
const WALLET_CONNECT_BRIDGE_PATTERNS = 'https://*.walletconnect.com https://*.walletconnect.org wss://*.walletconnect.com wss://*.walletconnect.org';
const WALLET_CONNECT_PROJECT_ID = (/* unused pure expression or super */ null && ( false || ''));
const TRON_MAINNET_API_URL = (/* unused pure expression or super */ null && ( false || 'https://tronapi.mytonwallet.org'));
const TRON_TESTNET_API_URL = (/* unused pure expression or super */ null && ( false || 'https://api.shasta.trongrid.io'));
const SOLANA_MAINNET_RPC_URL = (/* unused pure expression or super */ null && ( false || 'https://solanaapi.mytonwallet.org'));
const SOLANA_MAINNET_API_KEY = (/* unused pure expression or super */ null && (undefined));
const SOLANA_TESTNET_RPC_URL = (/* unused pure expression or super */ null && ( false || 'https://solanaapi-devnet.mytonwallet.org'));
const SOLANA_TESTNET_API_KEY = (/* unused pure expression or super */ null && (undefined));
const SOLANA_TESTNET_API_URL = (/* unused pure expression or super */ null && ( false || 'https://solanaapi-devnet.mytonwallet.org'));
const SOLANA_MAINNET_API_URL = (/* unused pure expression or super */ null && ( false || 'https://solanaapi.mytonwallet.org'));
const SOLANA_GASLESS_PAYER_ADDRESS = (/* unused pure expression or super */ null && ( false || 'BkVfRKjZnnYCcRBgXBsfaWFZFidBL9drm5MZwNqoNGCu'));
const FRACTION_DIGITS = 9;
const SHORT_FRACTION_DIGITS = 2;
const MAX_PUSH_NOTIFICATIONS_ACCOUNT_COUNT = 3;
const SUPPORT_USERNAME = 'mysupport';
const MTW_NEWS_CHANNEL_NAME = {
  en: 'MyTonWalletEn',
  ru: 'MyTonWalletRu'
};
const MTW_TIPS_CHANNEL_NAME = {
  en: 'MyTonWalletTips',
  ru: 'MyTonWalletTipsRu'
};
const NFT_MARKETPLACE_TITLES = {
  getgems: 'Getgems',
  fragment: 'Fragment'
};
const MTW_STATIC_BASE_URL = 'https://static.mytonwallet.org';
const MTW_CARDS_BASE_URL = (/* unused pure expression or super */ null && (`${MTW_STATIC_BASE_URL}/cards/v2/cards/`));
const MTW_CARDS_MINT_BASE_URL = (/* unused pure expression or super */ null && (`${MTW_STATIC_BASE_URL}/mint-cards/`));
const MYTONWALLET_PROMO_URL = 'https://mytonwallet.io/';
const MYTONWALLET_BLOG = {
  en: 'https://mytonwallet.io/en/blog/',
  ru: 'https://mytonwallet.io/ru/blog/'
};
const MYTONWALLET_TERMS_OF_USE_URL = 'https://mytonwallet.io/terms-of-use';
const MYTONWALLET_PRIVACY_POLICY_URL = 'https://mytonwallet.io/privacy-policy';
const MULTISEND_DAPP_URL = (/* unused pure expression or super */ null && ( false || 'https://multisend.mytonwallet.io/'));
const PORTFOLIO_DAPP_URL =  false || 'https://portfolio.mytonwallet.io/';
const AGENT_API_URL = (/* unused pure expression or super */ null && ( false || 'https://agent.mytonwallet.org/api'));
const NFT_MARKETPLACE_URL = 'https://getgems.io/';
const NFT_MARKETPLACE_TITLE = NFT_MARKETPLACE_TITLES.getgems;
const GETGEMS_BASE_MAINNET_URL = 'https://getgems.io/';
const GETGEMS_BASE_TESTNET_URL = 'https://testnet.getgems.io/';
const EMPTY_HASH_VALUE = 'NOHASH';
const IFRAME_WHITELIST = ['http://localhost:*', 'https://tonscan.org', 'https://testnet.tonscan.org', 'https://tonviewer.com', 'https://testnet.tonviewer.com', PORTFOLIO_DAPP_URL];
const SUBPROJECT_URL_MASK = 'https://*.mytonwallet.io';
const CHANGELLY_SUPPORT_EMAIL = 'support@changelly.com';
const CHANGELLY_LIVE_CHAT_URL = 'https://changelly.com/';
const CHANGELLY_SECURITY_EMAIL = 'security@changelly.com';
const CHANGELLY_TERMS_OF_USE = 'https://changelly.com/terms-of-use';
const CHANGELLY_PRIVACY_POLICY = 'https://changelly.com/privacy-policy';
const CHANGELLY_AML_KYC = 'https://changelly.com/aml-kyc';
const CHANGELLY_WAITING_DEADLINE = (/* unused pure expression or super */ null && (3 * 60 * 60 * 1000)); // 3 hours

const PROXY_HOSTS = (/* unused pure expression or super */ null && (undefined));
const TINY_TRANSFER_MAX_COST = 0.01;
const IMAGE_CACHE_NAME = (/* unused pure expression or super */ null && (IS_EXPLORER ? 'explorer-image' : 'mtw-image'));
const LANG_CACHE_NAME = 'mtw-lang-285';
const LANG_LIST = [{
  langCode: 'en',
  name: 'English',
  nativeName: 'English',
  rtl: false
}, {
  langCode: 'es',
  name: 'Spanish',
  nativeName: 'Español',
  rtl: false
}, {
  langCode: 'ru',
  name: 'Russian',
  nativeName: 'Русский',
  rtl: false
}, {
  langCode: 'zh-Hans',
  name: 'Chinese (Simplified)',
  nativeName: '简体',
  rtl: false
}, {
  langCode: 'zh-Hant',
  name: 'Chinese (Traditional)',
  nativeName: '繁體',
  rtl: false
}, {
  langCode: 'tr',
  name: 'Turkish',
  nativeName: 'Türkçe',
  rtl: false
}, {
  langCode: 'de',
  name: 'German',
  nativeName: 'Deutsch',
  rtl: false
}, {
  langCode: 'th',
  name: 'Thai',
  nativeName: 'ไทย',
  rtl: false
}, {
  langCode: 'uk',
  name: 'Ukrainian',
  nativeName: 'Українська',
  rtl: false
}, {
  langCode: 'pl',
  name: 'Polish',
  nativeName: 'Polski',
  rtl: false
}];
const IS_STAKING_DISABLED = (/* unused pure expression or super */ null && (IS_CORE_WALLET));
const VALIDATION_PERIOD_MS = 65_536_000; // 18.2 h.
const ONE_TON = 1_000_000_000n;
const DEFAULT_FEE = 15_000_000n; // 0.015 TON
const UNSTAKE_TON_GRACE_PERIOD = (/* unused pure expression or super */ null && (20 * 60 * 1000)); // 20 m.

const STAKING_POOLS =  false ? 0 : [];
const LIQUID_POOL =  false || 'EQD2_4d91M4TVbEBVyBF8J1UwpMJc361LKVCz6bBlffMW05o';
const LIQUID_JETTON = (/* unused pure expression or super */ null && ( false || 'EQCqC6EhRJ_tpWngKxL6dV0k6DSnRUrs9GSVkLbfdCqsj6TE'));
const STAKING_MIN_AMOUNT = (/* unused pure expression or super */ null && (ONE_TON));
const NOMINATORS_STAKING_MIN_AMOUNT = 10_000n * ONE_TON;
const MIN_ACTIVE_STAKING_REWARDS = 100_000_000n; // 0.1 MY
// Staked tokens now showing with all other tokens, so we need to add a prefix to avoid collisions
const STAKING_SLUG_PREFIX = 'staking-';
const TONCONNECT_PROTOCOL_VERSION = 2;
const TONCONNECT_WALLET_JSBRIDGE_KEY = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'tonwallet' : 'mytonwallet'));
const EMBEDDED_DAPP_BRIDGE_CHANNEL = 'embedded-dapp-bridge';
const NFT_FRAGMENT_COLLECTIONS = (/* unused pure expression or super */ null && (['0:0e41dc1dc3c9067ed24248580e12b3359818d83dee0304fabcf80845eafafdb2',
// Anonymous Telegram Numbers
'0:80d78a35f955a14b679faa887ff4cd5bfc0f43b4a4eea2a7e6927f3701b273c2' // Telegram Usernames
]));
const NFT_FRAGMENT_GIFT_IMAGE_TO_URL_REGEX = /^https?:\/\/nft\.(fragment\.com\/gift\/[\w-]+-\d+)\.\w+$/i;
const TELEGRAM_GIFTS_SUPER_COLLECTION = 'super:telegram-gifts';
const MTW_CARDS_WEBSITE = 'https://cards.mytonwallet.io';
const MTW_CARDS_COLLECTION = 'EQCQE2L9hfwx1V8sgmF9keraHx1rNK9VmgR1ctVvINBGykyM';
const TON_DNS_RENEWAL_WARNING_DAYS = 14;
const TON_DNS_RENEWAL_NFT_WARNING_DAYS = 30;
const TONCOIN = {
  name: 'Toncoin',
  symbol: 'TON',
  slug: 'toncoin',
  decimals: 9,
  chain: 'ton',
  cmcSlug: 'toncoin',
  priceUsd: 3.1
};
const TRX = {
  name: 'TRON',
  symbol: 'TRX',
  slug: 'trx',
  decimals: 6,
  chain: 'tron',
  cmcSlug: 'tron'
};
const SOLANA = {
  name: 'Solana',
  symbol: 'SOL',
  slug: 'sol',
  decimals: 9,
  chain: 'solana',
  cmcSlug: 'solana'
};
const MYCOIN_MAINNET = {
  name: 'MyTonWallet Coin',
  symbol: 'MY',
  slug: 'ton-eqcfvnlrbn',
  decimals: 9,
  chain: 'ton',
  minterAddress: 'EQCFVNlRb-NHHDQfv3Q9xvDXBLJlay855_xREsq5ZDX6KN-w',
  image: 'https://imgproxy.mytonwallet.org/imgproxy/Qy038wCBKISofJ0hYMlj6COWma330cx3Ju1ZSPM2LRU/rs:fill:200:200:1/g:no/aHR0cHM6Ly9teXRvbndhbGxldC5pby9sb2dvLTI1Ni1ibHVlLnBuZw.webp'
};
const MYCOIN_TESTNET = {
  ...MYCOIN_MAINNET,
  slug: 'ton-kqawlxpebw',
  minterAddress: 'kQAWlxpEbwhCDFX9gp824ee2xVBhAh5VRSGWfbNFDddAbQoQ',
  image: undefined
};
const STAKED_TON_SLUG = 'ton-eqcqc6ehrj';
const STAKED_MYCOIN_SLUG = 'ton-eqcbzvsfwq';
const MYCOIN_STAKING_POOL = 'EQC3roTiRRsoLzfYVK7yVVoIZjTEqAjQU3ju7aQ7HWTVL5o5';
const ETHENA_STAKING_VAULT = 'EQChGuD1u0e7KUWHH5FaYh_ygcLXhsdG2nSHPXHW8qqnpZXW';
const ETHENA_STAKING_MIN_AMOUNT = 1_000_000; // 1 USDe
const ETHENA_ELIGIBILITY_CHECK_URL = 'https://t.me/id_app/start?startapp=cQeewNnc3pVphUcwY63WruKMQDpgePd1E7eMVoqphMZAdGoU9jwS4qRqrM1kSeaqrAiiDiC3EYAJPwZDGWqxZpw5vtGxmHma59XEt';
const STON_PTON_ADDRESS = 'EQCM3B12QK1e4yZSf8GtBRT0aLMNyEsBc_DhVfRRtOEffLez';
const STON_PTON_SLUG = 'ton-eqcm3b12qk';
const DNS_IMAGE_GEN_URL = 'https://dns-image.mytonwallet.org/img?d=';
const TRC20_USDT_MAINNET = {
  name: 'Tether USD',
  symbol: 'USDT',
  decimals: 6,
  chain: 'tron',
  slug: 'tron-tr7nhqjekq',
  tokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  label: 'TRC-20'
};
const TRC20_USDT_TESTNET = {
  ...TRC20_USDT_MAINNET,
  slug: 'tron-tg3xxyexbk',
  tokenAddress: 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs'
};
const TON_USDT_MAINNET = {
  name: 'Tether USD',
  symbol: 'USD₮',
  chain: 'ton',
  slug: 'ton-eqcxe6mutq',
  decimals: 6,
  tokenAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
  image: 'https://imgproxy.mytonwallet.org/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp',
  label: 'TON',
  priceUsd: 1
};

// Where to get this token: https://t.me/testgiver_ton_usdt_bot
const TON_USDT_TESTNET = {
  ...TON_USDT_MAINNET,
  slug: 'ton-kqd0gkbm8z',
  tokenAddress: 'kQD0GKBM8ZbryVk2aESmzfU6b9b_8era_IkvBSELujFZPsyy',
  image: undefined
};
const TON_USDE = {
  name: 'Ethena USDe',
  symbol: 'USDe',
  chain: 'ton',
  tokenAddress: 'EQAIb6KmdfdDR7CN1GBqVJuP25iCnLKCvBlJ07Evuu2dzP5f',
  slug: 'ton-eqaib6kmdf',
  decimals: 6,
  image: 'https://imgproxy.toncenter.com/binMwUmcnFtjvgjp4wSEbsECXwfXUwbPkhVvsvpubNw/pr:small/aHR0cHM6Ly9tZXRhZGF0YS5sYXllcnplcm8tYXBpLmNvbS9hc3NldHMvVVNEZS5wbmc'
};
const TON_TSUSDE = {
  name: 'Ethena tsUSDe',
  symbol: 'tsUSDe',
  chain: 'ton',
  tokenAddress: 'EQDQ5UUyPHrLcQJlPAczd_fjxn8SLrlNQwolBznxCdSlfQwr',
  slug: 'ton-eqdq5uuyph',
  decimals: 6,
  image: 'https://cache.tonapi.io/imgproxy/vGZJ7erwsWPo7DpVG_V7ygNn7VGs0szZXcNLHB_l0ms/rs:fill:200:200:1/g:no/aHR0cHM6Ly9tZXRhZGF0YS5sYXllcnplcm8tYXBpLmNvbS9hc3NldHMvdHNVU0RlLnBuZw.webp'
};
const SOLANA_USDT_MAINNET = {
  name: 'Tether USD',
  symbol: 'USDT',
  decimals: 6,
  chain: 'solana',
  slug: 'solana-es9vmfrzac',
  tokenAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  label: 'SOL',
  image: 'https://imgproxy.mytonwallet.org/imgproxy/T3PB4s7oprNVaJkwqbGg54nexKE0zzKhcrPv8jcWYzU/rs:fill:200:200:1/g:no/aHR0cHM6Ly90ZXRoZXIudG8vaW1hZ2VzL2xvZ29DaXJjbGUucG5n.webp',
  priceUsd: 1
};
const SOLANA_USDC_MAINNET = {
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  chain: 'solana',
  slug: 'solana-epjfwdd5au',
  tokenAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  label: 'SOL',
  image: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  priceUsd: 1
};

/** The properties not returned by the backend, and therefore not stored in token objects */
const TOKEN_CUSTOM_STYLES = {
  [TONCOIN.slug]: {
    fontIcon: 'icon-chain-ton',
    cardColor: 'blue'
  },
  [TRX.slug]: {
    fontIcon: 'icon-chain-tron',
    cardColor: 'red'
  },
  [SOLANA.slug]: {
    fontIcon: 'icon-chain-solana',
    cardColor: 'purple'
  },
  [STAKED_TON_SLUG]: {
    cardColor: 'green'
  }
};
const ALL_STAKING_POOLS = [LIQUID_POOL, MYCOIN_STAKING_POOL, ETHENA_STAKING_VAULT, TON_TSUSDE.tokenAddress];
const PRIORITY_TOKEN_SLUGS = [TONCOIN.slug, SOLANA.slug, TRC20_USDT_MAINNET.slug, TON_USDT_MAINNET.slug, SOLANA_USDT_MAINNET.slug, SOLANA_USDC_MAINNET.slug];
const INIT_SWAP_ASSETS = {
  in: {
    ...TONCOIN,
    isPopular: true
  },
  out: {
    ...TON_USDT_MAINNET,
    isPopular: true
  }
};
const DEFAULT_SWAP_FIRST_TOKEN_SLUG = TONCOIN.slug;
const DEFAULT_SWAP_SECOND_TOKEN_SLUG = TON_USDT_MAINNET.slug;
const DEFAULT_SWAP_AMOUNT = '10';
const DEFAULT_TRANSFER_TOKEN_SLUG = TONCOIN.slug;
const SWAP_DEX_LABELS = {
  dedust: 'DeDust',
  ston: 'STON.fi'
};
const ACTIVE_TAB_STORAGE_KEY = (/* unused pure expression or super */ null && (IS_CORE_WALLET ? 'tw-active-tab' : IS_EXPLORER ? 'explorer-active-tab' : 'mtw-active-tab'));
const INDEXED_DB_NAME = IS_EXPLORER ? 'explorer-keyval-store' : 'keyval-store';
const INDEXED_DB_STORE_NAME = 'keyval';
const WINDOW_PROVIDER_CHANNEL = 'windowProvider';
const WINDOW_PROVIDER_PORT = (/* unused pure expression or super */ null && (`${IS_CORE_WALLET ? 'TonWallet' : 'MyTonWallet'}_popup_reversed`));
const SHOULD_SHOW_ALL_ASSETS_AND_ACTIVITY = (/* unused pure expression or super */ null && (IS_CORE_WALLET));
const PORTRAIT_MIN_ASSETS_TAB_VIEW = 6;
const LANDSCAPE_MIN_ASSETS_TAB_VIEW = 6;
const DEFAULT_PRICE_CURRENCY = 'USD';
const CURRENCIES = {
  USD: {
    name: 'US Dollar',
    decimals: 2,
    shortSymbol: '$',
    fallbackRate: '1'
  },
  EUR: {
    name: 'Euro',
    decimals: 2,
    shortSymbol: '€',
    fallbackRate: '0.85233500'
  },
  RUB: {
    name: 'Russian Ruble',
    decimals: 2,
    shortSymbol: '₽',
    fallbackRate: '84.49824600'
  },
  CNY: {
    name: 'Chinese Yuan',
    decimals: 2,
    shortSymbol: '¥',
    fallbackRate: '7.11865000'
  },
  BTC: {
    name: 'Bitcoin',
    decimals: 9,
    fallbackRate: '0.00000866'
  },
  [TONCOIN.symbol]: {
    name: 'Toncoin',
    decimals: 9,
    fallbackRate: '0.31360000'
  }
};
const BURN_ADDRESS = 'UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ';
const DEFAULT_WALLET_VERSION = 'W5';
const POPULAR_WALLET_VERSIONS = (/* unused pure expression or super */ null && (['v3R1', 'v3R2', 'v4R2', 'W5']));
const DEFAULT_TIMEOUT = 10000;
const DEFAULT_RETRIES = 3;
const DEFAULT_ERROR_PAUSE = 500;
const HISTORY_PERIODS = (/* unused pure expression or super */ null && (['1D', '7D', '1M', '3M', '1Y', 'ALL']));
const BROWSER_HISTORY_LIMIT = 10;
const NFT_BATCH_SIZE = 4;
const NOTCOIN_VOUCHERS_ADDRESS = 'EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW';
const BURN_CHUNK_DURATION_APPROX_SEC = 30;
const NOTCOIN_FORWARD_TON_AMOUNT = 30000000n; // 0.03 TON
const NOTCOIN_EXCHANGERS = (/* unused pure expression or super */ null && (['EQAPZauWVPUcm2hUJT9n36pxznEhl46rEn1bzBXN0RY_yiy2', 'EQASgm0Qv3h2H2mF0W06ikPqYq2ctT3dyXMJH_svbEKKB3iZ', 'EQArlmP-RhVIG2yAFGZyPZfM3m0YccxmpvoRi6sgRzWnAA0s', 'EQA6pL-spYqZp1Ck6o3rpY45Cl-bvLMW_j3qdVejOkUWpLnm', 'EQBJ_ehYjumQKbXfWUue1KHKXdTm1GuYJB0Fj2ST_DwORvpd', 'EQBRmYSjxh9xlZpUqEmGjF5UjukI9v_Cm2kCTu4CoBn3XkOD', 'EQBkiqncd7AFT5_23H-RoA2Vynk-Nzq_dLoeMVRthAU9RF0p', 'EQB_OzTHXbztABe0QHgr4PtAV8T64LR6aDunXgaAoihOdxwO', 'EQCL-x5kLg6tKVNGryItTuj6tG3FH5mhUEu0xRqQc-kbEmbe', 'EQCZh2yJ46RaQH3AYmjEA8SMMXi77Oein4-3lvqkHseIAhD-', 'EQChKo5IK3iNqUHUGDB9gtzjCjMTPtmsFqekuCA2MdreVEyu', 'EQC6DNCBv076TIliRMfOt20RpbS7rNKDfSky3WrFEapFt8AH', 'EQDE_XFZOYae_rl3ZMsgBCtRSmYhl8B4y2BZEP7oiGBDhlgy', 'EQDddqpGA2ePXQF47A2DSL3GF6ZzIVmimfM2d16cdymy2noT', 'EQDv0hNNAamhYltCh3pTJrq3oRB9RW2ZhEYkTP6fhj5BtZNu', 'EQD2mP7zgO7-imUJhqYry3i07aJ_SR53DaokMupfAAobt0Xw']));
const CLAIM_ADDRESS = 'EQB3zOTvPi1PmwdcTpqSfFKZnhi1GNKEVJM-LdoAirdLtash';
const CLAIM_AMOUNT = 30000000n; // 0.03 TON
const CLAIM_COMMENT = 'claim';
const MINT_CARD_ADDRESS = 'EQBpst3ZWJ9Dqq5gE2YH-yPsFK_BqMOmgi7Z_qK6v7WbrPWv';
const MINT_CARD_COMMENT = 'Mint card';
const MINT_CARD_REFUND_COMMENT = 'Refund';
const RE_LINK_TEMPLATE = /((ftp|https?):\/\/)?(?<host>(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z][-a-zA-Z0-9]{1,62})\b([-a-zA-Z0-9()@:%_+.,~#?&/=]*)/g;
const RE_TG_BOT_MENTION = /(telegram|tg)[:\s-]*@[a-z0-9_]+|(https?:\/\/)?(t\.me|telegram\.me|telegram\.dog)\/[a-z0-9_]+/mi;
const STARS_SYMBOL = '⭐️';
const GIVEAWAY_CHECKIN_URL = (/* unused pure expression or super */ null && ( false || 'https://giveaway.mytonwallet.io'));
const AUTOLOCK_OPTIONS_LIST = [{
  value: 'never',
  name: 'Disabled',
  selectedName: 'Disabled',
  period: 0
}, {
  value: '1',
  name: '30 seconds',
  selectedName: 'If away for 30 sec',
  period: 30_000
}, {
  value: '2',
  name: '3 minutes',
  selectedName: 'If away for 3 min',
  period: 60_000 * 3
}, {
  value: '3',
  name: '10 minutes',
  selectedName: 'If away for 10 min',
  period: 60_000 * 10
}];
const AUTO_CONFIRM_DURATION_MINUTES = 5;
const PRICELESS_TOKEN_HASHES = new Set(['173e31eee054cb0c76f77edc7956bed766bf48a1f63bd062d87040dcd3df700f',
// FIVA SY tsTON EQAxGi9Al7hamLAORroxGkvfap6knGyzI50ThkP3CLPLTtOZ
'5226dd4e6db9af26b24d5ca822bc4053b7e08152f923932abf25030c7e38bb42',
// FIVA PT tsTON EQAkxIRGXgs2vD2zjt334MBjD3mXg2GsyEZHfzuYX_trQkFL
'fea2c08a704e5192b7f37434927170440d445b87aab865c3ea2a68abe7168204',
// FIVA YT tsTON EQAcy60qg22RCq87A_qgYK8hooEgjCZ44yxhdnKYdlWIfKXL
'e691cf9081a8aeb22ed4d94829f6626c9d822752e035800b5543c43f83d134b5',
// FIVA LP tsTON EQD3BjCjxuf8mu5kvxajVbe-Ila1ScZZlAi03oS7lMmAJjM3
'301ce25925830d713b326824e552e962925c4ff45b1e3ea21fc363a459a49b43',
// FIVA SY eUSDT EQDi9blCcyT-k8iMpFMYY0t7mHVyiCB50ZsRgyUECJDuGvIl
'02250f83fbb8624d859c2c045ac70ee2b3b959688c3d843aec773be9b36dbfc3',
// FIVA PT eUSDT EQBzVrYkYPHx8D_HPfQacm1xONa4XSRxl826vHkx_laP2HOe
'dba3adb2c917db80fd71a6a68c1fc9e12976491a8309d5910f9722efc084ce4d',
// FIVA YT eUSDT EQCwUSc2qrY5rn9BfFBG9ARAHePTUvITDl97UD0zOreWzLru
'7da9223b90984d6a144e71611a8d7c65a6298cad734faed79438dc0f7a8e53d1',
// FIVA LP eUSDT EQBNlIZxIbQGQ78cXgG3VRcyl8A0kLn_6BM9kabiHHhWC4qY
'ddf80de336d580ab3c11d194f189c362e2ca1225cae224ea921deeaba7eca818',
// tsUSDe EQDQ5UUyPHrLcQJlPAczd_fjxn8SLrlNQwolBznxCdSlfQwr
'eb9d9891a32ec94425c09735f6ade73f4c171da0091f874d6e9d25247d583990',
// Affluent TON Lending Vault EQADQ6JcK0NMuNM5uwCcS9bjcn2RTvcxYIZjNlhIhywUrfBN
'f66c149de251ffd031bdb34b79abe43a062ba16b815433691e3ec40a77f01d71',
// Affluent Ethena Multiply Vault EQDXmtbt1-WSP00tSh6N6FH-4lX7LbnrjORClmtmuZqg4Ymm
'bca42dbdcbc0d885aaffb1eeeb027d9f338c2dd68701a05641c1d1c3171a7400' // Affluent TON Multiply Vault EQDtxQqkgIRQQR5hWlrQxiJMtLwjR3rEYNUBbEcvPDwCs1Ng
]);
const STAKED_TOKEN_SLUGS = new Set([STAKED_TON_SLUG, STAKED_MYCOIN_SLUG, TON_TSUSDE.slug]);
const DEFAULT_OUR_SWAP_FEE = 0.875;
const MTW_AGGREGATOR_QUERY_ID = '4246015164496276000';
const DEFAULT_STAKING_STATE = {
  type: 'liquid',
  id: 'liquid',
  tokenSlug: TONCOIN.slug,
  annualYield: 3.9,
  yieldType: 'APY',
  balance: 0n,
  pool: LIQUID_POOL,
  tokenBalance: 0n,
  unstakeRequestAmount: 0n,
  instantAvailable: 0n,
  start: 0,
  end: 0
};
const DEFAULT_NOMINATORS_STAKING_STATE = {
  type: 'nominators',
  id: 'nominators',
  tokenSlug: TONCOIN.slug,
  annualYield: 3.9,
  yieldType: 'APY',
  balance: 0n,
  pool: 'Ef8dgIOIRyCLU0NEvF8TD6Me3wrbrkS1z3Gpjk3ppd8m8-s_',
  start: 0,
  end: 0
};
const SWAP_API_VERSION = 3;
const TONCENTER_ACTIONS_VERSION = 'v1';
const JVAULT_URL = 'https://jvault.xyz';
const HELP_CENTER_URL = {
  home: {
    en: 'https://help.mytonwallet.io/',
    ru: 'https://help.mytonwallet.io/ru'
  },
  domainScam: {
    en: 'https://help.mytonwallet.io/intro/scams/.ton-domain-scams',
    ru: 'https://help.mytonwallet.io/ru/baza-znanii/moshennichestvo-i-skamy/moshennichestvo-s-ispolzovaniem-domenov-.ton'
  },
  seedScam: {
    en: 'https://help.mytonwallet.io/intro/scams/leaked-seed-phrases',
    ru: 'https://help.mytonwallet.io/ru/baza-znanii/moshennichestvo-i-skamy/slitye-sid-frazy'
  },
  ethenaStaking: {
    en: 'https://help.mytonwallet.io/intro/staking/what-is-usde-how-does-usde-staking-work',
    ru: 'https://help.mytonwallet.io/ru/baza-znanii/steiking/chto-takoe-usde-kak-rabotaet-steiking-usde'
  }
};
const ALL_TON_DNS_ZONES = [{
  suffixes: ['ton'],
  baseFormat: /^([-\da-z]+\.){0,2}[-\da-z]{4,126}$/i,
  resolver: 'EQC3dNlesgVD8YbAazcauIrXBPfiVhMMr5YYk2in0Mtsz0Bz',
  collectionName: 'TON DNS Domains',
  isUnofficial: false,
  isRenewable: true,
  isLinkable: true,
  isTelemint: false
}, {
  suffixes: ['t.me'],
  baseFormat: /^([-\da-z]+\.){0,2}[-_\da-z]{4,32}$/i,
  resolver: 'EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi',
  collectionName: 'Telegram Usernames',
  isUnofficial: false,
  isRenewable: false,
  isLinkable: true,
  isTelemint: true
}, {
  suffixes: ['vip', 'ton.vip', 'vip.ton'],
  baseFormat: /^([-\da-z]+\.){0,2}[\da-z]{1,24}$/i,
  resolver: 'EQBWG4EBbPDv4Xj7xlPwzxd7hSyHMzwwLB5O6rY-0BBeaixS',
  collectionName: 'VIP DNS Domains',
  isUnofficial: true,
  isRenewable: false,
  isLinkable: true,
  isTelemint: false
}, {
  suffixes: ['gram'],
  baseFormat: /^([-\da-z]+\.){0,2}[-\da-z]{1,127}$/i,
  resolver: 'EQAic3zPce496ukFDhbco28FVsKKl2WUX_iJwaL87CBxSiLQ',
  collectionName: 'GRAM DNS Domains',
  isUnofficial: true,
  isRenewable: false,
  isLinkable: true,
  isTelemint: false
}];
const TON_DNS_ZONES = IS_CORE_WALLET ? ALL_TON_DNS_ZONES.filter(_ref => {
  let {
    isUnofficial
  } = _ref;
  return !isUnofficial;
}) : ALL_TON_DNS_ZONES;
const RENEWABLE_TON_DNS_COLLECTIONS = new Set(TON_DNS_ZONES.filter(zone => zone.isRenewable).map(zone => zone.resolver));
const DEFAULT_AUTOLOCK_OPTION = '3';
const WRONG_ATTEMPTS_BEFORE_LOG_OUT_SUGGESTION = 2;
const UNKNOWN_TOKEN = {
  symbol: '[Unknown]',
  decimals: 9
};
const DEFAULT_CHAIN = 'ton';

/***/ },

/***/ 12811
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports AssertionError, assert */
class AssertionError extends Error {
  constructor(message,
  // Any additional information for the error to help debug it. Don't put sensitive information here.
  metadata) {
    super(message);
    this.metadata = metadata;
  }
}
function assert(condition, message, metadata) {
  if (!condition) {
    throw new AssertionError(message, metadata);
  }
}

/***/ },

/***/ 934
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bk: () => (/* binding */ bigintReviver)
/* harmony export */ });
/* unused harmony exports BIGINT_PREFIX, bigintAbs, bigintSum, bigintDivideToNumber, bigintMultiplyToNumber, bigintRandom, bigintCountBits, bigintMax, bigintMin, bigintMultiplePercent */
/* unused harmony import specifier */ var ONE_TON;
/* unused harmony import specifier */ var fromDecimal;
/* unused harmony import specifier */ var randomBytes;
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50352);
/* harmony import */ var _decimals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21165);



const BIGINT_PREFIX = 'bigint:';
function bigintReviver(key, value) {
  if (typeof value === 'string' && value.startsWith(BIGINT_PREFIX)) {
    return BigInt(value.slice(7));
  }
  return value;
}
function bigintAbs(value) {
  return value === -0n || value < 0n ? -value : value;
}
function bigintSum(values) {
  let result = 0n;
  for (const value of values) result += value;
  return result;
}
function bigintDivideToNumber(value, num) {
  return value * ONE_TON / fromDecimal(num);
}
function bigintMultiplyToNumber(value, num) {
  return value * fromDecimal(num) / ONE_TON;
}
function bigintRandom(bytes) {
  let value = BigInt(0);
  for (const randomNumber of randomBytes(bytes)) {
    const randomBigInt = BigInt(randomNumber);
    value = (value << BigInt(8)) + randomBigInt;
  }
  return value;
}
function bigintCountBits(value) {
  const binaryString = value.toString(2);
  return binaryString.length;
}
function bigintMax(value0, value1) {
  return value0 > value1 ? value0 : value1;
}
function bigintMin(value0, value1) {
  return value0 < value1 ? value0 : value1;
}
function bigintMultiplePercent(value, percent) {
  return value * fromDecimal(percent / 100) / ONE_TON;
}

/***/ },

/***/ 21165
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports fromDecimal, toDecimal, toBig, roundDecimal */
/* unused harmony import specifier */ var TONCOIN;
/* unused harmony import specifier */ var Big;
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50352);
/* harmony import */ var _lib_big_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2924);


_lib_big_js__WEBPACK_IMPORTED_MODULE_1__/* .Big */ .z.RM = 0; // RoundDown
_lib_big_js__WEBPACK_IMPORTED_MODULE_1__/* .Big */ .z.NE = -100000; // Disable exponential form
_lib_big_js__WEBPACK_IMPORTED_MODULE_1__/* .Big */ .z.PE = 100000; // Disable exponential form

const ten = (0,_lib_big_js__WEBPACK_IMPORTED_MODULE_1__/* .Big */ .z)(10);
function fromDecimal(value, decimals) {
  return BigInt(Big(value).mul(ten.pow(decimals ?? TONCOIN.decimals)).round().toString());
}
function toDecimal(value, decimals) {
  let noFloor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return toBig(value, decimals ?? TONCOIN.decimals, noFloor).toString();
}
function toBig(value) {
  let decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TONCOIN.decimals;
  let noFloor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return Big(value.toString()).div(ten.pow(decimals)).round(decimals, noFloor ? Big.roundHalfUp : undefined);
}
function roundDecimal(value, decimals) {
  return Big(value).round(decimals).toString();
}

/***/ },

/***/ 18547
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Up: () => (/* binding */ pick),
/* harmony export */   rs: () => (/* binding */ fromKeyValueArrays)
/* harmony export */ });
/* unused harmony exports buildCollectionByKey, buildArrayCollectionByKey, groupBy, mapValues, pickTruthy, omit, omitUndefined, orderBy, unique, compact, areSortedArraysEqual, split, cloneDeep, isLiteralObject, findLast, range, extractKey, findDifference, filterValues, uniqueByKey, intersection, swapKeysAndValues, mergeSortedArrays, shuffle, orderByPattern */
function buildCollectionByKey(collection, key) {
  return collection.reduce((byKey, member) => {
    byKey[member[key]] = member;
    return byKey;
  }, {});
}
function buildArrayCollectionByKey(collection, key) {
  return collection.reduce((byKey, member) => {
    const collectionKey = member[key];
    if (!byKey[collectionKey]) {
      byKey[collectionKey] = [];
    }
    byKey[collectionKey].push(member);
    return byKey;
  }, {});
}
function groupBy(collection, key) {
  return collection.reduce((byKey, member) => {
    const groupKey = member[key];
    if (!byKey[groupKey]) {
      byKey[groupKey] = [member];
    } else {
      byKey[groupKey].push(member);
    }
    return byKey;
  }, {});
}
function mapValues(byKey, callback) {
  return Object.keys(byKey).reduce((newByKey, key, index) => {
    newByKey[key] = callback(byKey[key], key, index, byKey);
    return newByKey;
  }, {});
}
function pick(object, keys) {
  return keys.reduce((result, key) => {
    result[key] = object[key];
    return result;
  }, {});
}
function pickTruthy(object, keys) {
  return keys.reduce((result, key) => {
    if (object[key]) {
      result[key] = object[key];
    }
    return result;
  }, {});
}
function omit(object, keys) {
  const stringKeys = new Set(keys.map(String));
  const savedKeys = Object.keys(object).filter(key => !stringKeys.has(key));
  return pick(object, savedKeys);
}
function omitUndefined(object) {
  return Object.keys(object).reduce((result, stringKey) => {
    const key = stringKey;
    if (object[key] !== undefined) {
      result[key] = object[key];
    }
    return result;
  }, {});
}
function orderBy(collection, orderRule) {
  let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';
  function compareValues(a, b, currentOrderRule, isAsc) {
    const aValue = (typeof currentOrderRule === 'function' ? currentOrderRule(a) : a[currentOrderRule]) || 0;
    const bValue = (typeof currentOrderRule === 'function' ? currentOrderRule(b) : b[currentOrderRule]) || 0;
    if (aValue === bValue) return 0;
    const condition = isAsc ? aValue > bValue : aValue < bValue;
    return condition ? 1 : -1;
  }
  if (Array.isArray(orderRule)) {
    const [mode1, mode2] = Array.isArray(mode) ? mode : [mode, mode];
    const [orderRule1, orderRule2] = orderRule;
    const isAsc1 = mode1 === 'asc';
    const isAsc2 = mode2 === 'asc';
    return collection.sort((a, b) => {
      return compareValues(a, b, orderRule1, isAsc1) || compareValues(a, b, orderRule2, isAsc2);
    });
  }
  const isAsc = mode === 'asc';
  return collection.sort((a, b) => {
    return compareValues(a, b, orderRule, isAsc);
  });
}
function unique(array) {
  return Array.from(new Set(array));
}
function compact(array) {
  return array.filter(Boolean);
}
function areSortedArraysEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  return array1.every((item, i) => item === array2[i]);
}
function split(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
function cloneDeep(value) {
  if (!isObject(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep);
  }
  return Object.keys(value).reduce((acc, key) => {
    acc[key] = cloneDeep(value[key]);
    return acc;
  }, {});
}
function isLiteralObject(value) {
  return isObject(value) && !Array.isArray(value);
}
function isObject(value) {
  // eslint-disable-next-line no-null/no-null
  return typeof value === 'object' && value !== null;
}
function findLast(array, predicate) {
  let cursor = array.length;
  while (cursor--) {
    if (predicate(array[cursor], cursor, array)) {
      return array[cursor];
    }
  }
  return undefined;
}
function range(start, end) {
  const arr = [];
  for (let i = start; i < end;) {
    arr.push(i++);
  }
  return arr;
}
function fromKeyValueArrays(keys, values) {
  return keys.reduce((acc, key, index) => {
    acc[key] = Array.isArray(values) ? values[index] : values;
    return acc;
  }, {});
}
function extractKey(array, key) {
  return array.map(value => value[key]);
}
function findDifference(array1, array2) {
  const set2 = new Set(array2);
  const diff = [];
  for (const element of array1) {
    if (!set2.has(element)) {
      diff.push(element);
    }
  }
  return diff;
}
function filterValues(byKey, callback) {
  return Object.keys(byKey).reduce((newByKey, key, index) => {
    if (callback(byKey[key], key, index, byKey)) {
      newByKey[key] = byKey[key];
    }
    return newByKey;
  }, {});
}
function uniqueByKey(array, key, shouldKeepFirst) {
  if (shouldKeepFirst) {
    array = [...array].reverse();
  }
  const result = [...new Map(array.map(item => [item[key], item])).values()];
  if (shouldKeepFirst) {
    result.reverse();
  }
  return result;
}
function intersection(x, y) {
  const result = new Set();
  for (const elem of y) {
    if (x.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}
function swapKeysAndValues(object) {
  const result = {};
  for (const [key, value] of Object.entries(object)) {
    result[value] = key;
  }
  return result;
}

/**
 * The arrays inside `arrays` must be sorted according to `compareFn`, otherwise the result is not guaranteed.
 * `deduplicateEqual` doesn't remove duplicates if the individual input arrays contain duplicates.
 * Always returns a new array (not any of the input arrays).
 */
function mergeSortedArrays(arrays, compareFn, deduplicateEqual) {
  // This is a divide-and-conquer algorithm combined with a 2-pointers algorithm. Its time complexity is O(n*log(n)*m),
  // where n is the number of arrays and m is the average array size. The heap algorithm is slightly faster, but it has
  // the same time complexity and its implementation in JS is too bulky.
  // This problem on LeetCode: https://leetcode.com/problems/merge-k-sorted-lists/

  if (arrays.length === 1) return [...arrays[0]];
  let toMerge = arrays;
  while (toMerge.length > 1) {
    const nextToMerge = [];
    for (let i = 0; i < toMerge.length; i += 2) {
      nextToMerge.push(i + 1 < toMerge.length ? merge2(toMerge[i], toMerge[i + 1]) : toMerge[i] // If toMerge.length is odd, the last iteration has only 1 subarray to merge
      );
    }
    toMerge = nextToMerge;
  }
  return toMerge[0] ?? [];
  function merge2(arr1, arr2) {
    let index1 = 0;
    let index2 = 0;
    const result = [];
    while (index1 < arr1.length && index2 < arr2.length) {
      const compareResult = compareFn(arr1[index1], arr2[index2]);
      if (compareResult === 0) {
        result.push(arr1[index1]);
        if (!deduplicateEqual) {
          result.push(arr2[index2]);
        }
        index1++;
        index2++;
      } else if (compareResult < 0) {
        result.push(arr1[index1++]);
      } else {
        result.push(arr2[index2++]);
      }
    }
    result.push(...arr1.slice(index1));
    result.push(...arr2.slice(index2));
    return result;
  }
}
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
function orderByPattern(arr, getValue, pattern) {
  const patternWeights = new Map(pattern.map((val, index) => [val, index]));
  return [...arr].sort((a, b) => {
    const valueA = getValue(a);
    const valueB = getValue(b);
    const indexA = patternWeights.has(valueA) ? patternWeights.get(valueA) : Infinity;
    const indexB = patternWeights.has(valueB) ? patternWeights.get(valueB) : Infinity;
    return indexA - indexB;
  });
}
;

/***/ },

/***/ 71658
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony exports errorReplacer, addLog, getLogs, logDebugError, logDebug, logDebugApi, logSelfXssWarnings */
/* unused harmony import specifier */ var DEBUG;
/* unused harmony import specifier */ var IS_AIR_APP;
/* unused harmony import specifier */ var IS_ANDROID;
/* unused harmony import specifier */ var DEBUG_API;
/* unused harmony import specifier */ var AssertionError;
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50352);
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12811);


const MAX_LOG_LENGTH = 999;
const logs = (/* unused pure expression or super */ null && ([]));
function errorReplacer(_, value) {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
      metadata: value instanceof AssertionError ? value.metadata : undefined
    };
  }
  return value;
}
function addLog(log) {
  if (logs.length > MAX_LOG_LENGTH) {
    logs.shift();
  }
  logs.push({
    ...log,
    args: log.args.map(arg => JSON.stringify(arg, errorReplacer)),
    time: Date.now()
  });
}
function getLogs() {
  return logs;
}
function logDebugError(message) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  addLog({
    message,
    level: 'debugError',
    args
  });
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.error(`[DEBUG][${message}]`, ...args);
  }
  if (IS_AIR_APP && IS_ANDROID) {
    var _androidApp;
    (_androidApp = window.androidApp) === null || _androidApp === void 0 || _androidApp.logDebugError(message, JSON.stringify(args, errorReplacer));
  }
}
function logDebug(message) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  addLog({
    message,
    level: 'debug',
    args
  });
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log(`[DEBUG] ${message}`, ...args);
  }
}
function logDebugApi(message, obj1, obj2) {
  if (DEBUG_API) {
    // eslint-disable-next-line no-console
    console.debug(`[DEBUG] ${message}`);
    // eslint-disable-next-line no-console
    if (obj1) console.dir(obj1);
    // eslint-disable-next-line no-console
    if (obj2) console.dir(obj2);
  }
}
function logSelfXssWarnings() {
  const selfXssWarnings = {
    en: 'WARNING! This console can be a way for bad people to take over your crypto wallet through something called ' + 'a Self-XSS attack. So, don\'t put in or paste code you don\'t understand. Stay safe!',
    ru: 'ВНИМАНИЕ! Через эту консоль злоумышленники могут захватить ваш криптовалютный кошелёк с помощью так ' + 'называемой атаки Self-XSS. Поэтому не вводите и не вставляйте код, который вы не понимаете. Берегите себя!',
    es: '¡ADVERTENCIA! Esta consola puede ser una forma en que las personas malintencionadas se apoderen de su ' + 'billetera de criptomonedas mediante un ataque llamado Self-XSS. Por lo tanto, ' + 'no introduzca ni pegue código que no comprenda. ¡Cuídese!',
    zh: '警告！这个控制台可能成为坏人通过所谓的Self-XSS攻击来接管你的加密货币钱包的方式。因此，请不要输入或粘贴您不理解的代码。请保护自己！'
  };
  const langCode = navigator.language.split('-')[0];
  const text = selfXssWarnings[langCode] || selfXssWarnings.en;

  // eslint-disable-next-line no-console
  console.log('%c%s', 'color: red; background: yellow; font-size: 18px;', text);
}

/***/ },

/***/ 45890
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  p: () => (/* binding */ callWindow)
});

// UNUSED EXPORTS: initWindowConnector

// EXTERNAL MODULE: ./src/config.ts
var config = __webpack_require__(50352);
// EXTERNAL MODULE: ./src/api/air/airAppCallWindow.ts
var airAppCallWindow = __webpack_require__(80849);
// EXTERNAL MODULE: ./src/util/bigint.ts
var bigint = __webpack_require__(934);
;// ./src/util/extensionMessageSerializer.ts
/* unused harmony import specifier */ var BIGINT_PREFIX;

const UNDEFINED_PREFIX = 'undefined:';
function extensionMessageReplacer(key, value) {
  if (value === undefined) {
    return `${UNDEFINED_PREFIX}marker`;
  }

  // Bigint is replaced by patching `toJSON` method

  return value;
}
function extensionMessageReviver(key, value) {
  // Handle bigint values
  if (typeof value === 'string' && value.startsWith(BIGINT_PREFIX)) {
    return BigInt(value.slice(BIGINT_PREFIX.length));
  }

  // Handle undefined values
  if (typeof value === 'string' && value.startsWith(UNDEFINED_PREFIX)) {
    return undefined;
  }
  return value;
}
function encodeExtensionMessage(data) {
  return JSON.stringify(data, extensionMessageReplacer);
}
function decodeExtensionMessage(data) {
  if (typeof data === 'string') {
    return JSON.parse(data, extensionMessageReviver);
  }
  return data;
}
function encodeError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }

  // Just in case
  return {
    name: 'Error',
    message: String(error)
  };
}
function decodeError(_ref) {
  let {
    name,
    message,
    stack
  } = _ref;
  const error = new Error(message);
  error.name = name;
  if (stack) {
    error.stack = stack;
  }
  return error;
}
// EXTERNAL MODULE: ./src/util/logs.ts
var logs = __webpack_require__(71658);
;// ./src/util/PostMessageConnector.ts
/* unused harmony import specifier */ var PostMessageConnector_decodeExtensionMessage;
/* unused harmony import specifier */ var PostMessageConnector_decodeError;
/* unused harmony import specifier */ var PostMessageConnector_encodeExtensionMessage;
/* unused harmony import specifier */ var generateUniqueId;
/* unused harmony import specifier */ var logDebugError;




// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents

class ConnectorClass {
  requestStates = new Map();
  requestStatesByCallback = new Map();
  constructor(target, onUpdate, channel, shouldUseJson) {
    let targetOrigin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '*';
    this.target = target;
    this.onUpdate = onUpdate;
    this.channel = channel;
    this.shouldUseJson = shouldUseJson;
    this.targetOrigin = targetOrigin;
  }
  destroy() {}
  init() {
    const {
      requestStates
    } = this;
    const messageId = generateUniqueId();
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const payload = {
      type: 'init',
      messageId,
      args
    };
    const requestState = {
      messageId
    };
    const promise = new Promise((resolve, reject) => {
      Object.assign(requestState, {
        resolve,
        reject
      });
    });
    requestStates.set(messageId, requestState);
    promise.catch(() => undefined).finally(() => {
      requestStates.delete(messageId);
    });
    this.postMessage(payload);
    return promise;
  }
  request(messageData) {
    const {
      requestStates,
      requestStatesByCallback
    } = this;
    const messageId = generateUniqueId();
    const payload = {
      type: 'callMethod',
      messageId,
      ...messageData
    };
    const requestState = {
      messageId
    };

    // Re-wrap type because of `postMessage`
    const promise = new Promise((resolve, reject) => {
      Object.assign(requestState, {
        resolve,
        reject
      });
    });
    if (typeof payload.args[payload.args.length - 1] === 'function') {
      payload.withCallback = true;
      const callback = payload.args.pop();
      requestState.callback = callback;
      requestStatesByCallback.set(callback, requestState);
    }
    requestStates.set(messageId, requestState);
    promise.catch(() => undefined).finally(() => {
      requestStates.delete(messageId);
      if (requestState.callback) {
        requestStatesByCallback.delete(requestState.callback);
      }
    });
    this.postMessage(payload);
    return promise;
  }
  cancelCallback(progressCallback) {
    progressCallback.isCanceled = true;
    const {
      messageId
    } = this.requestStatesByCallback.get(progressCallback) || {};
    if (!messageId) {
      return;
    }
    this.postMessage({
      type: 'cancelProgress',
      messageId
    });
  }
  onMessage(data) {
    try {
      data = PostMessageConnector_decodeExtensionMessage(data);
    } catch (err) {
      logDebugError('PostMessageConnector: Failed to parse message', err);
      return;
    }
    const {
      requestStates,
      channel
    } = this;
    if (data.channel !== channel) {
      return;
    }
    if (data.type === 'update' && this.onUpdate) {
      this.onUpdate(data.update);
    }
    if (data.type === 'methodResponse') {
      const requestState = requestStates.get(data.messageId);
      if (requestState) {
        if (data.error) {
          requestState.reject(PostMessageConnector_decodeError(data.error));
        } else {
          requestState.resolve(data.response);
        }
      }
    } else if (data.type === 'methodCallback') {
      var _requestState$callbac;
      const requestState = requestStates.get(data.messageId);
      requestState === null || requestState === void 0 || (_requestState$callbac = requestState.callback) === null || _requestState$callbac === void 0 || _requestState$callbac.call(requestState, ...data.callbackArgs);
    } else if (data.type === 'unhandledError') {
      throw PostMessageConnector_decodeError(data.error);
    }
  }
  postMessage(data) {
    data.channel = this.channel;
    let rawData = data;
    if (this.shouldUseJson) {
      rawData = PostMessageConnector_encodeExtensionMessage(data);
    }
    if ('open' in this.target) {
      // Is Window
      this.target.postMessage(rawData, this.targetOrigin);
    } else {
      this.target.postMessage(rawData);
    }
  }
}

/**
 * Allows to call functions, provided by another messenger (a window, a worker), in this messenger.
 * The other messenger must provide the functions using `createPostMessageInterface`.
 */
function createConnector(worker, onUpdate, channel, targetOrigin) {
  const connector = new ConnectorClass(worker, onUpdate, channel, undefined, targetOrigin);
  function handleMessage(_ref) {
    let {
      data
    } = _ref;
    connector.onMessage(data);
  }
  worker.addEventListener('message', handleMessage); // TS weirdly complains here

  connector.destroy = () => {
    worker.removeEventListener('message', handleMessage);
  };
  return connector;
}

/**
 * Allows to call functions, provided by the extension service worker, in this window.
 * The service worker must provide the functions using `createExtensionInterface`.
 */
function createExtensionConnector(name, onUpdate, channel, onReconnect) {
  const connector = new ConnectorClass(connect(), onUpdate, channel, true);
  function connect() {
    const port = self.chrome.runtime.connect({
      name
    });
    port.onMessage.addListener(data => {
      connector.onMessage(data);
    });

    // For some reason port can suddenly get disconnected
    port.onDisconnect.addListener(() => {
      connector.target = connect();
      onReconnect === null || onReconnect === void 0 || onReconnect();
    });
    return port;
  }
  return connector;
}

/**
 * Allows to call functions, provided by a window, in this service worker.
 * The window must provide the functions using `createReverseExtensionInterface`.
 *
 * Warning: the connector is able to send messages only when the popup window is open.
 */
function createReverseExtensionConnector(portName) {
  const nullWorker = {
    postMessage() {
      throw new Error('The popup window is not connected');
    }
  };
  const connector = new ConnectorClass(nullWorker, undefined, undefined, true);
  chrome.runtime.onConnect.addListener(port => {
    if (port.name !== portName) {
      return;
    }
    connector.target = port;
    port.onMessage.addListener(data => {
      connector.onMessage(data);
    });
    port.onDisconnect.addListener(() => {
      connector.target = nullWorker;
    });
  });
  return connector;
}
;// ./src/util/windowProvider/connector.ts
/* unused harmony import specifier */ var WINDOW_PROVIDER_CHANNEL;
/* unused harmony import specifier */ var connector_createConnector;




let connector;
function initWindowConnector() {
  if (!connector) {
    // We use the raw extension env flag instead of IS_EXTENSION so bundling can remove irrelevant code.
    if (false) // removed by dead control flow
{} else {
      connector = connector_createConnector(self, undefined, WINDOW_PROVIDER_CHANNEL);
      void connector.init();
    }
  }
}
function callWindow(methodName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (config/* IS_AIR_APP */.gmk) return (0,airAppCallWindow/* airAppCallWindow */.c)(methodName, ...args);
  if (!connector) {
    throw new Error(`API is not initialized when calling ${methodName}`);
  }
  return connector.request({
    name: methodName,
    args
  });
}

/***/ },

/***/ 91527
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HP: () => (/* binding */ keys),
/* harmony export */   IU: () => (/* binding */ clear),
/* harmony export */   Jt: () => (/* binding */ get),
/* harmony export */   _y: () => (/* binding */ setMany),
/* harmony export */   hZ: () => (/* binding */ set),
/* harmony export */   qy: () => (/* binding */ getMany),
/* harmony export */   y$: () => (/* binding */ createStore),
/* harmony export */   yH: () => (/* binding */ del)
/* harmony export */ });
/* unused harmony exports delMany, entries, promisifyRequest, update, values */
function promisifyRequest(request) {
    return new Promise((resolve, reject) => {
        // @ts-ignore - file size hacks
        request.oncomplete = request.onsuccess = () => resolve(request.result);
        // @ts-ignore - file size hacks
        request.onabort = request.onerror = () => reject(request.error);
    });
}
function createStore(dbName, storeName) {
    let dbp;
    const getDB = () => {
        if (dbp)
            return dbp;
        const request = indexedDB.open(dbName);
        request.onupgradeneeded = () => request.result.createObjectStore(storeName);
        dbp = promisifyRequest(request);
        dbp.then((db) => {
            // It seems like Safari sometimes likes to just close the connection.
            // It's supposed to fire this event when that happens. Let's hope it does!
            db.onclose = () => (dbp = undefined);
        }, () => { });
        return dbp;
    };
    return (txMode, callback) => getDB().then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
    if (!defaultGetStoreFunc) {
        defaultGetStoreFunc = createStore('keyval-store', 'keyval');
    }
    return defaultGetStoreFunc;
}
/**
 * Get a value by its key.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function get(key, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => promisifyRequest(store.get(key)));
}
/**
 * Set a value with a key.
 *
 * @param key
 * @param value
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function set(key, value, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.put(value, key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Set multiple values at once. This is faster than calling set() multiple times.
 * It's also atomic – if one of the pairs can't be added, none will be added.
 *
 * @param entries Array of entries, where each entry is an array of `[key, value]`.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function setMany(entries, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        entries.forEach((entry) => store.put(entry[1], entry[0]));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Get multiple values by their keys
 *
 * @param keys
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function getMany(keys, customStore = defaultGetStore()) {
    return customStore('readonly', (store) => Promise.all(keys.map((key) => promisifyRequest(store.get(key)))));
}
/**
 * Update a value. This lets you see the old value and update it as an atomic operation.
 *
 * @param key
 * @param updater A callback that takes the old value and returns a new value.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function update(key, updater, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => 
    // Need to create the promise manually.
    // If I try to chain promises, the transaction closes in browsers
    // that use a promise polyfill (IE10/11).
    new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
            try {
                store.put(updater(this.result), key);
                resolve(promisifyRequest(store.transaction));
            }
            catch (err) {
                reject(err);
            }
        };
    }));
}
/**
 * Delete a particular key from the store.
 *
 * @param key
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function del(key, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.delete(key);
        return promisifyRequest(store.transaction);
    });
}
/**
 * Delete multiple keys at once.
 *
 * @param keys List of keys to delete.
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function delMany(keys, customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        keys.forEach((key) => store.delete(key));
        return promisifyRequest(store.transaction);
    });
}
/**
 * Clear all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function clear(customStore = defaultGetStore()) {
    return customStore('readwrite', (store) => {
        store.clear();
        return promisifyRequest(store.transaction);
    });
}
function eachCursor(store, callback) {
    store.openCursor().onsuccess = function () {
        if (!this.result)
            return;
        callback(this.result);
        this.result.continue();
    };
    return promisifyRequest(store.transaction);
}
/**
 * Get all keys in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function keys(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAllKeys) {
            return promisifyRequest(store.getAllKeys());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
    });
}
/**
 * Get all values in the store.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function values(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        if (store.getAll) {
            return promisifyRequest(store.getAll());
        }
        const items = [];
        return eachCursor(store, (cursor) => items.push(cursor.value)).then(() => items);
    });
}
/**
 * Get all entries in the store. Each entry is an array of `[key, value]`.
 *
 * @param customStore Method to get a custom store. Use with caution (see the docs).
 */
function entries(customStore = defaultGetStore()) {
    return customStore('readonly', (store) => {
        // Fast path for modern browsers
        // (although, hopefully we'll get a simpler path some day)
        if (store.getAll && store.getAllKeys) {
            return Promise.all([
                promisifyRequest(store.getAllKeys()),
                promisifyRequest(store.getAll()),
            ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
        }
        const items = [];
        return customStore('readonly', (store) => eachCursor(store, (cursor) => items.push([cursor.key, cursor.value])).then(() => items));
    });
}




/***/ },

/***/ 8330
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"mytonwallet","version":"4.8.7","description":"The most feature-rich web wallet and browser extension for TON – with support of multi-accounts, tokens (jettons), NFT, TON DNS, TON Sites, TON Proxy, and TON Magic.","main":"index.js","bin":{"mywallet":"./bin/mywallet","mywallet-mcp":"./bin/mywallet-mcp"},"scripts":{"dev":"cross-env APP_ENV=development webpack serve --mode development","build":"webpack && bash ./deploy/copy_to_dist.sh","build:dev":"APP_ENV=development webpack --mode development && bash ./deploy/copy_to_dist.sh","build:staging":"cross-env APP_ENV=staging npm run build","build:production":"npm run build","core:dev":"cross-env IS_CORE_WALLET=1 npm run dev","core:build":"cross-env IS_CORE_WALLET=1 npm run build","core:build:dev":"cross-env IS_CORE_WALLET=1 npm run build:dev","core:build:staging":"cross-env IS_CORE_WALLET=1 npm run build:staging","core:build:production":"cross-env IS_CORE_WALLET=1 npm run build:production","core:extension:dev":"cross-env IS_CORE_WALLET=1 npm run extension:dev","core:extension-chrome:package":"cross-env IS_CORE_WALLET=1 npm run extension-chrome:package","core:extension-chrome:package:staging":"cross-env IS_CORE_WALLET=1 npm run extension-chrome:package:staging","core:extension-chrome:package:production":"cross-env IS_CORE_WALLET=1 npm run extension-chrome:package:production","extension:dev":"cross-env IS_EXTENSION=1 npm run build:dev","extension-chrome:package":"cross-env IS_EXTENSION=1 webpack && bash ./deploy/package_extension.sh chrome","extension-chrome:package:staging":"APP_ENV=staging npm run extension-chrome:package","extension-chrome:package:production":"npm run extension-chrome:package","extension-firefox:package":"cross-env IS_FIREFOX_EXTENSION=1 IS_EXTENSION=1 webpack && bash ./deploy/package_extension.sh firefox","extension-firefox:package:staging":"cross-env APP_ENV=staging npm run extension-firefox:package","extension-firefox:package:production":"npm run extension-firefox:package","extension-opera:package":"cross-env IS_OPERA_EXTENSION=1 IS_EXTENSION=1 webpack && bash ./deploy/package_extension.sh opera","extension-opera:package:staging":"cross-env APP_ENV=staging npm run extension-opera:package","extension-opera:package:production":"npm run extension-opera:package","electron:dev":"ENV=development npm run electron:webpack && IS_PACKAGED_ELECTRON=1 ENV=development concurrently --ks SIGKILL -n main,renderer,electron \\"npm run electron:webpack -- --watch\\" \\"npm run dev\\" \\"electronmon dist/electron\\"","electron:webpack":"cross-env APP_ENV=$ENV webpack --config ./webpack-electron.config.ts","electron:build":"IS_PACKAGED_ELECTRON=1 npm run build:$ENV && electron-builder install-app-deps && ENV=$ENV npm run electron:webpack","electron:package":"npm run electron:build && npx rimraf dist-electron && electron-builder build --win --mac --linux --config src/electron/config.yml","electron:package:staging":"ENV=staging npm run electron:package -- -p never","electron:release:production":"ENV=production npm run electron:package -- -p always","headless:dev:cli":"./bin/mywallet","telegram:dev":"cross-env IS_TELEGRAM_APP=1 npm run dev","telegram:build":"IS_TELEGRAM_APP=1 npm run build","telegram:build:dev":"cross-env APP_ENV=development npm run telegram:build","telegram:build:staging":"cross-env APP_ENV=staging npm run telegram:build","telegram:build:production":"npm run telegram:build","explorer:dev":"cross-env IS_EXPLORER=1 npm run dev","explorer:build":"cross-env IS_EXPLORER=1 npm run build","explorer:build:dev":"cross-env IS_EXPLORER=1 npm run build:dev","explorer:build:staging":"cross-env IS_EXPLORER=1 npm run build:staging","explorer:build:production":"cross-env IS_EXPLORER=1 npm run build:production","mobile:build:sdk":"bash ./deploy/build_sdk.sh","mobile:build":"npm run i18n:build:android && npm run mobile:build:sdk && cross-env IS_CAPACITOR=1 npm run build && cap sync ${CAP_PLATFORM} --deployment","mobile:build:dev":"cross-env APP_ENV=development npm run mobile:build","mobile:build:staging":"cross-env APP_ENV=staging npm run mobile:build","mobile:build:production":"npm run mobile:build","mobile:run:android":"npm run mobile:build:dev && cap run android","mobile:run:ios":"npm run mobile:build:dev && cap run ios","build:icons":"fantasticon","check":"tsc && stylelint \\"**/*.{css,scss}\\" && eslint .","check:fix":"stylelint \\"**/*.{css,scss}\\" --fix && eslint . --fix","test":"cross-env APP_ENV=test jest --verbose --forceExit","test:headless:bin":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/adapters/cli/package-bin.integration.test.ts","build:headless:claude:bundle":"cross-env APP_ENV=test node headless/platforms/claude/bundle/build.js","build:headless:claude-code":"cross-env APP_ENV=test node headless/platforms/claude-code/build.js","build:headless:claude-code:release":"cross-env APP_ENV=test node headless/platforms/claude-code/prepare-release.js","build:headless:codex":"cross-env APP_ENV=test node headless/platforms/codex/build.js","build:headless:codex:release":"cross-env APP_ENV=test node headless/platforms/codex/prepare-release.js","build:headless:cursor":"cross-env APP_ENV=test node headless/platforms/cursor/build.js","build:headless:cursor:release":"cross-env APP_ENV=test node headless/platforms/cursor/prepare-release.js","build:headless:openclaw:bundle":"cross-env APP_ENV=test node headless/platforms/openclaw/bundle/build.js","headless:publish:openclaw:bundle":"cross-env APP_ENV=test node headless/platforms/openclaw/bundle/publish.js","headless:publish-plugins":"cross-env APP_ENV=test node headless/platforms/publish-plugins.js","test:headless:platforms":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/index.test.ts headless/platforms/shared-plugin/index.test.ts headless/platforms/cursor/index.test.ts headless/platforms/claude-code/index.test.ts headless/platforms/codex/index.test.ts headless/platforms/publish-plugins.test.ts","test:headless:claude:bundle":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/claude/bundle/index.test.ts","test:headless:claude-code":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/claude-code/index.test.ts","test:headless:codex":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/codex/index.test.ts","test:headless:cursor":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/cursor/index.test.ts","test:headless:openclaw:bundle":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/openclaw/bundle/index.test.ts","test:headless:openclaw:publish":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/openclaw/bundle/publish.test.ts","test:headless:claude:smoke":"cross-env APP_ENV=test HEADLESS_CLAUDE_SMOKE=1 jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/claude/bundle/index.smoke.test.ts","test:headless:claude-code:smoke":"cross-env APP_ENV=test HEADLESS_CLAUDE_CODE_SMOKE=1 jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/claude-code/index.smoke.test.ts","test:headless:codex:smoke":"cross-env APP_ENV=test HEADLESS_CODEX_SMOKE=1 jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/codex/index.smoke.test.ts","test:headless:cursor:smoke":"cross-env APP_ENV=test HEADLESS_CURSOR_SMOKE=1 jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/cursor/index.smoke.test.ts","test:headless:openclaw:smoke":"cross-env APP_ENV=test HEADLESS_OPENCLAW_SMOKE=1 jest --verbose --forceExit --runInBand --runTestsByPath headless/platforms/openclaw/bundle/index.smoke.test.ts","test:headless:smoke":"cross-env APP_ENV=test jest --verbose --forceExit --runInBand --runTestsByPath headless/adapters/cli/index.real-wallet.integration.test.ts","test:playwright":"playwright test","test:record":"playwright codegen localhost:1235","prepare":"husky","statoscope:build":"cross-env IS_STATOSCOPE=1 webpack","analyze:bundle":"node dev/analyzeBundleSize.mjs","statoscope:validate-diff":"statoscope validate --input input.json --reference reference.json","postversion":"./deploy/postversion.sh","giveaways:build":"webpack --config ./webpack-giveaways.config.ts && bash ./deploy/copy_to_dist.sh dist-giveaways","giveaways:build:dev":"APP_ENV=development webpack --mode development --config ./webpack-giveaways.config.ts","giveaways:dev":"APP_ENV=development webpack serve --mode development --config ./webpack-giveaways.config.ts","multisend:build":"webpack --config webpack-multisend.config.ts && bash ./deploy/copy_to_dist.sh dist-multisend src/multisend/public","multisend:build:dev":"APP_ENV=development webpack --mode development --config webpack-multisend.config.ts","multisend:dev":"APP_ENV=development webpack serve --mode development --config webpack-multisend.config.ts","portfolio:build":"webpack --config webpack-portfolio.config.ts && bash ./deploy/copy_to_dist.sh dist-portfolio src/portfolio/public","portfolio:build:dev":"APP_ENV=development webpack --mode development --config webpack-portfolio.config.ts","portfolio:dev":"APP_ENV=development webpack serve --mode development --config webpack-portfolio.config.ts","push:build":"IS_TELEGRAM_APP=1 webpack --config webpack-push.config.ts && bash ./deploy/copy_to_dist.sh dist-push src/push/public","push:build:dev":"APP_ENV=development IS_TELEGRAM_APP=1 webpack --mode development --config webpack-push.config.ts","push:dev":"APP_ENV=development IS_TELEGRAM_APP=1 webpack serve --mode development --config webpack-push.config.ts","resolve-stacktrace":"node ./dev/resolveStackTrace.mjs","i18n:build:default":"node ./dev/locales/buildDefault.js","i18n:build:android":"node ./dev/locales/buildAndroidResources.js","i18n:update":"node ./dev/locales/updateLocales.js","i18n:find-missing":"node ./dev/locales/findMissingKeys.js"},"engines":{"node":"^22.6 || ^24","npm":"^10.8 || ^11"},"husky":{"hooks":{"pre-commit":"tsc && lint-staged"}},"lint-staged":{"*.{ts,tsx,js}":"eslint --fix","*.{css,scss}":"stylelint --fix"},"author":"My Wallet","license":"GPL-3.0-or-later","protocols":[{"name":"Ton","schemes":["ton"]},{"name":"TonConnect","schemes":["tc","mytonwallet-tc"]},{"name":"My Wallet","schemes":["mtw"]}],"devDependencies":{"@babel/core":"7.27.1","@babel/preset-env":"7.27.2","@babel/preset-react":"7.27.1","@babel/preset-typescript":"7.27.1","@babel/register":"7.27.1","@capacitor/cli":"8.1.0","@mytonwallet/eslint-config":"github:mytonwallet-org/eslint-config#03e3491cf5ffd909041c53fa91bebd69a36ca3a8","@mytonwallet/stylelint-whole-pixel":"github:mytonwallet-org/stylelint-whole-pixel#fd07e44d786460f7d469076b1d2cb1b05297896c","@mytonwallet/webpack-watch-file-plugin":"github:mytonwallet-org/webpack-watch-file-plugin#747b7fd29da9a928aa8b63299adfba461d2f1231","@playwright/test":"1.57.0","@statoscope/cli":"5.29.0","@statoscope/webpack-plugin":"5.29.0","@stylistic/stylelint-plugin":"3.1.2","@tonconnect/protocol":"2.3.0-beta.0","@twa-dev/types":"8.0.2","@twbs/fantasticon":"3.1.0","@types/chrome":"0.0.323","@types/create-hmac":"1.1.3","@types/jest":"30.0.0","@types/js-yaml":"4.0.9","@types/node":"22.15.21","@types/react":"19.1.5","@types/react-dom":"19.1.5","@types/sha256":"0.2.2","@types/snarkjs":"^0.7.9","@types/uuid":"10.0.0","@types/webextension-polyfill":"0.12.3","@types/webpack":"5.28.5","@types/webpack-bundle-analyzer":"4.7.0","@vue/preload-webpack-plugin":"2.0.0","@webpack-cli/serve":"3.0.1","autoprefixer":"10.4.21","babel-loader":"10.0.0","babel-plugin-transform-import-meta":"2.3.2","browserlist":"1.0.1","concurrently":"9.1.2","copy-webpack-plugin":"13.0.0","cross-env":"7.0.3","css-loader":"7.1.2","css-minimizer-webpack-plugin":"7.0.2","dotenv":"16.5.0","electron":"39.2.7","electron-builder":"26.8.1","electron-context-menu":"4.1.1","electron-updater":"6.6.2","electron-window-state":"5.0.3","electronmon":"2.0.4","eslint":"9.39.2","git-revision-webpack-plugin":"5.0.0","html-webpack-plugin":"5.6.3","husky":"9.1.7","jest":"30.2.0","jest-environment-jsdom":"30.2.0","jest-raw-loader":"1.0.1","js-yaml":"4.1.1","lint-staged":"16.0.0","mini-css-extract-plugin":"2.9.2","postcss":"8.5.3","postcss-loader":"8.1.1","postcss-modules":"6.0.1","process":"0.11.10","replace-in-file":"8.4.0","sass":"1.89.0","sass-loader":"16.0.5","script-loader":"0.7.2","serve":"14.2.5","source-map":"0.7.4","stylelint":"16.19.1","stylelint-config-clean-order":"7.0.0","stylelint-config-recommended-scss":"15.0.1","stylelint-declaration-block-no-ignored-properties":"2.8.0","stylelint-group-selectors":"1.0.10","stylelint-high-performance-animation":"1.11.0","stylelint-order":"7.0.0","typescript":"5.8.3","typescript-eslint":"8.56.0","webpack":"5.105.2","webpack-dev-server":"5.2.3"},"dependencies":{"@awesome-cordova-plugins/core":"6.16.0","@awesome-cordova-plugins/in-app-browser":"6.16.0","@capacitor-community/bluetooth-le":"github:mytonwallet-org/capacitor-bluetooth-le#f36f0b7673b2652ff48848d36e531748aa4c61a5","@capacitor-mlkit/barcode-scanning":"8.0.1","@capacitor/android":"https://github.com/mytonwallet-org/capacitor/raw/d3a43ea8fb48f388e399d93b44bdf95478777a8b/android/dist.tgz","@capacitor/app":"8.0.1","@capacitor/app-launcher":"8.0.1","@capacitor/clipboard":"8.0.1","@capacitor/core":"8.2.0","@capacitor/dialog":"file:mobile/plugins/native-dialog","@capacitor/filesystem":"8.1.2","@capacitor/haptics":"8.0.1","@capacitor/ios":"8.2.0","@capacitor/keyboard":"8.0.1","@capacitor/push-notifications":"8.0.2","@capacitor/share":"8.0.1","@capacitor/splash-screen":"https://github.com/mytonwallet-org/capacitor-plugins/raw/3bbb910b0baa6efedab2eccf2fd078ec98d723c7/splash-screen/dist.tgz","@capacitor/status-bar":"https://github.com/mytonwallet-org/capacitor-plugins/raw/3bbb910b0baa6efedab2eccf2fd078ec98d723c7/status-bar/dist.tgz","@capgo/capacitor-native-biometric":"github:mytonwallet-org/capacitor-native-biometric#536963beb47306fdf63aeac97d21ebbc6acaeae4","@capgo/native-audio":"8.3.1","@ledgerhq/hw-transport-webhid":"6.30.0","@ledgerhq/hw-transport-webusb":"6.29.4","@mauricewegner/capacitor-navigation-bar":"github:mytonwallet-org/capacitor-navigation-bar#0c4908be7c880eb2894055a5af6fcb8bf264d6e1","@mytonwallet/air-app-launcher":"file:mobile/plugins/air-app-launcher","@mytonwallet/capacitor-usb-hid":"github:mytonwallet-org/capacitor-usb-hid#28d10b296777280f7cb0735cc3fd02a4f03568ab","@reown/walletkit":"1.5.0","@solana/kit":"5.1.0","@ton-community/ton-ledger":"7.4.0-pre.0","@ton/core":"0.60.1","@ton/ton":"15.2.1","@tonconnect/sdk":"^3.4.1","@tonconnect/ui":"^2.2.0","bip39":"3.1.0","buffer":"6.0.3","capacitor-native-settings":"8.0.0","capacitor-plugin-safe-area":"4.0.2","capacitor-secure-storage-plugin":"github:mytonwallet-org/capacitor-secure-storage-plugin#d0304dddaacaaa49e342ff6c4d7fbfedff2b1503","cordova-plugin-inappbrowser":"github:mytonwallet-org/cordova-plugin-inappbrowser#360b79fda72c125d9af0c46d8a7fbe7e21ef5005","create-hmac":"1.1.7","dexie":"4.0.11","electron-conf":"1.3.0","ffjavascript":"^0.3.1","fflate":"0.8.2","idb-keyval":"6.2.2","poseidon-bls12381":"^1.0.2","qr-code-styling":"github:mytonwallet-org/qr-code-styling#671f29cc908681b5f5c7979fd418ff1fdf30ca9f","qrcode-generator":"1.4.4","snarkjs":"0.7.6","stream-browserify":"3.0.0","tonapi-sdk-js":"^2.0.23","tonweb-mnemonic":"1.0.1","tronweb":"6.0.0","tweetnacl":"1.0.3","webextension-polyfill":"0.12.0"},"overrides":{"bfj":"7.0.2"}}');

/***/ }

};
;