"use strict";
exports.id = 495;
exports.ids = [495];
exports.modules = {

/***/ 24450
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  vi: () => (/* binding */ StatusCodes),
  wX: () => (/* binding */ TransportError),
  ug: () => (/* binding */ TransportRaceCondition),
  _3: () => (/* binding */ TransportStatusError)
});

// UNUSED EXPORTS: AccountAwaitingSendPendingOperations, AccountNameRequiredError, AccountNotSupported, AmountRequired, BluetoothRequired, BtcUnmatchedApp, CantOpenDevice, CantScanQRCode, CashAddrNotSupported, CeloAppPleaseEnableContractData, ClaimRewardsFeesWarning, CurrencyNotSupported, DBNotReset, DBWrongPassword, DeviceAppVerifyNotSupported, DeviceExtractOnboardingStateError, DeviceGenuineSocketEarlyClose, DeviceHalted, DeviceInOSUExpected, DeviceMangementKitError, DeviceNameInvalid, DeviceNeedsRestart, DeviceNotGenuineError, DeviceOnDashboardExpected, DeviceOnDashboardUnexpected, DeviceOnboardingStatePollingError, DeviceShouldStayInApp, DeviceSocketFail, DeviceSocketNoBulkStatus, DisabledTransactionBroadcastError, DisconnectedDevice, DisconnectedDeviceDuringOperation, DustLimit, ETHAddressNonEIP, EnpointConfigError, EthAppPleaseEnableContractData, ExpertModeRequired, FeeEstimationFailed, FeeNotLoaded, FeeNotLoadedSwap, FeeRequired, FeeTooHigh, FirmwareNotRecognized, FirmwareOrAppUpdateRequired, GasLessThanEstimate, GenuineCheckFailed, HardResetFail, HwTransportError, HwTransportErrorType, InvalidAddress, InvalidAddressBecauseDestinationIsAlsoSource, InvalidNonce, InvalidXRPTag, LanguageNotFound, LatestFirmwareVersionRequired, LatestMCUInstalledError, LedgerAPI4xx, LedgerAPI5xx, LedgerAPIError, LedgerAPIErrorWithMessage, LedgerAPINotAvailable, LockedDeviceError, MCUNotGenuineToDashboard, ManagerAppAlreadyInstalledError, ManagerAppDepInstallRequired, ManagerAppDepUninstallRequired, ManagerAppRelyOnBTCError, ManagerDeviceLockedError, ManagerFirmwareNotEnoughSpaceError, ManagerNotEnoughSpaceError, ManagerUninstallBTCDep, MaxFeeTooLow, MaybeKeepTronAccountAlive, MissingSwapPayloadParamaters, NanoSNotSupported, NetworkDown, NetworkError, NoAccessToCamera, NoAddressesFound, NoDBPathGiven, NotEnoughBalance, NotEnoughBalanceBecauseDestinationNotCreated, NotEnoughBalanceFees, NotEnoughBalanceInParentAccount, NotEnoughBalanceSwap, NotEnoughBalanceToDelegate, NotEnoughGas, NotEnoughGasSwap, NotEnoughSpendableBalance, NotEnoughToRestake, NotEnoughToStake, NotEnoughToUnstake, NotSupportedLegacyAddress, OpReturnDataSizeLimit, PairingFailed, PasswordIncorrectError, PasswordsDontMatchError, PeerRemovedPairing, PendingOperation, PinNotSet, PriorityFeeHigherThanMaxFee, PriorityFeeTooHigh, PriorityFeeTooLow, RecipientRequired, RecommendSubAccountsToEmpty, RecommendUndelegation, ReplacementTransactionUnderpriced, RestakeNotEnoughStakedBalanceLeft, SequenceNumberError, SolAppPleaseEnableContractData, SyncError, TimeoutTagged, TransactionHasBeenValidatedError, TransportExchangeTimeoutError, TransportInterfaceNotAvailable, TransportOpenUserCancelled, TransportWebUSBGestureRequired, TronEmptyAccount, UnavailableTezosOriginatedAccountReceive, UnavailableTezosOriginatedAccountSend, UnexpectedBootloader, UnknownMCU, UnresponsiveDeviceError, UnstakeNotEnoughStakedBalanceLeft, UnsupportedFeatureError, UpdateFetchFileFail, UpdateIncorrectHash, UpdateIncorrectSig, UpdateYourApp, UserRefusedAddress, UserRefusedAllowManager, UserRefusedDeviceNameChange, UserRefusedFirmwareUpdate, UserRefusedOnDevice, WebsocketConnectionError, WebsocketConnectionFailed, WrongAppForCurrency, WrongDeviceForAccount, WrongDeviceForAccountPayout, WrongDeviceForAccountRefund, addCustomErrorDeserializer, createCustomErrorClass, deserializeError, getAltStatusMessage, serializeError

