exports.id = 216;
exports.ids = [216];
exports.modules = {

/***/ 24220
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony exports HEADLESS_CAPABILITY_STATUSES, HEADLESS_RUNTIME_CAPABILITIES, HEADLESS_CAPABILITY_MATRIX, getHeadlessCapabilitiesForChain, getHeadlessCapability */
const HEADLESS_CAPABILITY_STATUSES = (/* unused pure expression or super */ null && (['supported', 'partial', 'unavailable', 'unsupported']));
const HEADLESS_RUNTIME_CAPABILITIES = (/* unused pure expression or super */ null && (['nativeBalances', 'fungibleTokenBalances', 'collectibles', 'selectedCurrencyValues', 'historicalPrices', 'recentActivity', 'transactionActivityLookup', 'transfers', 'collectibleTransfers', 'transferApprovals', 'signMessageApprovals', 'swaps']));
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

/***/ },

/***/ 95525
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ airAppCallWindow)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(83830);

let nativeCallNumber = 0;
const airAppCallWindow = function (methodName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  const airWindow = window;
  const bridge = airWindow.airBridge;
  return new Promise((resolve, reject) => {
    nativeCallNumber++;
    const requestNumber = nativeCallNumber;
    bridge.nativeCallCallbacks[requestNumber] = response => {
      delete bridge.nativeCallCallbacks[requestNumber];
      if (!response.ok) reject(new Error(_types__WEBPACK_IMPORTED_MODULE_0__/* .ApiCommonError */ .QD.Unexpected));else resolve(response.result);
    };
    if (airWindow.webkit) {
      var _airWindow$webkit;
      (_airWindow$webkit = airWindow.webkit) === null || _airWindow$webkit === void 0 || _airWindow$webkit.messageHandlers.nativeCall.postMessage({
        requestNumber,
        methodName,
        arg0: args[0],
        arg1: args[1]
      });
    } else {
      airWindow.androidApp.nativeCall(requestNumber, methodName, args[0], args[1]);
    }
  });
};

/***/ },

/***/ 84773
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_bigint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41666);
/* harmony import */ var _util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73924);
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(87418);



let cache = {};
const storage = {
  async getItem(key, force) {
    if ((0,_environment__WEBPACK_IMPORTED_MODULE_2__/* .getEnvironment */ .u)().isAndroidApp && key in cache && !force) {
      return cache[key];
    }
    const result = await (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('capacitorStorageGetItem', key);
    const value = result ? JSON.parse(result, _util_bigint__WEBPACK_IMPORTED_MODULE_0__/* .bigintReviver */ .bk) : undefined;
    if ((0,_environment__WEBPACK_IMPORTED_MODULE_2__/* .getEnvironment */ .u)().isAndroidApp) {
      if (value === undefined) {
        delete cache[key];
      } else {
        cache[key] = value;
      }
    }
    return value;
  },
  async setItem(key, value) {
    await (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('capacitorStorageSetItem', key, JSON.stringify(value));
    if ((0,_environment__WEBPACK_IMPORTED_MODULE_2__/* .getEnvironment */ .u)().isAndroidApp) {
      cache[key] = value;
    }
  },
  async removeItem(key) {
    await (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('capacitorStorageRemoveItem', key);
    if ((0,_environment__WEBPACK_IMPORTED_MODULE_2__/* .getEnvironment */ .u)().isAndroidApp) {
      delete cache[key];
    }
  },
  async clear() {
    await (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('capacitorStorageClear');
    if ((0,_environment__WEBPACK_IMPORTED_MODULE_2__/* .getEnvironment */ .u)().isAndroidApp) {
      cache = {};
    }
  },
  async getKeys() {
    const result = await (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('capacitorStorageKeys');
    return result === null || result === void 0 ? void 0 : result.value;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);

/***/ },

/***/ 29419
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28732);

const storage = _config__WEBPACK_IMPORTED_MODULE_0__/* .IS_EXTENSION */ .hL1 ? self.chrome.storage.local : undefined;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage && {
  getItem: async key => {
    var _await$storage$get;
    return (_await$storage$get = await storage.get(key)) === null || _await$storage$get === void 0 ? void 0 : _await$storage$get[key];
  },
  setItem: (key, value) => storage.set({
    [key]: value
  }),
  removeItem: storage.remove.bind(storage),
  clear: storage.clear.bind(storage),
  getAll: storage.get.bind(storage),
  setMany: storage.set.bind(storage),
  getMany: storage.get.bind(storage)
} || {});

/***/ },

/***/ 78839
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var idb_keyval__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77783);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28732);
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(45703);



