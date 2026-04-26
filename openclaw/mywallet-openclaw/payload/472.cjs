"use strict";
exports.id = 472;
exports.ids = [472];
exports.modules = {

/***/ 73472
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ handleLedgerCommonError),
/* harmony export */   d: () => (/* binding */ ledgerTransport),
/* harmony export */   getLedgerDeviceInfo: () => (/* binding */ getLedgerDeviceInfo)
/* harmony export */ });
/* harmony import */ var _ledgerhq_hw_transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38495);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(83830);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28732);
/* harmony import */ var _util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73924);
/*
 * This file must be imported dynamically via import().
 * This is needed to reduce the app size when Ledger is not used.
 */






/**
 * Serialization format differs between web/capacitor and native apps:
 *  - Native (AIR) apps: Use hex format (expected by native Ledger library implementations)
 *  - Web/Capacitor apps: Use base64 format (more efficient for browser message passing)
 */
const serializationFormat = _config__WEBPACK_IMPORTED_MODULE_2__/* .IS_AIR_APP */ .gmk ? 'hex' : 'base64';
const BROKEN_CONNECTION_ERRORS = new Set([
// This error occurs sometimes if the chains' Ledger app is closed during a data transmission with Ledger
'DisconnectedDeviceDuringOperation',
// One way to reproduce this error is:
// 1. Run the app in Capacitor on iOS,
// 2. Connect Ledger and open TON App,
// 3. Start the connection in the UI, e.g. by sending a transaction,
// 4. As soon as the checklist screen appears, exit TON App immediately,
// 5. Start the connection in the UI again without entering TON App.
// It happens only sometimes. The error message suggests reconnecting Ledger.
'TransportRaceCondition']);

/**
 * A Ledger's Transport implementation that passes the data to the actual transfer object in the main browser thread
 * (src/util/ledger/index.ts) via postMessage (because actual Ledger transports don't work in worker threads).
 */
class WindowTransport extends _ledgerhq_hw_transport__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay {
  /** Use `getDeviceModel()` instead */

  /** The thrown errors may unexpectedly have the default `Error` class. For reliability, check the `name` instead. */
  async exchange(apdu) {
    const response = await (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_3__/* .callWindow */ .p)('exchangeWithLedger', apdu.toString(serializationFormat));
    return Buffer.from(response, serializationFormat);
  }
  getDeviceModel() {
    return (0,_util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_3__/* .callWindow */ .p)('getLedgerDeviceModel');
  }
}

/** Connection with Ledger (blockchain-agnostic) */
const ledgerTransport = new WindowTransport();
async function getLedgerDeviceInfo() {
  const deviceModel = await ledgerTransport.getDeviceModel();
  const driver = 'HID';
  return {
    driver,
    deviceId: deviceModel === null || deviceModel === void 0 ? void 0 : deviceModel.id,
    deviceName: deviceModel === null || deviceModel === void 0 ? void 0 : deviceModel.productName
  };
}
function isLedgerConnectionBroken(error) {
  return error instanceof Error && BROKEN_CONNECTION_ERRORS.has(error.name);
}

/** Throws unexpected errors (i.e. caused by mistakes in the app code), and returns expected */
function handleLedgerCommonError(error) {
  if (isLedgerConnectionBroken(error)) {
    return {
      error: _types__WEBPACK_IMPORTED_MODULE_1__/* .ApiHardwareError */ .jc.ConnectionBroken
    };
  }
  throw error;
}

/***/ }

};
;