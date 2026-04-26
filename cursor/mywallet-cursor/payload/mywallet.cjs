/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 44855
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: external "node:buffer"
var external_node_buffer_ = __webpack_require__(4573);
// EXTERNAL MODULE: external "node:crypto"
var external_node_crypto_ = __webpack_require__(77598);
;// external "node:stream/web"
const web_namespaceObject = require("node:stream/web");
;// external "node:util"
const external_node_util_namespaceObject = require("node:util");
;// ./headless/platforms/shared-plugin/payload/entries/mywallet.ts




bootstrapBundleRuntimeGlobals();
bootstrapBundleRuntimeEnv();
void runCliEntry().then(() => {
  process.exit(process.exitCode ?? 0);
}).catch(error => {
  process.stderr.write(`${formatBundleRuntimeError(error)}\n`);
  process.exit(1);
});
async function runCliEntry() {
  const {
    runHeadlessCli
  } = await Promise.all(/* import() */[__webpack_require__.e(755), __webpack_require__.e(221), __webpack_require__.e(918)]).then(__webpack_require__.bind(__webpack_require__, 80918));
  await runHeadlessCli(process.argv.slice(2));
}
function bootstrapBundleRuntimeGlobals() {
  Object.assign(globalThis, {
    Buffer: external_node_buffer_.Buffer,
    TextEncoder: external_node_util_namespaceObject.TextEncoder,
    TextDecoder: external_node_util_namespaceObject.TextDecoder,
    CompressionStream: web_namespaceObject.CompressionStream,
    DecompressionStream: web_namespaceObject.DecompressionStream
  });
  Object.defineProperty(globalThis, 'crypto', {
    value: external_node_crypto_.webcrypto,
    configurable: true
  });
  if (typeof globalThis.self === 'undefined') {
    Object.defineProperty(globalThis, 'self', {
      value: globalThis,
      configurable: true
    });
  }
}
function bootstrapBundleRuntimeEnv() {
  process.env.MTW_HEADLESS_BUNDLE_PAYLOAD_DIR = __dirname;
}
function formatBundleRuntimeError(error) {
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

/***/ 42613
(module) {

module.exports = require("assert");

/***/ },

/***/ 76982
(module) {

module.exports = require("crypto");

/***/ },

/***/ 24434
(module) {

module.exports = require("events");

/***/ },

/***/ 79896
(module) {

module.exports = require("fs");

/***/ },

/***/ 58611
(module) {

module.exports = require("http");

/***/ },

/***/ 85675
(module) {

module.exports = require("http2");

/***/ },

/***/ 65692
(module) {

module.exports = require("https");

/***/ },

/***/ 69278
(module) {

module.exports = require("net");

/***/ },

/***/ 4573
(module) {

module.exports = require("node:buffer");

/***/ },

/***/ 77598
(module) {

module.exports = require("node:crypto");

/***/ },

/***/ 70857
(module) {

module.exports = require("os");

/***/ },

/***/ 16928
(module) {

module.exports = require("path");

/***/ },

/***/ 2203
(module) {

module.exports = require("stream");

/***/ },

/***/ 64756
(module) {

module.exports = require("tls");

/***/ },

/***/ 52018
(module) {

module.exports = require("tty");

/***/ },

/***/ 87016
(module) {

module.exports = require("url");

/***/ },

/***/ 39023
(module) {

module.exports = require("util");

/***/ },

/***/ 43106
(module) {

module.exports = require("zlib");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".cjs";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			362: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					var installedChunk = require("./" + __webpack_require__.u(chunkId));
/******/ 					if (!installedChunks[chunkId]) {
/******/ 						installChunk(installedChunk);
/******/ 					}
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 44855);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;