"use strict";
exports.id = 714;
exports.ids = [612,714];
exports.modules = {

/***/ 90714
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  getLedgerTonWallet: () => (/* reexport */ getLedgerTonWallet),
  isLedgerTonAppOpen: () => (/* reexport */ isLedgerTonAppOpen),
  signTonProofWithLedger: () => (/* reexport */ signTonProofWithLedger),
  signTonTransactionsWithLedger: () => (/* reexport */ signTonTransactionsWithLedger),
  verifyLedgerTonAddress: () => (/* reexport */ verifyLedgerTonAddress)
});

// EXTERNAL MODULE: ../../../Users/hugh/.openclaw/workspace/my-headless/scope-fixes/node_modules/@ledgerhq/errors/lib-es/index.js + 1 modules
var lib_es = __webpack_require__(32118);
// EXTERNAL MODULE: ./src/api/common/ledger.ts
var ledger = __webpack_require__(93612);
// EXTERNAL MODULE: ./src/api/chains/ton/constants.ts
var constants = __webpack_require__(87273);
;// ./src/util/compareVersions.ts
function compareVersions(versionA, versionB) {
  const partsA = versionA.split('.').map(Number);
  const partsB = versionB.split('.').map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0;
    const partB = partsB[i] || 0;
    if (partA > partB) return 1;
    if (partA < partB) return -1;
  }
  return 0;
}
// EXTERNAL MODULE: ./src/util/logs.ts
var logs = __webpack_require__(71658);
;// ./src/api/chains/ton/ledger/support.ts



// You can use the https://github.com/LedgerHQ/app-ton history as the version support reference.
// Warning! The versions MUST NOT be lower than the actual versions that added support for these features. Otherwise,
// signing that transactions WILL FAIL. If you are not sure, set the version to a higher value. In that case Ledger will
// display the transactions as blind/unknown, but will be able to sign them.

const VERSION_WITH_GET_SETTINGS = '2.1';
const VERSION_WITH_WALLET_SPECIFIERS = '2.1';
const VERSION_WITH_BROKEN_QUERY_ID = {
  min: '2.7.0',
  max: '2.8.0'
};

/** The values are the TON App versions. The keys are the largest jetton ids (jetton indices) added in that versions. */
const VERSION_WITH_JETTON_ID = {
  6: '2.2',
  9: '2.6.1',
  10: '2.9.0' // TODO Replace to real version
};
const VERSION_WITH_PAYLOAD = {
  unsafe: '2.1',
  comment: '0',
  'jetton-transfer': '0',
  'nft-transfer': '2.1',
  'jetton-burn': '2.1',
  'add-whitelist': '2.1',
  'single-nominator-withdraw': '2.1',
  'single-nominator-change-validator': '2.1',
  'tonstakers-deposit': '2.1',
  'vote-for-proposal': '2.1',
  'change-dns-record': '2.1',
  'token-bridge-pay-swap': '2.1',
  'tonwhales-pool-deposit': '2.7',
  'tonwhales-pool-withdraw': '2.7',
  'vesting-send-msg-comment': '2.7'
};
const DEVICES_WITH_LOCK_DOUBLE_CHECK = new Set(['nanoS', 'nanoSP']);

// https://github.com/LedgerHQ/app-ton/blob/d3e1edbbc1fcf9a5d6982fbb971f757a83d0aa56/doc/MESSAGES.md?plain=1#L51
const DEVICES_NOT_SUPPORTING_JETTON_ID = new Set(['nanoS']);
function doesSupport(ledgerTonVersion, featureVersion) {
  return compareVersions(ledgerTonVersion, featureVersion) >= 0;
}

/**
 * Checks whether the current Ledger device supports `knownJetton` generally
 */
function doesSupportKnownJetton(ledgerModel, ledgerTonVersion) {
  return ledgerModel // If the Ledger model is unknown, assuming it can be any model and acting safely
  && !DEVICES_NOT_SUPPORTING_JETTON_ID.has(ledgerModel)
  // Note: JavaScript sorts the numeric `VERSION_WITH_JETTON_ID` keys in ascending order automatically
  && doesSupport(ledgerTonVersion, Object.values(VERSION_WITH_JETTON_ID)[0]);
}

/**
 * Checks that the current Ledger device supports the specific jetton id. This function should be used only if
 * `doesSupportKnownJetton` returns `true`, because it doesn't check what that function checks.
 */