;// ./node_modules/@ledgerhq/errors/lib-es/helpers.js
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
const errorClasses = {};
const deserializers = {};
const addCustomErrorDeserializer = (name, deserializer) => {
    deserializers[name] = deserializer;
};
const createCustomErrorClass = (name) => {
    class CustomErrorClass extends Error {
        cause;
        constructor(message, fields, options) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            super(message || name, options);
            // Set the prototype explicitly. See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, CustomErrorClass.prototype);
            this.name = name;
            if (fields) {
                for (const k in fields) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this[k] = fields[k];
                }
            }
            if (options && isObject(options) && "cause" in options && !this.cause) {
                // .cause was specified but the superconstructor
                // did not create an instance property.
                const cause = options.cause;
                this.cause = cause;
                if ("stack" in cause) {
                    this.stack = this.stack + "\nCAUSE: " + cause.stack;
                }
            }
        }
    }
    errorClasses[name] = CustomErrorClass;
    return CustomErrorClass;
};
function isObject(value) {
    return typeof value === "object";
}
// inspired from https://github.com/programble/errio/blob/master/index.js
const deserializeError = (object) => {
    if (object && typeof object === "object") {
        try {
            if (typeof object.message === "string") {
                const msg = JSON.parse(object.message);
                if (msg.message && msg.name) {
                    object = msg;
                }
            }
        }
        catch {
            // nothing
        }
        let error;
        if (typeof object.name === "string") {
            const { name } = object;
            const des = deserializers[name];
            if (des) {
                error = des(object);
            }
            else {
                let constructor = name === "Error" ? Error : errorClasses[name];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name + "'");
                    constructor = createCustomErrorClass(name);
                }
                error = Object.create(constructor.prototype);
                try {
                    for (const prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            error[prop] = object[prop];
                        }
                    }
                }
                catch {
                    // sometimes setting a property can fail (e.g. .name)
                }
            }
        }
        else {
            if (typeof object.message === "string") {
                error = new Error(object.message);
            }
        }
        if (error && !error.stack && Error.captureStackTrace) {
            Error.captureStackTrace(error, deserializeError);
        }
        return error;
    }
    return new Error(String(object));
};
// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
const serializeError = (value) => {
    if (!value)
        return value;
    if (typeof value === "object") {
        return destroyCircular(value, []);
    }
    if (typeof value === "function") {
        return `[Function: ${value.name || "anonymous"}]`;
    }
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
    const to = {};
    seen.push(from);
    for (const key of Object.keys(from)) {
        const value = from[key];
        if (typeof value === "function") {
            continue;
        }
        if (!value || typeof value !== "object") {
            to[key] = value;
            continue;
        }
        if (seen.indexOf(from[key]) === -1) {
            to[key] = destroyCircular(from[key], seen.slice(0));
            continue;
        }
        to[key] = "[Circular]";
    }
    if (typeof from.name === "string") {
        to.name = from.name;
    }
    if (typeof from.message === "string") {
        to.message = from.message;
    }
    if (typeof from.stack === "string") {
        to.stack = from.stack;
    }
    return to;
}
//# sourceMappingURL=helpers.js.map
;// ./node_modules/@ledgerhq/errors/lib-es/index.js