const store = idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .createStore */ .y$(_config__WEBPACK_IMPORTED_MODULE_1__/* .INDEXED_DB_NAME */ .vPi, _config__WEBPACK_IMPORTED_MODULE_1__/* .INDEXED_DB_STORE_NAME */ .rQT);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getItem: name => idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .get */ .Jt(name, store),
  setItem: (name, value) => idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .set */ .hZ(name, value, store),
  removeItem: name => idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .del */ .yH(name, store),
  clear: () => idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .clear */ .IU(store),
  getAll: async () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const keys = await idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .keys */ .HP(store);
    const values = await idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .getMany */ .qy(keys, store);
    return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__/* .fromKeyValueArrays */ .rs)(keys, values);
  },
  getMany: async keys => {
    const values = await idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .getMany */ .qy(keys, store);
    return (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_2__/* .fromKeyValueArrays */ .rs)(keys, values);
  },
  setMany: items => {
    return idb_keyval__WEBPACK_IMPORTED_MODULE_0__/* .setMany */ ._y(Object.entries(items), store);
  }
});

/***/ },

/***/ 44728
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_iteratees__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45703);
/* harmony import */ var _util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73924);


function withPromise(fn) {
  return function () {
    return Promise.resolve(fn(...arguments));
  };
}
const storage = typeof localStorage === 'object' ? {
  getItem: withPromise(localStorage.getItem),
  setItem: withPromise(localStorage.setItem),
  removeItem: withPromise(localStorage.removeItem),
  clear: withPromise(localStorage.clear),
  getAll: withPromise(() => ({
    ...localStorage
  })),
  getMany: withPromise(keys => (0,_util_iteratees__WEBPACK_IMPORTED_MODULE_0__/* .pick */ .Up)(localStorage, keys)),
  setMany: withPromise(items => {
    Object.assign(localStorage, items);
  })
} : {
  getItem(key) {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageGetItem', key);
  },
  setItem(key, value) {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageSetItem', key, value);
  },
  removeItem(key) {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageRemoveItem', key);
  },
  clear() {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageClear');
  },
  getAll() {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageGetAll');
  },
  getMany(keys) {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageGetMany', keys);
  },
  setMany(items) {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_1__/* .callWindow */ .p)('localStorageSetMany', items);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (storage);

/***/ },

/***/ 61483
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ StorageType)
/* harmony export */ });
let StorageType = /*#__PURE__*/function (StorageType) {
  StorageType[StorageType["IndexedDb"] = 0] = "IndexedDb";
  StorageType[StorageType["LocalStorage"] = 1] = "LocalStorage";
  StorageType[StorageType["ExtensionLocal"] = 2] = "ExtensionLocal";
  StorageType[StorageType["CapacitorStorage"] = 3] = "CapacitorStorage";
  StorageType[StorageType["NodeFile"] = 4] = "NodeFile";
  return StorageType;
}({});

/***/ },

/***/ 33632
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ Big)
/* harmony export */ });
/*
 *  big.js v6.2.1
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2022 Michael Mclaughlin
 *  https://github.com/MikeMcl/big.js/LICENCE.md
 */

/************************************** EDITABLE DEFAULTS *****************************************/

// The default values below must be integers within the stated ranges.

/*
 * The maximum number of decimal places (DP) of the results of operations involving division:
 * div and sqrt, and pow with negative exponents.
 */