function doesSupportKnownJettonId(ledgerTonVersion, jettonId) {
  // Note: JavaScript sorts the numeric `VERSION_WITH_JETTON_ID` keys in ascending order automatically
  for (const [candidateJettonId, candidateVersion] of Object.entries(VERSION_WITH_JETTON_ID)) {
    if (jettonId <= Number(candidateJettonId)) {
      return doesSupport(ledgerTonVersion, candidateVersion);
    }
  }
  (0,logs/* logDebugError */.SJ)(`The minimum TON App version for jetton id ${jettonId} is not set in VERSION_WITH_JETTON_ID`);
  return false;
}
function doesSupportNonZeroQueryId(ledgerTonVersion) {
  return !(compareVersions(ledgerTonVersion, VERSION_WITH_BROKEN_QUERY_ID.min) >= 0 && compareVersions(ledgerTonVersion, VERSION_WITH_BROKEN_QUERY_ID.max) <= 0);
}
// EXTERNAL MODULE: ../../../Users/hugh/.openclaw/workspace/my-headless/scope-fixes/node_modules/@ton-community/ton-ledger/dist/index.js
var dist = __webpack_require__(88993);
// EXTERNAL MODULE: ./src/api/types/index.ts + 2 modules
var types = __webpack_require__(68759);
;// ./src/api/chains/ton/ledger/utils.ts





const tonTransport = new dist/* TonTransport */.vs(ledger/* ledgerTransport */.d);
function getLedgerAccountPathByWallet(network, wallet, workchain) {
  return getLedgerAccountPathByIndex(wallet.index, network !== 'mainnet', workchain);
}
function getLedgerAccountPathByIndex(index, isTestnet) {
  let workchain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants/* WORKCHAIN */.Zm;
  const network = isTestnet ? 1 : 0;
  const chain = getInternalWorkchain(workchain);
  return [44, 607, network, chain, index, 0];
}
function getInternalWorkchain(workchain) {
  return workchain === constants/* Workchain */.li.MasterChain ? 255 : 0;
}
function getInternalWalletVersion(version) {
  return constants/* LEDGER_WALLET_VERSIONS */.iQ[version];
}

/** Throws unexpected errors (i.e. caused by mistakes in the app code), and returns expected */
function handleLedgerTonError(error) {
  if (error instanceof lib_es/* TransportStatusError */._3) {
    // Status code reference: https://github.com/LedgerHQ/app-ton/blob/d3e1edbbc1fcf9a5d6982fbb971f757a83d0aa56/src/sw.h
    switch (error.statusCode) {
      case 0x6985:
        return {
          error: types/* ApiHardwareError */.jc.RejectedByUser
        };
      case 0xbd00:
        return {
          error: types/* ApiHardwareError */.jc.BlindSigningNotEnabled
        };
      // The limits for Ton Connect proofs are: payload ≤ 128 bytes, domain ≤ 128 bytes, payload + domain ≤ 222 bytes
      case 0xb00b:
        return {
          error: types/* ApiHardwareError */.jc.ProofTooLarge
        };
    }
  }
  return (0,ledger/* handleLedgerCommonError */.L)(error);
}

/** Checks whether the current Ledger device is the one that stores the given wallet */
async function doesLedgerDeviceMatch(network, wallet) {
  const {
    publicKey
  } = await tonTransport.getAddress(...getLedgerWalletParams(network, wallet.index, wallet.version));
  return publicKey.toString('hex') === wallet.publicKey;
}
function getLedgerWalletParams(network, accountIndex, walletVersion) {
  const isTestnet = network !== 'mainnet';
  const workchain = constants/* WORKCHAIN */.Zm;
  const accountPath = getLedgerAccountPathByIndex(accountIndex, isTestnet, workchain);
  return [accountPath, {
    testOnly: isTestnet,
    chain: getInternalWorkchain(workchain),
    bounceable: constants/* WALLET_IS_BOUNCEABLE */.eL,
    walletVersion: getInternalWalletVersion(walletVersion)
  }];
}
;// ./src/api/chains/ton/ledger/other.ts