const AccountNameRequiredError = createCustomErrorClass("AccountNameRequired");
const AccountNotSupported = createCustomErrorClass("AccountNotSupported");
const AccountAwaitingSendPendingOperations = createCustomErrorClass("AccountAwaitingSendPendingOperations");
const AmountRequired = createCustomErrorClass("AmountRequired");
const BluetoothRequired = createCustomErrorClass("BluetoothRequired");
const BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
const CantOpenDevice = createCustomErrorClass("CantOpenDevice");
const CashAddrNotSupported = createCustomErrorClass("CashAddrNotSupported");
const ClaimRewardsFeesWarning = createCustomErrorClass("ClaimRewardsFeesWarning");
const CurrencyNotSupported = createCustomErrorClass("CurrencyNotSupported");
const DeviceAppVerifyNotSupported = createCustomErrorClass("DeviceAppVerifyNotSupported");
const DeviceGenuineSocketEarlyClose = createCustomErrorClass("DeviceGenuineSocketEarlyClose");
const DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
const DeviceOnDashboardExpected = createCustomErrorClass("DeviceOnDashboardExpected");
const DeviceOnDashboardUnexpected = createCustomErrorClass("DeviceOnDashboardUnexpected");
const DeviceInOSUExpected = createCustomErrorClass("DeviceInOSUExpected");
const DeviceHalted = createCustomErrorClass("DeviceHalted");
const DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
const DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
const DeviceSocketNoBulkStatus = createCustomErrorClass("DeviceSocketNoBulkStatus");
const DeviceNeedsRestart = createCustomErrorClass("DeviceSocketNoBulkStatus");
const UnresponsiveDeviceError = createCustomErrorClass("UnresponsiveDeviceError");
const DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
const DisconnectedDeviceDuringOperation = createCustomErrorClass("DisconnectedDeviceDuringOperation");
const DeviceExtractOnboardingStateError = createCustomErrorClass("DeviceExtractOnboardingStateError");
const DeviceOnboardingStatePollingError = createCustomErrorClass("DeviceOnboardingStatePollingError");
const EnpointConfigError = createCustomErrorClass("EnpointConfig");
const EthAppPleaseEnableContractData = createCustomErrorClass("EthAppPleaseEnableContractData");
const SolAppPleaseEnableContractData = createCustomErrorClass("SolAppPleaseEnableContractData");
const CeloAppPleaseEnableContractData = createCustomErrorClass("CeloAppPleaseEnableContractData");
const FeeEstimationFailed = createCustomErrorClass("FeeEstimationFailed");
const FirmwareNotRecognized = createCustomErrorClass("FirmwareNotRecognized");
const HardResetFail = createCustomErrorClass("HardResetFail");
const InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
const InvalidAddress = createCustomErrorClass("InvalidAddress");
const InvalidNonce = createCustomErrorClass("InvalidNonce");
const InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass("InvalidAddressBecauseDestinationIsAlsoSource");
const LatestMCUInstalledError = createCustomErrorClass("LatestMCUInstalledError");
const LatestFirmwareVersionRequired = createCustomErrorClass("LatestFirmwareVersionRequired");
const UnsupportedFeatureError = createCustomErrorClass("UnsupportedFeatureError");
const NanoSNotSupported = createCustomErrorClass("NanoSNotSupported");
const UnknownMCU = createCustomErrorClass("UnknownMCU");
const LedgerAPIError = createCustomErrorClass("LedgerAPIError");
const LedgerAPIErrorWithMessage = createCustomErrorClass("LedgerAPIErrorWithMessage");
const LedgerAPINotAvailable = createCustomErrorClass("LedgerAPINotAvailable");
const ManagerAppAlreadyInstalledError = createCustomErrorClass("ManagerAppAlreadyInstalled");
const ManagerAppRelyOnBTCError = createCustomErrorClass("ManagerAppRelyOnBTC");
const ManagerAppDepInstallRequired = createCustomErrorClass("ManagerAppDepInstallRequired");
const ManagerAppDepUninstallRequired = createCustomErrorClass("ManagerAppDepUninstallRequired");
const ManagerDeviceLockedError = createCustomErrorClass("ManagerDeviceLocked");
const ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass("ManagerFirmwareNotEnoughSpace");
const ManagerNotEnoughSpaceError = createCustomErrorClass("ManagerNotEnoughSpace");
const ManagerUninstallBTCDep = createCustomErrorClass("ManagerUninstallBTCDep");
const NetworkDown = createCustomErrorClass("NetworkDown");
const NetworkError = createCustomErrorClass("NetworkError");
const NoAddressesFound = createCustomErrorClass("NoAddressesFound");
const NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
const NotEnoughBalanceFees = createCustomErrorClass("NotEnoughBalanceFees");
const NotEnoughBalanceSwap = createCustomErrorClass("NotEnoughBalanceSwap");
const NotEnoughBalanceToDelegate = createCustomErrorClass("NotEnoughBalanceToDelegate");
const UnstakeNotEnoughStakedBalanceLeft = createCustomErrorClass("UnstakeNotEnoughStakedBalanceLeft");
const RestakeNotEnoughStakedBalanceLeft = createCustomErrorClass("RestakeNotEnoughStakedBalanceLeft");
const NotEnoughToRestake = createCustomErrorClass("NotEnoughToRestake");
const NotEnoughToUnstake = createCustomErrorClass("NotEnoughToUnstake");
const NotEnoughBalanceInParentAccount = createCustomErrorClass("NotEnoughBalanceInParentAccount");
const NotEnoughSpendableBalance = createCustomErrorClass("NotEnoughSpendableBalance");
const NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass("NotEnoughBalanceBecauseDestinationNotCreated");
const NotEnoughToStake = createCustomErrorClass("NotEnoughToStake");
const NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
const NotEnoughGas = createCustomErrorClass("NotEnoughGas");
// Error message specifically for the PTX swap flow
const NotEnoughGasSwap = createCustomErrorClass("NotEnoughGasSwap");
const TronEmptyAccount = createCustomErrorClass("TronEmptyAccount");
const MaybeKeepTronAccountAlive = createCustomErrorClass("MaybeKeepTronAccountAlive");
const NotSupportedLegacyAddress = createCustomErrorClass("NotSupportedLegacyAddress");
const GasLessThanEstimate = createCustomErrorClass("GasLessThanEstimate");
const PriorityFeeTooLow = createCustomErrorClass("PriorityFeeTooLow");
const PriorityFeeTooHigh = createCustomErrorClass("PriorityFeeTooHigh");
const PriorityFeeHigherThanMaxFee = createCustomErrorClass("PriorityFeeHigherThanMaxFee");
const MaxFeeTooLow = createCustomErrorClass("MaxFeeTooLow");
const PasswordsDontMatchError = createCustomErrorClass("PasswordsDontMatch");
const PasswordIncorrectError = createCustomErrorClass("PasswordIncorrect");
const RecommendSubAccountsToEmpty = createCustomErrorClass("RecommendSubAccountsToEmpty");
const RecommendUndelegation = createCustomErrorClass("RecommendUndelegation");
const TimeoutTagged = createCustomErrorClass("TimeoutTagged");
const UnexpectedBootloader = createCustomErrorClass("UnexpectedBootloader");
const MCUNotGenuineToDashboard = createCustomErrorClass("MCUNotGenuineToDashboard");
const RecipientRequired = createCustomErrorClass("RecipientRequired");
const UnavailableTezosOriginatedAccountReceive = createCustomErrorClass("UnavailableTezosOriginatedAccountReceive");
const UnavailableTezosOriginatedAccountSend = createCustomErrorClass("UnavailableTezosOriginatedAccountSend");
const UpdateFetchFileFail = createCustomErrorClass("UpdateFetchFileFail");
const UpdateIncorrectHash = createCustomErrorClass("UpdateIncorrectHash");
const UpdateIncorrectSig = createCustomErrorClass("UpdateIncorrectSig");
const UpdateYourApp = createCustomErrorClass("UpdateYourApp");
const UserRefusedDeviceNameChange = createCustomErrorClass("UserRefusedDeviceNameChange");
const UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
const UserRefusedFirmwareUpdate = createCustomErrorClass("UserRefusedFirmwareUpdate");
const UserRefusedAllowManager = createCustomErrorClass("UserRefusedAllowManager");
const UserRefusedOnDevice = createCustomErrorClass("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
const PinNotSet = createCustomErrorClass("PinNotSet");
const ExpertModeRequired = createCustomErrorClass("ExpertModeRequired");
const TransportOpenUserCancelled = createCustomErrorClass("TransportOpenUserCancelled");
const TransportInterfaceNotAvailable = createCustomErrorClass("TransportInterfaceNotAvailable");
const TransportRaceCondition = createCustomErrorClass("TransportRaceCondition");
const TransportWebUSBGestureRequired = createCustomErrorClass("TransportWebUSBGestureRequired");
const TransactionHasBeenValidatedError = createCustomErrorClass("TransactionHasBeenValidatedError");
const TransportExchangeTimeoutError = createCustomErrorClass("TransportExchangeTimeoutError");
const DeviceShouldStayInApp = createCustomErrorClass("DeviceShouldStayInApp");
const WebsocketConnectionError = createCustomErrorClass("WebsocketConnectionError");
const WebsocketConnectionFailed = createCustomErrorClass("WebsocketConnectionFailed");
const WrongDeviceForAccount = createCustomErrorClass("WrongDeviceForAccount");
const WrongDeviceForAccountPayout = createCustomErrorClass("WrongDeviceForAccountPayout");
const MissingSwapPayloadParamaters = createCustomErrorClass("MissingSwapPayloadParamaters");
const WrongDeviceForAccountRefund = createCustomErrorClass("WrongDeviceForAccountRefund");
const WrongAppForCurrency = createCustomErrorClass("WrongAppForCurrency");
const ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
const CantScanQRCode = createCustomErrorClass("CantScanQRCode");
const FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
const FeeNotLoadedSwap = createCustomErrorClass("FeeNotLoadedSwap");
const FeeRequired = createCustomErrorClass("FeeRequired");
const FeeTooHigh = createCustomErrorClass("FeeTooHigh");
const PendingOperation = createCustomErrorClass("PendingOperation");
const SyncError = createCustomErrorClass("SyncError");
const PairingFailed = createCustomErrorClass("PairingFailed");
const PeerRemovedPairing = createCustomErrorClass("PeerRemovedPairing");
const GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
const LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
const LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
const FirmwareOrAppUpdateRequired = createCustomErrorClass("FirmwareOrAppUpdateRequired");
// SpeedUp / Cancel EVM tx
const ReplacementTransactionUnderpriced = createCustomErrorClass("ReplacementTransactionUnderpriced");
// Bitcoin family
const OpReturnDataSizeLimit = createCustomErrorClass("OpReturnSizeLimit");
const DustLimit = createCustomErrorClass("DustLimit");
// Language
const LanguageNotFound = createCustomErrorClass("LanguageNotFound");
// db stuff, no need to translate
const NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
const DBWrongPassword = createCustomErrorClass("DBWrongPassword");
const DBNotReset = createCustomErrorClass("DBNotReset");
const SequenceNumberError = createCustomErrorClass("SequenceNumberError");
const DisabledTransactionBroadcastError = createCustomErrorClass("DisabledTransactionBroadcastError");
/**
 * Type of a Transport error used to represent all equivalent errors coming from all possible implementation of Transport
 */
var HwTransportErrorType;
(function (HwTransportErrorType) {
    HwTransportErrorType["Unknown"] = "Unknown";
    HwTransportErrorType["LocationServicesDisabled"] = "LocationServicesDisabled";
    HwTransportErrorType["LocationServicesUnauthorized"] = "LocationServicesUnauthorized";
    HwTransportErrorType["BluetoothScanStartFailed"] = "BluetoothScanStartFailed";
})(HwTransportErrorType || (HwTransportErrorType = {}));
/**
 * Represents an error coming from the usage of any Transport implementation.
 *
 * Needed to map a specific implementation error into an error that
 * can be managed by any code unaware of the specific Transport implementation
 * that was used.
 */
class HwTransportError extends Error {
    type;
    constructor(type, message) {
        super(message);
        this.name = "HwTransportError";
        this.type = type;
        // Needed as long as we target < ES6
        Object.setPrototypeOf(this, HwTransportError.prototype);
    }
}
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
class TransportError extends Error {
    id;
    constructor(message, id) {
        const name = "TransportError";
        super(message || name);
        this.name = name;
        this.message = message;
        this.stack = new Error(message).stack;
        this.id = id;
    }
}
addCustomErrorDeserializer("TransportError", e => new TransportError(e.message, e.id));
const StatusCodes = {
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    CLA_NOT_SUPPORTED: 0x6e00,
    CODE_BLOCKED: 0x9840,
    CODE_NOT_INITIALIZED: 0x9802,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    CONTRADICTION_INVALIDATION: 0x9810,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    DEVICE_IN_RECOVERY_MODE: 0x662f,
    CUSTOM_IMAGE_EMPTY: 0x662e,
    FILE_ALREADY_EXISTS: 0x6a89,
    FILE_NOT_FOUND: 0x9404,
    GP_AUTH_FAILED: 0x6300,
    HALTED: 0x6faa,
    INCONSISTENT_FILE: 0x9408,
    INCORRECT_DATA: 0x6a80,
    INCORRECT_LENGTH: 0x6700,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    DEVICE_NOT_ONBOARDED: 0x6d07,
    DEVICE_NOT_ONBOARDED_2: 0x6611,
    INVALID_KCV: 0x9485,
    INVALID_OFFSET: 0x9402,
    LICENSING: 0x6f42,
    LOCKED_DEVICE: 0x5515,
    MAX_VALUE_REACHED: 0x9850,
    MEMORY_PROBLEM: 0x9240,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    NO_EF_SELECTED: 0x9400,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    OK: 0x9000,
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    TECHNICAL_PROBLEM: 0x6f00,
    UNKNOWN_APDU: 0x6d02,
    USER_REFUSED_ON_DEVICE: 0x5501,
    NOT_ENOUGH_SPACE: 0x5102,
    APP_NOT_FOUND_OR_INVALID_CONTEXT: 0x5123,
    INVALID_APP_NAME_LENGTH: 0x670a,
    GEN_AES_KEY_FAILED: 0x5419,
    INTERNAL_CRYPTO_OPERATION_FAILED: 0x541a,
    INTERNAL_COMPUTE_AES_CMAC_FAILED: 0x541b,
    ENCRYPT_APP_STORAGE_FAILED: 0x541c,
    INVALID_BACKUP_STATE: 0x6642,
    PIN_NOT_SET: 0x5502,
    INVALID_BACKUP_LENGTH: 0x6733,
    INVALID_RESTORE_STATE: 0x6643,
    INVALID_CHUNK_LENGTH: 0x6734,
    INVALID_BACKUP_HEADER: 0x684a,
    // Not documented:
    TRUSTCHAIN_WRONG_SEED: 0xb007,
};
function getAltStatusMessage(code) {
    switch (code) {
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
        case 0x5515:
            return "Locked device";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
class TransportStatusError extends Error {
    statusCode;
    statusText;
    /**
     * @param statusCode The error status code coming from a Transport implementation
     * @param options containing:
     *  - canBeMappedToChildError: enable the mapping of TransportStatusError to an error extending/inheriting from it
     *  . Ex: LockedDeviceError. Default to true.
     */
    constructor(statusCode, { canBeMappedToChildError = true } = {}) {
        const statusText = Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
        const smsg = getAltStatusMessage(statusCode) || statusText;
        const statusCodeStr = statusCode.toString(16);
        const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
        super(message);
        this.name = "TransportStatusError";
        this.statusCode = statusCode;
        this.statusText = statusText;
        Object.setPrototypeOf(this, TransportStatusError.prototype);
        // Maps to a LockedDeviceError
        if (canBeMappedToChildError && statusCode === StatusCodes.LOCKED_DEVICE) {
            return new LockedDeviceError(message);
        }
    }
}
class LockedDeviceError extends TransportStatusError {
    constructor(message) {
        super(StatusCodes.LOCKED_DEVICE, { canBeMappedToChildError: false });
        if (message) {
            this.message = message;
        }
        this.name = "LockedDeviceError";
        Object.setPrototypeOf(this, LockedDeviceError.prototype);
    }
}
class DeviceMangementKitError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
        Object.setPrototypeOf(this, DeviceMangementKitError.prototype);
    }
}
addCustomErrorDeserializer("TransportStatusError", e => new TransportStatusError(e.statusCode));
//# sourceMappingURL=index.js.map

/***/ },