var DP = 20,
  // 0 to MAX_DP

  /*
   * The rounding mode (RM) used when rounding to the above decimal places.
   *
   *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
   *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
   *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
   *  3  Away from zero.                                  (ROUND_UP)
   */
  RM = 1,
  // 0, 1, 2 or 3

  // The maximum value of DP and Big.DP.
  MAX_DP = 1E6,
  // 0 to 1000000

  // The maximum magnitude of the exponent argument to the pow method.
  MAX_POWER = 1E6,
  // 1 to 1000000

  /*
   * The negative exponent (NE) at and beneath which toString returns exponential notation.
   * (JavaScript numbers: -7)
   * -1000000 is the minimum recommended exponent value of a Big.
   */
  NE = -7,
  // 0 to -1000000

  /*
   * The positive exponent (PE) at and above which toString returns exponential notation.
   * (JavaScript numbers: 21)
   * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.
   */
  PE = 21,
  // 0 to 1000000

  /*
   * When true, an error will be thrown if a primitive number is passed to the Big constructor,
   * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a
   * primitive number without a loss of precision.
   */
  STRICT = false,
  // true or false

  /**************************************************************************************************/

  // Error messages.
  NAME = '[big.js] ',
  INVALID = NAME + 'Invalid ',
  INVALID_DP = INVALID + 'decimal places',
  INVALID_RM = INVALID + 'rounding mode',
  DIV_BY_ZERO = NAME + 'Division by zero',
  // The shared prototype object.
  P = {},
  UNDEFINED = void 0,
  NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

/*
 * Create and return a Big constructor.
 */
function _Big_() {
  /*
   * The Big constructor and exported function.
   * Create and return a new instance of a Big number object.
   *
   * n {number|string|Big} A numeric value.
   */
  function Big(n) {
    var x = this;

    // Enable constructor usage without new.
    if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);

    // Duplicate.
    if (n instanceof Big) {
      x.s = n.s;
      x.e = n.e;
      x.c = n.c.slice();
    } else {
      if (typeof n !== 'string') {
        if (Big.strict === true && typeof n !== 'bigint') {
          throw TypeError(INVALID + 'value');
        }

        // Minus zero?
        n = n === 0 && 1 / n < 0 ? '-0' : String(n);
      }
      parse(x, n);
    }

    // Retain a reference to this Big constructor.
    // Shadow Big.prototype.constructor which points to Object.
    x.constructor = Big;
  }
  Big.prototype = P;
  Big.DP = DP;
  Big.RM = RM;
  Big.NE = NE;
  Big.PE = PE;
  Big.strict = STRICT;
  Big.roundDown = 0;
  Big.roundHalfUp = 1;
  Big.roundHalfEven = 2;
  Big.roundUp = 3;
  return Big;
}

/*
 * Parse the number or string value passed to a Big constructor.
 *
 * x {Big} A Big number instance.
 * n {number|string} A numeric value.
 */
function parse(x, n) {
  var e, i, nl;
  if (!NUMERIC.test(n)) {
    throw Error(INVALID + 'number');
  }

  // Determine sign.
  x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

  // Decimal point?
  if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');

  // Exponential form?
  if ((i = n.search(/e/i)) > 0) {
    // Determine exponent.
    if (e < 0) e = i;
    e += +n.slice(i + 1);
    n = n.substring(0, i);
  } else if (e < 0) {
    // Integer.
    e = n.length;
  }
  nl = n.length;

  // Determine leading zeros.
  for (i = 0; i < nl && n.charAt(i) == '0';) ++i;
  if (i == nl) {
    // Zero.
    x.c = [x.e = 0];
  } else {
    // Determine trailing zeros.
    for (; nl > 0 && n.charAt(--nl) == '0';);
    x.e = e - i - 1;
    x.c = [];

    // Convert string to array of digits without leading/trailing zeros.
    for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
  }
  return x;
}

/*
 * Round Big x to a maximum of sd significant digits using rounding mode rm.
 *
 * x {Big} The Big to round.
 * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.
 * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 * [more] {boolean} Whether the result of division was truncated.
 */
