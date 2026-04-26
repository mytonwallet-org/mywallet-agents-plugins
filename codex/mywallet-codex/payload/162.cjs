"use strict";
exports.id = 162;
exports.ids = [162];
exports.modules = {

/***/ 29162
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  tokenRepository: () => (/* binding */ tokenRepository)
});

// UNUSED EXPORTS: ApiDb, apiDb

// EXTERNAL MODULE: ./node_modules/dexie/import-wrapper-prod.mjs
var import_wrapper_prod = __webpack_require__(64143);
// EXTERNAL MODULE: ./src/config.ts
var config = __webpack_require__(28732);
;// ./src/api/db/repository.ts

const IGNORED_DEXIE_ERRORS = new Set(['AbortError', 'BulkError', 'UnknownError']);
async function tryDbQuery(cb) {
  try {
    if (config/* IS_AIR_APP */.gmk) {
      void cb();
      return undefined;
    }
    return await cb();
  } catch (error) {
    if (IGNORED_DEXIE_ERRORS.has(error === null || error === void 0 ? void 0 : error.name)) return undefined;else throw error;
  }
}
class DbRepository {
  table;
  constructor(table) {
    this.table = table;
  }
  all() {
    return this.table.toArray();
  }
  find(where) {
    return tryDbQuery(() => {
      return this.table.where(where).toArray();
    });
  }
  put(item) {
    return tryDbQuery(() => {
      return this.table.put(item);
    });
  }
  bulkPut(items) {
    return tryDbQuery(() => {
      return this.table.bulkPut(items);
    });
  }
  update(key, update) {
    return tryDbQuery(() => {
      return this.table.update(key, update);
    });
  }
  delete(key) {
    return tryDbQuery(() => {
      return this.table.delete(key);
    });
  }
  deleteWhere(where) {
    return tryDbQuery(() => {
      return this.table.where(where).delete();
    });
  }
  clear() {
    return tryDbQuery(() => {
      return this.table.clear();
    });
  }
}
;// ./src/api/db/index.ts


const DB_NAME = 'tables';
class ApiDb extends import_wrapper_prod/* default */.Ay {
  nfts;
  tokens;
  constructor() {
    super(DB_NAME);
    this.version(1).stores({
      nfts: '[accountId+address], accountId, address, collectionAddress'
    });
    this.version(2).stores({
      sseConnections: '&clientId'
    });
    this.version(3).stores({
      tokens: 'tokenAddress, chain, &slug'
    });
    this.version(4).upgrade(tx => {
      return tx.table('tokens').clear();
    });
    this.version(5).stores({
      // eslint-disable-next-line no-null/no-null
      nfts: null,
      // eslint-disable-next-line no-null/no-null
      sseConnections: null
    });
    this.version(6).upgrade(tx => {
      return tx.table('tokens').toCollection().modify(token => {
        delete token.price;
      });
    });
  }
}
const apiDb = new ApiDb();
const tokenRepository = new DbRepository(apiDb.tokens);

/***/ }

};
;