/***/ 38495
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Ay: () => (/* binding */ Transport)
});

// UNUSED EXPORTS: StatusCodes, TransportError, TransportStatusError, getAltStatusMessage

// EXTERNAL MODULE: external "events"
var external_events_ = __webpack_require__(24434);
var external_events_default = /*#__PURE__*/__webpack_require__.n(external_events_);
// EXTERNAL MODULE: ./node_modules/@ledgerhq/errors/lib-es/index.js + 1 modules
var lib_es = __webpack_require__(24450);
;// ./node_modules/@ledgerhq/logs/lib-es/index.js
let id = 0;
const subscribers = [];
/**
 * Logs something
 *
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
const log = (type, message, data) => {
    const obj = {
        type,
        id: String(++id),
        date: new Date(),
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    dispatch(obj);
};
/**
 * A simple tracer function, only expanding the existing log function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param context Anything representing the context where the log occurred
 */
const trace = ({ type, message, data, context, }) => {
    const obj = {
        type,
        id: String(++id),
        date: new Date(),
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    if (context)
        obj.context = context;
    dispatch(obj);
};
/**
 * A simple tracer class, that can be used to avoid repetition when using the `trace` function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param type A given type (not level) for the current local tracer ("hw", "withDevice", etc.)
 * @param context Anything representing the context where the log occurred
 */
class LocalTracer {
    type;
    context;
    constructor(type, context) {
        this.type = type;
        this.context = context;
    }
    trace(message, data) {
        trace({
            type: this.type,
            message,
            data,
            context: this.context,
        });
    }
    getContext() {
        return this.context;
    }
    setContext(context) {
        this.context = context;
    }
    updateContext(contextToAdd) {
        this.context = { ...this.context, ...contextToAdd };
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    /**
     * Create a new instance of the LocalTracer with an updated `type`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withType(type) {
        return new LocalTracer(type, this.context);
    }
    /**
     * Create a new instance of the LocalTracer with a new `context`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    withContext(context) {
        return new LocalTracer(this.type, context);
    }
    /**
     * Create a new instance of the LocalTracer with an updated `context`,
     * on which an additional context is merged with the existing one.
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withUpdatedContext(contextToAdd) {
        return new LocalTracer(this.type, { ...this.context, ...contextToAdd });
    }
}
/**
 * Adds a subscribers to the emitted logs.
 *
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
const listen = (cb) => {
    subscribers.push(cb);
    return () => {
        const i = subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            subscribers[i] = subscribers[subscribers.length - 1];
            subscribers.pop();
        }
    };
};
function dispatch(log) {
    for (let i = 0; i < subscribers.length; i++) {
        try {
            subscribers[i](log);
        }
        catch (e) {
            console.error(e);
        }
    }
}
if (typeof window !== "undefined") {
    window.__ledgerLogsListen = listen;
}
//# sourceMappingURL=index.js.map
;// ./node_modules/@ledgerhq/hw-transport/lib-es/Transport.js




const DEFAULT_LOG_TYPE = "transport";
/**
 * The Transport class defines a generic interface for communicating with a Ledger hardware wallet.
 * There are different kind of transports based on the technology (channels like U2F, HID, Bluetooth, Webusb) and environment (Node, Web,...).
 * It is an abstract class that needs to be implemented.
 */
class Transport {
    exchangeTimeout = 30000;
    unresponsiveTimeout = 15000;
    deviceModel = null;
    tracer;
    constructor({ context, logType } = {}) {
        this.tracer = new LocalTracer(logType ?? DEFAULT_LOG_TYPE, context);
    }
    /**
     * Check if the transport is supported on the current platform/browser.
     * @returns {Promise<boolean>} A promise that resolves with a boolean indicating support.
     */
    static isSupported;
    /**
     * List all available descriptors for the transport.
     * For a better granularity, checkout `listen()`.
     *
     * @returns {Promise<Array<any>>} A promise that resolves with an array of descriptors.
     * @example
     * TransportFoo.list().then(descriptors => ...)
     */
    static list;
    /**
     * Listen for device events for the transport. The method takes an observer of DescriptorEvent and returns a Subscription.
     * A DescriptorEvent is an object containing a "descriptor" and a "type" field. The "type" field can be "add" or "remove", and the "descriptor" field can be passed to the "open" method.
     * The "listen" method will first emit all currently connected devices and then will emit events as they occur, such as when a USB device is plugged in or a Bluetooth device becomes discoverable.
     * @param {Observer<DescriptorEvent<any>>} observer - An object with "next", "error", and "complete" functions, following the observer pattern.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop listening to descriptors.
     * @example
    const sub = TransportFoo.listen({
    next: e => {
      if (e.type==="add") {
        sub.unsubscribe();
        const transport = await TransportFoo.open(e.descriptor);
        ...
      }
    },
    error: error => {},
    complete: () => {}
    })
     */
    static listen;
    /**
     * Attempt to create a Transport instance with a specific descriptor.
     * @param {any} descriptor - The descriptor to open the transport with.
     * @param {number} timeout - An optional timeout for the transport connection.
     * @param {TraceContext} context Optional tracing/log context
     * @returns {Promise<Transport>} A promise that resolves with a Transport instance.
     * @example
    TransportFoo.open(descriptor).then(transport => ...)
     */
    static open;
    /**
     * Send data to the device using a low level API.
     * It's recommended to use the "send" method for a higher level API.
     * @param {Buffer} apdu - The data to send.
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the exchange after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    exchange(_apdu, { abortTimeoutMs: _abortTimeoutMs } = {}) {
        throw new Error("exchange not implemented");
    }
    /**
     * Send apdus in batch to the device using a low level API.
     * The default implementation is to call exchange for each apdu.
     * @param {Array<Buffer>} apdus - array of apdus to send.
     * @param {Observer<Buffer>} observer - an observer that will receive the response of each apdu.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop sending apdus.
     */
    exchangeBulk(apdus, observer) {
        let unsubscribed = false;
        const unsubscribe = () => {
            unsubscribed = true;
        };
        const main = async () => {
            if (unsubscribed)
                return;
            for (const apdu of apdus) {
                const r = await this.exchange(apdu);
                if (unsubscribed)
                    return;
                const status = r.readUInt16BE(r.length - 2);
                if (status !== lib_es/* StatusCodes */.vi.OK) {
                    throw new lib_es/* TransportStatusError */._3(status);
                }
                observer.next(r);
            }
        };
        main().then(() => !unsubscribed && observer.complete(), e => !unsubscribed && observer.error(e));
        return { unsubscribe };
    }
    /**
     * Set the "scramble key" for the next data exchanges with the device.
     * Each app can have a different scramble key and it is set internally during instantiation.
     * @param {string} key - The scramble key to set.
     * deprecated This method is no longer needed for modern transports and should be migrated away from.
     * no @ before deprecated as it breaks documentationjs on version 14.0.2
     * https://github.com/documentationjs/documentation/issues/1596
     */
    setScrambleKey(_key) { }
    /**
     * Close the connection with the device.
     *
     * Note: for certain transports (hw-transport-node-hid-singleton for ex), once the promise resolved,
     * the transport instance is actually still cached, and the device is disconnected only after a defined timeout.
     * But for the consumer of the Transport, this does not matter and it can consider the transport to be closed.
     *
     * @returns {Promise<void>} A promise that resolves when the transport is closed.
     */
    close() {
        return Promise.resolve();
    }
    _events = new (external_events_default())();
    /**
     * Listen for an event on the transport instance.
     * Transport implementations may have specific events. Common events include:
     * "disconnect" : triggered when the transport is disconnected.
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: Array<any>) => any} cb - The callback function to be invoked when the event occurs.
     */
    on(eventName, cb) {
        this._events.on(eventName, cb);
    }
    /**
     * Stop listening to an event on an instance of transport.
     */
    off(eventName, cb) {
        this._events.removeListener(eventName, cb);
    }
    emit(event, ...args) {
        this._events.emit(event, ...args);
    }
    /**
     * Enable or not logs of the binary exchange
     */
    setDebugMode() {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    }
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    setExchangeTimeout(exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    }
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    }
    /**
     * Send data to the device using the higher level API.
     *
     * @param {number} cla - The instruction class for the command.
     * @param {number} ins - The instruction code for the command.
     * @param {number} p1 - The first parameter for the instruction.
     * @param {number} p2 - The second parameter for the instruction.
     * @param {Buffer} data - The data to be sent. Defaults to an empty buffer.
     * @param {Array<number>} statusList - A list of acceptable status codes for the response. Defaults to [StatusCodes.OK].
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the send after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    send = async (cla, ins, p1, p2, data = Buffer.alloc(0), statusList = [lib_es/* StatusCodes */.vi.OK], { abortTimeoutMs } = {}) => {
        const tracer = this.tracer.withUpdatedContext({ function: "send" });
        if (data.length >= 256) {
            tracer.trace("data.length exceeded 256 bytes limit", { dataLength: data.length });
            throw new lib_es/* TransportError */.wX("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
        }
        const response = await this.exchange(
        // The size of the data is added in 1 byte just before `data`
        Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]), { abortTimeoutMs });
        const sw = response.readUInt16BE(response.length - 2);
        if (!statusList.some(s => s === sw)) {
            throw new lib_es/* TransportStatusError */._3(sw);
        }
        return response;
    };
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    static create(openTimeout = 3000, listenTimeout) {
        return new Promise((resolve, reject) => {
            let found = false;
            const sub = this.listen({
                next: e => {
                    found = true;
                    if (sub)
                        sub.unsubscribe();
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: e => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: () => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    if (!found) {
                        reject(new lib_es/* TransportError */.wX(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                    }
                },
            });
            const listenTimeoutId = listenTimeout
                ? setTimeout(() => {
                    sub.unsubscribe();
                    reject(new lib_es/* TransportError */.wX(this.ErrorMessage_ListenTimeout, "ListenTimeout"));
                }, listenTimeout)
                : null;
        });
    }
    // Blocks other exchange to happen concurrently
    exchangeBusyPromise;
    /**
     * Wrapper to make an exchange "atomic" (blocking any other exchange)
     *
     * It also handles "unresponsiveness" by emitting "unresponsive" and "responsive" events.
     *
     * @param f The exchange job, using the transport to run
     * @returns a Promise resolving with the output of the given job
     */
    async exchangeAtomicImpl(f) {
        const tracer = this.tracer.withUpdatedContext({
            function: "exchangeAtomicImpl",
            unresponsiveTimeout: this.unresponsiveTimeout,
        });
        if (this.exchangeBusyPromise) {
            tracer.trace("Atomic exchange is already busy");
            throw new lib_es/* TransportRaceCondition */.ug("An action was already pending on the Ledger device. Please deny or reconnect.");
        }
        // Sets the atomic guard
        let resolveBusy;
        const busyPromise = new Promise(r => {
            resolveBusy = r;
        });
        this.exchangeBusyPromise = busyPromise;
        // The device unresponsiveness handler
        let unresponsiveReached = false;
        const timeout = setTimeout(() => {
            tracer.trace(`Timeout reached, emitting Transport event "unresponsive"`, {
                unresponsiveTimeout: this.unresponsiveTimeout,
            });
            unresponsiveReached = true;
            this.emit("unresponsive");
        }, this.unresponsiveTimeout);
        try {
            const res = await f();
            if (unresponsiveReached) {
                tracer.trace("Device was unresponsive, emitting responsive");
                this.emit("responsive");
            }
            return res;
        }
        finally {
            tracer.trace("Finalize, clearing busy guard");
            clearTimeout(timeout);
            if (resolveBusy)
                resolveBusy();
            this.exchangeBusyPromise = null;
        }
    }
    decorateAppAPIMethods(self, methods, scrambleKey) {
        for (const methodName of methods) {
            self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
        }
    }
    _appAPIlock = null;
    decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
        return async (...args) => {
            const { _appAPIlock } = this;
            if (_appAPIlock) {
                return Promise.reject(new lib_es/* TransportError */.wX("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"));
            }
            try {
                this._appAPIlock = methodName;
                this.setScrambleKey(scrambleKey);
                return await f.apply(ctx, args);
            }
            finally {
                this._appAPIlock = null;
            }
        };
    }
    /**
     * Sets the context used by the logging/tracing mechanism
     *
     * Useful when re-using (cached) the same Transport instance,
     * but with a new tracing context.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    setTraceContext(context) {
        this.tracer = this.tracer.withContext(context);
    }
    /**
     * Updates the context used by the logging/tracing mechanism
     *
     * The update only overrides the key-value that are already defined in the current context.
     *
     * @param contextToAdd A TraceContext that will be added to the current context
     */
    updateTraceContext(contextToAdd) {
        this.tracer.updateContext(contextToAdd);
    }
    /**
     * Gets the tracing context of the transport instance
     */
    getTraceContext() {
        return this.tracer.getContext();
    }
    static ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
    static ErrorMessage_NoDeviceFound = "No Ledger device found";
}
//# sourceMappingURL=Transport.js.map

/***/ }

};
;