function round(x, sd, rm, more) {
  var xc = x.c;
  if (rm === UNDEFINED) rm = x.constructor.RM;
  if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {
    throw Error(INVALID_RM);
  }
  if (sd < 1) {
    more = rm === 3 && (more || !!xc[0]) || sd === 0 && (rm === 1 && xc[0] >= 5 || rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED)));
    xc.length = 1;
    if (more) {
      // 1, 0.1, 0.01, 0.001, 0.0001 etc.
      x.e = x.e - sd + 1;
      xc[0] = 1;
    } else {
      // Zero.
      xc[0] = x.e = 0;
    }
  } else if (sd < xc.length) {
    // xc[sd] is the digit after the digit that may be rounded up.
    more = rm === 1 && xc[sd] >= 5 || rm === 2 && (xc[sd] > 5 || xc[sd] === 5 && (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) || rm === 3 && (more || !!xc[0]);

    // Remove any digits after the required precision.
    xc.length = sd;

    // Round up?
    if (more) {
      // Rounding up may mean the previous digit has to be rounded up.
      for (; ++xc[--sd] > 9;) {
        xc[sd] = 0;
        if (sd === 0) {
          ++x.e;
          xc.unshift(1);
          break;
        }
      }
    }

    // Remove trailing zeros.
    for (sd = xc.length; !xc[--sd];) xc.pop();
  }
  return x;
}

/*
 * Return a string representing the value of Big x in normal or exponential notation.
 * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
 */
function stringify(x, doExponential, isNonzero) {
  var e = x.e,
    s = x.c.join(''),
    n = s.length;

  // Exponential notation?
  if (doExponential) {
    s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;

    // Normal notation.
  } else if (e < 0) {
    for (; ++e;) s = '0' + s;
    s = '0.' + s;
  } else if (e > 0) {
    if (++e > n) {
      for (e -= n; e--;) s += '0';
    } else if (e < n) {
      s = s.slice(0, e) + '.' + s.slice(e);
    }
  } else if (n > 1) {
    s = s.charAt(0) + '.' + s.slice(1);
  }
  return x.s < 0 && isNonzero ? '-' + s : s;
}

// Prototype/instance methods

/*
 * Return a new Big whose value is the absolute value of this Big.
 */
P.abs = function () {
  var x = new this.constructor(this);
  x.s = 1;
  return x;
};

/*
 * Return 1 if the value of this Big is greater than the value of Big y,
 *       -1 if the value of this Big is less than the value of Big y, or
 *        0 if they have the same value.
 */
P.cmp = function (y) {
  var isneg,
    x = this,
    xc = x.c,
    yc = (y = new x.constructor(y)).c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;

  // Either zero?
  if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

  // Signs differ?
  if (i != j) return i;
  isneg = i < 0;

  // Compare exponents.
  if (k != l) return k > l ^ isneg ? 1 : -1;
  j = (k = xc.length) < (l = yc.length) ? k : l;

  // Compare digit by digit.
  for (i = -1; ++i < j;) {
    if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
  }

  // Compare lengths.
  return k == l ? 0 : k > l ^ isneg ? 1 : -1;
};

/*
 * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
 * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.div = function (y) {
  var x = this,
    Big = x.constructor,
    a = x.c,
    // dividend
    b = (y = new Big(y)).c,
    // divisor
    k = x.s == y.s ? 1 : -1,
    dp = Big.DP;
  if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }

  // Divisor is zero?
  if (!b[0]) {
    throw Error(DIV_BY_ZERO);
  }

  // Dividend is 0? Return +-0.
  if (!a[0]) {
    y.s = k;
    y.c = [y.e = 0];
    return y;
  }
  var bl,
    bt,
    n,
    cmp,
    ri,
    bz = b.slice(),
    ai = bl = b.length,
    al = a.length,
    r = a.slice(0, bl),
    // remainder
    rl = r.length,
    q = y,
    // quotient
    qc = q.c = [],
    qi = 0,
    p = dp + (q.e = x.e - y.e) + 1; // precision of the result

  q.s = k;
  k = p < 0 ? 0 : p;

  // Create version of divisor with leading zero.
  bz.unshift(0);

  // Add zeros to make remainder as long as divisor.
  for (; rl++ < bl;) r.push(0);
  do {
    // n is how many times the divisor goes into current remainder.
    for (n = 0; n < 10; n++) {
      // Compare divisor and remainder.
      if (bl != (rl = r.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri = -1, cmp = 0; ++ri < bl;) {
          if (b[ri] != r[ri]) {
            cmp = b[ri] > r[ri] ? 1 : -1;
            break;
          }
        }
      }

      // If divisor < remainder, subtract divisor from remainder.
      if (cmp < 0) {
        // Remainder can't be more than 1 digit longer than divisor.
        // Equalise lengths using divisor with extra leading zero?
        for (bt = rl == bl ? b : bz; rl;) {
          if (r[--rl] < bt[rl]) {
            ri = rl;
            for (; ri && !r[--ri];) r[ri] = 9;
            --r[ri];
            r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }
        for (; !r[0];) r.shift();
      } else {
        break;
      }
    }

    // Add the digit n to the result array.
    qc[qi++] = cmp ? n : ++n;

    // Update the remainder.
    if (r[0] && cmp) r[rl] = a[ai] || 0;else r = [a[ai]];
  } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

  // Leading zero? Do not remove if result is simply zero (qi == 1).
  if (!qc[0] && qi != 1) {
    // There can't be more than one zero.
    qc.shift();
    q.e--;
    p--;
  }

  // Round?
  if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);
  return q;
};

/*
 * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
 */