async function isLedgerTonAppOpen() {
  try {
    if (!(await tonTransport.isAppOpen())) {
      return false;
    }
    const deviceModel = await ledger/* ledgerTransport */.d.getDeviceModel();
    if (!deviceModel || DEVICES_WITH_LOCK_DOUBLE_CHECK.has(deviceModel.id)) {
      // Workaround for Ledger Nano S or Nano S Plus, this is a way to check if it is unlocked.
      // There will be an error with code 0x530c.
      await tonTransport.getAddress(getLedgerAccountPathByIndex(0, false), {
        walletVersion: getInternalWalletVersion(constants/* LEDGER_DEFAULT_WALLET_VERSION */.f1)
      });
    }
    return true;
  } catch (err) {
    if (err instanceof lib_es/* TransportStatusError */._3 && (err.statusCode === lib_es/* StatusCodes */.vi.LOCKED_DEVICE || err.statusCode === 0x530c)) {
      return false;
    }
    return handleLedgerTonError(err);
  }
}
;// ./src/api/chains/ton/ledger/wallet.ts



/**
 * Takes about 170ms on Ledger Nano X connected to Chrome on macOS and 212ms on Ledger Nano X connected to iPhone.
 * There is no need to call this function in parallel, because the transport will force them to be sequential anyway.
 */
async function getLedgerTonWallet(network, accountIndex) {
  try {
    const version = constants/* LEDGER_DEFAULT_WALLET_VERSION */.f1;
    const {
      address,
      publicKey
    } = await tonTransport.getAddress(...getLedgerWalletParams(network, accountIndex, version));
    return {
      index: accountIndex,
      address,
      publicKey: publicKey.toString('hex'),
      version
    };
  } catch (err) {
    return handleLedgerTonError(err);
  }
}
async function verifyLedgerTonAddress(network, wallet) {
  try {
    const {
      address
    } = await tonTransport.validateAddress(...getLedgerWalletParams(network, wallet.index, wallet.version));
    return address;
  } catch (err) {
    return handleLedgerTonError(err);
  }
}
// EXTERNAL MODULE: ./src/api/chains/ton/util/tonCore.ts + 4 modules
var tonCore = __webpack_require__(18137);
;// ./src/api/chains/ton/ledger/transactions.ts









const knownJettonAddresses = Object.fromEntries(dist/* KNOWN_JETTONS */._t.map((_ref, jettonId) => {
  let {
    masterAddress
  } = _ref;
  return [(0,tonCore/* toBase64Address */.vn)(masterAddress, true, 'mainnet'), jettonId];
}));

/** Thrown when and only when the Ledger TON app needs to be updated to support this transaction */
const unsupportedError = new Error('Unsupported');
const lacksBlindSigningError = new Error('Lacks blind signing');

/**
 * Signs the given TON transactions using Ledger. Because Ledger can't sign multiple messages at once, each transaction
 * must contain exactly 1 message, and the transactions will be signed one by one. If everything is ok, returns the
 * signed transactions in the same order as the input transactions.
 */
async function signTonTransactionsWithLedger(network, wallet, tonTransactions, subwalletId, isTonConnect) {
  let maxRetries = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : constants/* ATTEMPTS */.PY;
  const accountPath = getLedgerAccountPathByWallet(network, wallet);
  let ledgerTransactions;
  try {
    if (!(await doesLedgerDeviceMatch(network, wallet))) {
      return {
        error: types/* ApiHardwareError */.jc.WrongDevice
      };
    }
    const deviceModel = await ledger/* ledgerTransport */.d.getDeviceModel();
    const ledgerTonVersion = await tonTransport.getVersion();
    const isBlindSigningEnabled = await getIsBlindSigningEnabled(ledgerTonVersion);

    // To improve the UX, making sure all the transactions are signable before asking the user to sign them
    ledgerTransactions = await Promise.all(tonTransactions.map(tonTransaction => tonTransactionToLedgerTransaction(network, wallet.version, tonTransaction, deviceModel === null || deviceModel === void 0 ? void 0 : deviceModel.id, ledgerTonVersion, isBlindSigningEnabled, subwalletId, isTonConnect)));
  } catch (err) {
    if (err === unsupportedError) return {
      error: types/* ApiHardwareError */.jc.HardwareOutdated
    };
    if (err === lacksBlindSigningError) return {
      error: types/* ApiHardwareError */.jc.BlindSigningNotEnabled
    };
    return handleLedgerTonError(err);
  }
  return signLedgerTransactionsWithRetry(accountPath, ledgerTransactions, maxRetries);
}
async function getIsBlindSigningEnabled(ledgerTonVersion) {
  if (!doesSupport(ledgerTonVersion, VERSION_WITH_GET_SETTINGS)) {
    return true; // If Ledger actually doesn't allow blind signing, it will throw an error later
  }
  const {
    blindSigningEnabled
  } = await tonTransport.getSettings();
  return blindSigningEnabled;
}

