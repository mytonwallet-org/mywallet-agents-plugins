/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 31421
(module) {

module.exports = require("node:child_process");

/***/ },

/***/ 76760
(module) {

module.exports = require("node:path");

/***/ },

/***/ 57975
(module) {

module.exports = require("node:util");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			765: 1
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
var __webpack_exports__ = {};

;// external "node:buffer"
const external_node_buffer_namespaceObject = require("node:buffer");
;// external "node:crypto"
const external_node_crypto_namespaceObject = require("node:crypto");
;// external "node:stream/web"
const web_namespaceObject = require("node:stream/web");
// EXTERNAL MODULE: external "node:util"
var external_node_util_ = __webpack_require__(57975);
;// ./headless/platforms/shared-plugin/payload/entries/mywallet-mcp.ts




bootstrapBundleRuntimeGlobals();
bootstrapBundleRuntimeEnv();
void runMcpEntry().then(() => {
  process.exit(process.exitCode ?? 0);
}).catch(error => {
  process.stderr.write(`${formatBundleRuntimeError(error)}\n`);
  process.exit(1);
});
async function runMcpEntry() {
  const {
    runHeadlessMcpServer
  } = await Promise.all(/* import() */[__webpack_require__.e(221), __webpack_require__.e(236)]).then(__webpack_require__.bind(__webpack_require__, 15879));
  await runHeadlessMcpServer(process.argv.slice(2));
}
function bootstrapBundleRuntimeGlobals() {
  Object.assign(globalThis, {
    Buffer: external_node_buffer_namespaceObject.Buffer,
    TextEncoder: external_node_util_.TextEncoder,
    TextDecoder: external_node_util_.TextDecoder,
    CompressionStream: web_namespaceObject.CompressionStream,
    DecompressionStream: web_namespaceObject.DecompressionStream
  });
  Object.defineProperty(globalThis, 'crypto', {
    value: external_node_crypto_namespaceObject.webcrypto,
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
module.exports = __webpack_exports__;
/******/ })()
;