P.eq = function (y) {
  return this.cmp(y) === 0;
};

/*
 * Return true if the value of this Big is greater than the value of Big y, otherwise return
 * false.
 */
P.gt = function (y) {
  return this.cmp(y) > 0;
};

/*
 * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
 * return false.
 */
P.gte = function (y) {
  return this.cmp(y) > -1;
};

/*
 * Return true if the value of this Big is less than the value of Big y, otherwise return false.
 */
P.lt = function (y) {
  return this.cmp(y) < 0;
};

/*
 * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
 * return false.
 */
P.lte = function (y) {
  return this.cmp(y) < 1;
};

/*
 * Return a new Big whose value is the value of this Big minus the value of Big y.
 */
P.minus = P.sub = function (y) {
  var i,
    j,
    t,
    xlty,
    x = this,
    Big = x.constructor,
    a = x.s,
    b = (y = new Big(y)).s;

  // Signs differ?
  if (a != b) {
    y.s = -b;
    return x.plus(y);
  }
  var xc = x.c.slice(),
    xe = x.e,
    yc = y.c,
    ye = y.e;

  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (yc[0]) {
      y.s = -b;
    } else if (xc[0]) {
      y = new Big(x);
    } else {
      y.s = 1;
    }
    return y;
  }

  // Determine which is the bigger number. Prepend zeros to equalise exponents.
  if (a = xe - ye) {
    if (xlty = a < 0) {
      a = -a;
      t = xc;
    } else {
      ye = xe;
      t = yc;
    }
    t.reverse();
    for (b = a; b--;) t.push(0);
    t.reverse();
  } else {
    // Exponents equal. Check digit by digit.
    j = ((xlty = xc.length < yc.length) ? xc : yc).length;
    for (a = b = 0; b < j; b++) {
      if (xc[b] != yc[b]) {
        xlty = xc[b] < yc[b];
        break;
      }
    }
  }

  // x < y? Point xc to the array of the bigger number.
  if (xlty) {
    t = xc;
    xc = yc;
    yc = t;
    y.s = -y.s;
  }

  /*
   * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
   * needs to start at yc.length.
   */
  if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

  // Subtract yc from xc.
  for (b = i; j > a;) {
    if (xc[--j] < yc[j]) {
      for (i = j; i && !xc[--i];) xc[i] = 9;
      --xc[i];
      xc[j] += 10;
    }
    xc[j] -= yc[j];
  }

  // Remove trailing zeros.
  for (; xc[--b] === 0;) xc.pop();

  // Remove leading zeros and adjust exponent accordingly.
  for (; xc[0] === 0;) {
    xc.shift();
    --ye;
  }
  if (!xc[0]) {
    // n - n = +0
    y.s = 1;

    // Result must be zero.
    xc = [ye = 0];
  }
  y.c = xc;
  y.e = ye;
  return y;
};

/*
 * Return a new Big whose value is the value of this Big modulo the value of Big y.
 */