/**
 * Converts a transaction, that you would pass to `TonWallet.createTransfer`, to the format suitable for Ledger's
 * `TonTransport.signTransaction`.
 */
async function tonTransactionToLedgerTransaction(network, walletVersion, tonTransaction, ledgerModel, ledgerTonVersion, isBlindSigningEnabled, subwalletId, isTonConnect) {
  const {
    authType = 'external',
    sendMode = 0,
    seqno,
    timeout,
    hints
  } = tonTransaction;
  const message = getMessageFromTonTransaction(tonTransaction);
  if (authType !== 'external') {
    throw new Error(`Unsupported transaction authType "${authType}"`);
  }
  if (message.info.type !== 'internal') {
    throw new Error(`Unsupported message type "${message.info.type}"`);
  }
  const payload = await getPayload(network, message.info.dest, message.body, ledgerModel, ledgerTonVersion, isBlindSigningEnabled, hints, isTonConnect);
  return {
    to: message.info.dest,
    sendMode,
    seqno,
    timeout: timeout ?? getFallbackTimeout(),
    bounce: message.info.bounce,
    amount: message.info.value.coins,
    stateInit: message.init ?? undefined,
    payload,
    walletSpecifiers: getWalletSpecifiers(walletVersion, ledgerTonVersion, subwalletId)
  };
}
function getMessageFromTonTransaction(_ref2) {
  let {
    messages
  } = _ref2;
  if (messages.length === 0) throw new Error('No messages');
  if (messages.length > 1) throw new Error('Ledger doesn\'t support signing more than 1 message');
  return messages[0];
}
function getFallbackTimeout() {
  return Math.floor(Date.now() / 1000 + constants/* TRANSFER_TIMEOUT_SEC */.kF);
}

/**
 * Like `tonPayloadToLedgerPayload`, but also performs long asynchronous operations such as fetching data for the
 * `knownJetton` field.
 */
async function getPayload(network, toAddress, tonPayload, ledgerModel, ledgerTonVersion, isBlindSigningEnabled) {
  let {
    tokenAddress
  } = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  let isTonConnect = arguments.length > 7 ? arguments[7] : undefined;
  const ledgerPayload = tonPayloadToLedgerPayload(tonPayload, ledgerTonVersion, isTonConnect);
  if ((ledgerPayload === null || ledgerPayload === void 0 ? void 0 : ledgerPayload.type) === 'jetton-transfer' && doesSupportKnownJetton(ledgerModel, ledgerTonVersion)) {
    if (!tokenAddress) {
      const tokenWalletAddress = (0,tonCore/* toBase64Address */.vn)(toAddress, true, network);
      tokenAddress = await (0,tonCore/* resolveTokenAddress */.uA)(network, tokenWalletAddress);
    }
    if (tokenAddress) {
      ledgerPayload.knownJetton = getKnownJetton(ledgerTonVersion, tokenAddress);
    }
  }
  if ((ledgerPayload === null || ledgerPayload === void 0 ? void 0 : ledgerPayload.type) === 'unsafe' && !isBlindSigningEnabled) {
    throw lacksBlindSigningError;
  }
  return ledgerPayload;
}

/**
 * Converts a TON message body to the Ledger payload format. Doesn't populate the `knownJetton` field.
 */