P.mod = function (y) {
  var ygtx,
    x = this,
    Big = x.constructor,
    a = x.s,
    b = (y = new Big(y)).s;
  if (!y.c[0]) {
    throw Error(DIV_BY_ZERO);
  }
  x.s = y.s = 1;
  ygtx = y.cmp(x) == 1;
  x.s = a;
  y.s = b;
  if (ygtx) return new Big(x);
  a = Big.DP;
  b = Big.RM;
  Big.DP = Big.RM = 0;
  x = x.div(y);
  Big.DP = a;
  Big.RM = b;
  return this.minus(x.times(y));
};

/*
 * Return a new Big whose value is the value of this Big negated.
 */
P.neg = function () {
  var x = new this.constructor(this);
  x.s = -x.s;
  return x;
};

/*
 * Return a new Big whose value is the value of this Big plus the value of Big y.
 */
P.plus = P.add = function (y) {
  var e,
    k,
    t,
    x = this,
    Big = x.constructor;
  y = new Big(y);

  // Signs differ?
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  var xe = x.e,
    xc = x.c,
    ye = y.e,
    yc = y.c;

  // Either zero?
  if (!xc[0] || !yc[0]) {
    if (!yc[0]) {
      if (xc[0]) {
        y = new Big(x);
      } else {
        y.s = x.s;
      }
    }
    return y;
  }
  xc = xc.slice();

  // Prepend zeros to equalise exponents.
  // Note: reverse faster than unshifts.
  if (e = xe - ye) {
    if (e > 0) {
      ye = xe;
      t = yc;
    } else {
      e = -e;
      t = xc;
    }
    t.reverse();
    for (; e--;) t.push(0);
    t.reverse();
  }

  // Point xc to the longer array.
  if (xc.length - yc.length < 0) {
    t = yc;
    yc = xc;
    xc = t;
  }
  e = yc.length;

  // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
  for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;

  // No need to check for zero, as +x + +y != 0 && -x + -y != 0

  if (k) {
    xc.unshift(k);
    ++ye;
  }

  // Remove trailing zeros.
  for (e = xc.length; xc[--e] === 0;) xc.pop();
  y.c = xc;
  y.e = ye;
  return y;
};

/*
 * Return a Big whose value is the value of this Big raised to the power n.
 * If n is negative, round to a maximum of Big.DP decimal places using rounding
 * mode Big.RM.
 *
 * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
 */
P.pow = function (n) {
  var x = this,
    one = new x.constructor('1'),
    y = one,
    isneg = n < 0;
  if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {
    throw Error(INVALID + 'exponent');
  }
  if (isneg) n = -n;
  for (;;) {
    if (n & 1) y = y.times(x);
    n >>= 1;
    if (!n) break;
    x = x.times(x);
  }
  return isneg ? one.div(y) : y;
};

/*
 * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
 * significant digits using rounding mode rm, or Big.RM if rm is not specified.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.prec = function (sd, rm) {
  if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
    throw Error(INVALID + 'precision');
  }
  return round(new this.constructor(this), sd, rm);
};

/*
 * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places
 * using rounding mode rm, or Big.RM if rm is not specified.
 * If dp is negative, round to an integer which is a multiple of 10**-dp.
 * If dp is not specified, round to 0 decimal places.
 *
 * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.round = function (dp, rm) {
  if (dp === UNDEFINED) dp = 0;else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {
    throw Error(INVALID_DP);
  }
  return round(new this.constructor(this), dp + this.e + 1, rm);
};

/*
 * Return a new Big whose value is the square root of the value of this Big, rounded, if
 * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
 */
P.sqrt = function () {
  var r,
    c,
    t,
    x = this,
    Big = x.constructor,
    s = x.s,
    e = x.e,
    half = new Big('0.5');

  // Zero?
  if (!x.c[0]) return new Big(x);

  // Negative?
  if (s < 0) {
    throw Error(NAME + 'No square root');
  }

  // Estimate.
  s = Math.sqrt(x + '');

  // Math.sqrt underflow/overflow?
  // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
  if (s === 0 || s === 1 / 0) {
    c = x.c.join('');
    if (!(c.length + e & 1)) c += '0';
    s = Math.sqrt(c);
    e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
  } else {
    r = new Big(s + '');
  }
  e = r.e + (Big.DP += 4);

  // Newton-Raphson iteration.
  do {
    t = r;
    r = half.times(t.plus(x.div(t)));
  } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));
  return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);
};