function tonPayloadToLedgerPayload(tonPayload, ledgerTonVersion, isTonConnect) {
  if (!tonPayload) {
    return undefined;
  }
  let ledgerPayload;
  try {
    const options = isTonConnect ? {
      // Modifying the payload generated in the dApp can lead to unpredictable errors
      // (for example, an NFT may get stuck in the contract).
      disallowModification: true
    } : {
      disallowUnsafe: true // Otherwise no error will be thrown, and we won't see why the payload can't be converted
      // We don't use `disallowModification: true`, because it can cause an unnecessary "unsafe" payload, for example,
      // when a token is transferred with a short comment. On the other hand, the fee may increase by about 0.0001 TON.
    };
    ledgerPayload = (0,dist/* parseMessage */.vY)(tonPayload, options);
  } catch (err) {
    (0,logs/* logDebug */.MD)('Unsafe Ledger payload', err);
    ledgerPayload = {
      type: 'unsafe',
      message: tonPayload
    };
  }
  if (ledgerPayload && 'queryId' in ledgerPayload && typeof ledgerPayload.queryId === 'bigint' && ledgerPayload.queryId > 0n && !doesSupportNonZeroQueryId(ledgerTonVersion)) {
    (0,logs/* logDebug */.MD)(`A non-zero queryId is being used on a TON App version v${ledgerTonVersion} where this is broken.`);
    if (!doesSupport(ledgerTonVersion, VERSION_WITH_PAYLOAD.unsafe)) {
      throw unsupportedError;
    }
    (0,logs/* logDebug */.MD)('Falling back to an unsafe payload');
    ledgerPayload = {
      type: 'unsafe',
      message: tonPayload
    };
  }
  if (ledgerPayload && !doesSupport(ledgerTonVersion, VERSION_WITH_PAYLOAD[ledgerPayload.type])) {
    (0,logs/* logDebug */.MD)(`The ${ledgerPayload.type} payload type is not supported by Ledger TON v${ledgerTonVersion}`);
    if (!doesSupport(ledgerTonVersion, VERSION_WITH_PAYLOAD.unsafe)) {
      throw unsupportedError;
    }
    (0,logs/* logDebug */.MD)('Falling back to an unsafe payload');
    ledgerPayload = {
      type: 'unsafe',
      message: tonPayload
    };
  }
  return ledgerPayload;
}
async function signLedgerTransactionsWithRetry(accountPath, ledgerTransactions, maxRetries) {
  const signedTransactions = [];
  let retryCount = 0;
  let index = 0;
  while (index < ledgerTransactions.length) {
    try {
      signedTransactions.push(await tonTransport.signTransaction(accountPath, ledgerTransactions[index]));
      index++;
    } catch (err) {
      try {
        return handleLedgerTonError(err);
      } catch {
        if (retryCount >= maxRetries) {
          throw err;
        }
        retryCount++;
      }
      (0,logs/* logDebugError */.SJ)('signLedgerTransactionsWithRetry', err);
    }
  }
  return signedTransactions;
}
function getKnownJetton(ledgerTonVersion, tokenAddress) {
  const jettonId = knownJettonAddresses[tokenAddress];
  return jettonId !== undefined && doesSupportKnownJettonId(ledgerTonVersion, jettonId) ? {
    jettonId,
    workchain: constants/* WORKCHAIN */.Zm
  } : null; // eslint-disable-line no-null/no-null
}
function getWalletSpecifiers(walletVersion, ledgerTonVersion, subwalletId) {
  if (walletVersion === 'v3R2') {
    if (!doesSupport(ledgerTonVersion, VERSION_WITH_WALLET_SPECIFIERS)) throw unsupportedError;
    return {
      includeWalletOp: false
    };
  }
  if (subwalletId !== undefined) {
    if (!doesSupport(ledgerTonVersion, VERSION_WITH_WALLET_SPECIFIERS)) throw unsupportedError;
    return {
      subwalletId,
      includeWalletOp: false
    };
  }
  return undefined;
}
;// ./src/api/chains/ton/ledger/tonConnect.ts


async function signTonProofWithLedger(network, wallet, proof) {
  const accountPath = getLedgerAccountPathByWallet(network, wallet);
  const {
    timestamp,
    domain,
    payload
  } = proof;
  try {
    if (!(await doesLedgerDeviceMatch(network, wallet))) {
      return {
        error: types/* ApiHardwareError */.jc.WrongDevice
      };
    }
    const result = await tonTransport.getAddressProof(accountPath, {
      domain,
      timestamp,
      payload: Buffer.from(payload)
    });
    return result.signature;
  } catch (err) {
    return handleLedgerTonError(err);
  }
}
;// ./src/api/chains/ton/ledger/index.ts
/*
 * This file must be imported dynamically via import().
 * Only this file is allowed to be imported from outside of this directory.
 * This is needed to reduce the app size when Ledger is not used.
 */






/***/ },

/***/ 93612
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ handleLedgerCommonError),
/* harmony export */   d: () => (/* binding */ ledgerTransport),
/* harmony export */   getLedgerDeviceInfo: () => (/* binding */ getLedgerDeviceInfo)
/* harmony export */ });
/* harmony import */ var _ledgerhq_hw_transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81507);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68759);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50352);
/* harmony import */ var _util_windowProvider_connector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45890);
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