/*
 * Return a new Big whose value is the value of this Big times the value of Big y.
 */
P.times = P.mul = function (y) {
  var c,
    x = this,
    Big = x.constructor,
    xc = x.c,
    yc = (y = new Big(y)).c,
    a = xc.length,
    b = yc.length,
    i = x.e,
    j = y.e;

  // Determine sign of result.
  y.s = x.s == y.s ? 1 : -1;

  // Return signed 0 if either 0.
  if (!xc[0] || !yc[0]) {
    y.c = [y.e = 0];
    return y;
  }

  // Initialise exponent of result as x.e + y.e.
  y.e = i + j;

  // If array xc has fewer digits than yc, swap xc and yc, and lengths.
  if (a < b) {
    c = xc;
    xc = yc;
    yc = c;
    j = a;
    a = b;
    b = j;
  }

  // Initialise coefficient array of result with zeros.
  for (c = new Array(j = a + b); j--;) c[j] = 0;

  // Multiply.

  // i is initially xc.length.
  for (i = b; i--;) {
    b = 0;

    // a is yc.length.
    for (j = a + i; j > i;) {
      // Current sum of products at this digit position, plus carry.
      b = c[j] + yc[i] * xc[j - i - 1] + b;
      c[j--] = b % 10;

      // carry
      b = b / 10 | 0;
    }
    c[j] = b;
  }

  // Increment result exponent if there is a final carry, otherwise remove leading zero.
  if (b) ++y.e;else c.shift();

  // Remove trailing zeros.
  for (i = c.length; !c[--i];) c.pop();
  y.c = c;
  return y;
};

/*
 * Return a string representing the value of this Big in exponential notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toExponential = function (dp, rm) {
  var x = this,
    n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), ++dp, rm);
    for (; x.c.length < dp;) x.c.push(0);
  }
  return stringify(x, true, !!n);
};

/*
 * Return a string representing the value of this Big in normal notation rounded to dp fixed
 * decimal places using rounding mode rm, or Big.RM if rm is not specified.
 *
 * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 *
 * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
 * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
 */
P.toFixed = function (dp, rm) {
  var x = this,
    n = x.c[0];
  if (dp !== UNDEFINED) {
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {
      throw Error(INVALID_DP);
    }
    x = round(new x.constructor(x), dp + x.e + 1, rm);

    // x.e may have changed if the value is rounded up.
    for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);
  }
  return stringify(x, false, !!n);
};

/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Omit the sign for negative zero.
 */
P[Symbol.for('nodejs.util.inspect.custom')] = P.toJSON = P.toString = function () {
  var x = this,
    Big = x.constructor;
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);
};

/*
 * Return the value of this Big as a primitve number.
 */
P.toNumber = function () {
  var n = Number(stringify(this, true, true));
  if (this.constructor.strict === true && !this.eq(n.toString())) {
    throw Error(NAME + 'Imprecise conversion');
  }
  return n;
};

/*
 * Return a string representing the value of this Big rounded to sd significant digits using
 * rounding mode rm, or Big.RM if rm is not specified.
 * Use exponential notation if sd is less than the number of digits necessary to represent
 * the integer part of the value in normal notation.
 *
 * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.
 * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).
 */
P.toPrecision = function (sd, rm) {
  var x = this,
    Big = x.constructor,
    n = x.c[0];
  if (sd !== UNDEFINED) {
    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {
      throw Error(INVALID + 'precision');
    }
    x = round(new Big(x), sd, rm);
    for (; x.c.length < sd;) x.c.push(0);
  }
  return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);
};

/*
 * Return a string representing the value of this Big.
 * Return exponential notation if this Big has a positive exponent equal to or greater than
 * Big.PE, or a negative exponent equal to or less than Big.NE.
 * Include the sign for negative zero.
 */
P.valueOf = function () {
  var x = this,
    Big = x.constructor;
  if (Big.strict === true) {
    throw Error(NAME + 'valueOf disallowed');
  }
  return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);
};

// Export

var Big = _Big_();

/// <reference types="https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/big.js/index.d.ts" />
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Big)));

/***/ },

/***/ 95023
(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 95023;
module.exports = webpackEmptyContext;

/***/ }

};
;