"use strict";
exports.id = 993;
exports.ids = [993];
exports.modules = {

/***/ 27319
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TonTransport = exports.parseMessage = exports.KNOWN_EXTRA_CURRENCIES = exports.KNOWN_JETTONS = void 0;
const core_1 = __webpack_require__(92911);
const crypto_1 = __webpack_require__(69801);
const teslabot_1 = __webpack_require__(49726);
const ledgerWriter_1 = __webpack_require__(48025);
const getInit_1 = __webpack_require__(11609);
const LEDGER_SYSTEM = 0xB0;
const LEDGER_CLA = 0xe0;
const INS_VERSION = 0x03;
const INS_ADDRESS = 0x05;
const INS_SIGN_TX = 0x06;
const INS_PROOF = 0x08;
const INS_SIGN_DATA = 0x09;
const INS_SETTINGS = 0x0A;
const DEFAULT_SUBWALLET_ID = 698983191;
exports.KNOWN_JETTONS = [
    {
        symbol: 'USDT',
        masterAddress: core_1.Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'),
    },
    {
        symbol: 'NOT',
        masterAddress: core_1.Address.parse('EQAvlWFDxGF2lXm67y4yzC17wYKD9A0guwPkMs1gOsM__NOT'),
    },
    {
        symbol: 'tsTON',
        masterAddress: core_1.Address.parse('EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav'),
    },
    {
        symbol: 'wsTON',
        masterAddress: core_1.Address.parse('EQB0SoxuGDx5qjVt0P_bPICFeWdFLBmVopHhjgfs0q-wsTON'),
    },
    {
        symbol: 'hTON',
        masterAddress: core_1.Address.parse('EQDPdq8xjAhytYqfGSX8KcFWIReCufsB9Wdg0pLlYSO_h76w'),
    },
    {
        symbol: 'stTON',
        masterAddress: core_1.Address.parse('EQDNhy-nxYFgUqzfUzImBEP67JqsyMIcyk2S5_RwNNEYku0k'),
    },
    {
        symbol: 'STAKED',
        masterAddress: core_1.Address.parse('EQCqC6EhRJ_tpWngKxL6dV0k6DSnRUrs9GSVkLbfdCqsj6TE'),
    },
    {
        symbol: 'CATI',
        masterAddress: core_1.Address.parse('EQD-cvR0Nz6XAyRBvbhz-abTrRC6sI5tvHvvpeQraV9UAAD7'),
    },
    {
        symbol: 'DOGS',
        masterAddress: core_1.Address.parse('EQCvxJy4eG8hyHBFsZ7eePxrRsUQSFE_jpptRAYBmcG_DOGS'),
    },
    {
        symbol: 'X',
        masterAddress: core_1.Address.parse('EQB4zZusHsbU2vVTPqjhlokIOoiZhEdCMT703CWEzhTOo__X'),
    },
    {
        symbol: 'tgBTC',
        masterAddress: core_1.Address.parse('EQBmjxpYsJ8yHEraYfTpLdejCekHMoKS2fOErP4lLHCf4SlU'),
    },
];
exports.KNOWN_EXTRA_CURRENCIES = [
    {
        id: 1,
        symbol: 'tgBTC',
        decimals: 8,
    },
];
const dnsWalletKey = Buffer.from([0xe8, 0xd4, 0x40, 0x50, 0x87, 0x3d, 0xba, 0x86, 0x5a, 0xa7, 0xc1, 0x70, 0xab, 0x4c, 0xce, 0x64,
    0xd9, 0x08, 0x39, 0xa3, 0x4d, 0xcf, 0xd6, 0xcf, 0x71, 0xd1, 0x4e, 0x02, 0x05, 0x44, 0x3b, 0x1b]);
function normalizeQueryId(qid) {
    return qid === 0n ? null : qid;
}
function parseMessage(cell, opts) {
    const params = {
        disallowUnsafe: false,
        disallowModification: false,
        encodeJettonBurnEthAddressAsHex: true,
        ...opts,
    };
    if (cell.hash().equals(new core_1.Cell().hash())) {
        return undefined;
    }
    let s = cell.beginParse();
    try {
        const op = s.loadUint(32);
        switch (op) {
            case 0: {
                const str = s.loadStringTail();
                s.endParse();
                if (str.length > 120) {
                    throw new Error('Comment must be at most 120 ASCII characters long');
                }
                for (const c of str) {
                    if (c.charCodeAt(0) < 0x20 || c.charCodeAt(0) >= 0x7f) {
                        throw new Error('Comment must only contain printable ASCII characters');
                    }
                }
                return {
                    type: 'comment',
                    text: str,
                };
            }
            case 0x0f8a7ea5: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const amount = s.loadCoins();
                const destination = s.loadAddress();
                const responseDestination = s.loadAddress();
                const customPayload = s.loadMaybeRef();
                const forwardAmount = s.loadCoins();
                let forwardPayload = null;
                if (s.loadBit()) {
                    forwardPayload = s.loadRef();
                }
                else {
                    const p = s.asCell();
                    s = new core_1.Cell().beginParse(); // clear the slice
                    if (!p.hash().equals(new core_1.Cell().hash())) {
                        if (params.disallowModification) {
                            throw new Error('Jetton transfer message would be modified');
                        }
                        forwardPayload = p;
                    }
                }
                s.endParse();
                return {
                    type: 'jetton-transfer',
                    queryId,
                    amount,
                    destination,
                    responseDestination,
                    customPayload,
                    forwardAmount,
                    forwardPayload,
                    knownJetton: null,
                };
            }
            case 0x5fcc3d14: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const newOwner = s.loadAddress();
                const responseDestination = s.loadAddress();
                const customPayload = s.loadMaybeRef();
                const forwardAmount = s.loadCoins();
                let forwardPayload = null;
                if (s.loadBit()) {
                    forwardPayload = s.loadRef();
                }
                else {
                    const p = s.asCell();
                    s = new core_1.Cell().beginParse(); // clear the slice
                    if (!p.hash().equals(new core_1.Cell().hash())) {
                        if (params.disallowModification) {
                            throw new Error('Jetton transfer message would be modified');
                        }
                        forwardPayload = p;
                    }
                }
                s.endParse();
                return {
                    type: 'nft-transfer',
                    queryId,
                    newOwner,
                    responseDestination,
                    customPayload,
                    forwardAmount,
                    forwardPayload,
                };
            }
            case 0x595f07bc: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const amount = s.loadCoins();
                const responseDestination = s.loadAddress();
                let customPayload = s.loadMaybeRef();
                s.endParse();
                if (params.encodeJettonBurnEthAddressAsHex && customPayload !== null && customPayload.bits.length === 160 && customPayload.refs.length === 0) {
                    const cs = customPayload.beginParse();
                    customPayload = cs.loadBuffer(20);
                    cs.endParse();
                }
                return {
                    type: 'jetton-burn',
                    queryId,
                    amount,
                    responseDestination,
                    customPayload,
                };
            }
            case 0x7258a69b: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const address = s.loadAddress();
                s.endParse();
                return {
                    type: 'add-whitelist',
                    queryId,
                    address,
                };
            }
            case 0x1000: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const amount = s.loadCoins();
                s.endParse();
                return {
                    type: 'single-nominator-withdraw',
                    queryId,
                    amount,
                };
            }
            case 0x1001: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const address = s.loadAddress();
                s.endParse();
                return {
                    type: 'single-nominator-change-validator',
                    queryId,
                    address,
                };
            }
            case 0x47d54391: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                let appId = null;
                if (s.remainingBits > 0) {
                    appId = s.loadUintBig(64);
                }
                s.endParse();
                return {
                    type: 'tonstakers-deposit',
                    queryId,
                    appId,
                };
            }
            case 0x69fb306c: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const votingAddress = s.loadAddress();
                const expirationDate = s.loadUint(48);
                const vote = s.loadBit();
                const needConfirmation = s.loadBit();
                s.endParse();
                return {
                    type: 'vote-for-proposal',
                    queryId,
                    votingAddress,
                    expirationDate,
                    vote,
                    needConfirmation,
                };
            }
            case 0x4eb1f0f9: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const key = s.loadBuffer(32);
                if (key.equals(dnsWalletKey)) {
                    if (s.remainingRefs > 0) {
                        const vs = s.loadRef().beginParse();
                        if (s.remainingBits > 0 && !params.disallowModification) {
                            // tolerate the Maybe bit
                            if (!s.loadBit())
                                throw new Error('Incorrect change DNS record message');
                        }
                        s.endParse();
                        const type = vs.loadUint(16);
                        if (type !== 0x9fd3) {
                            throw new Error('Wrong DNS record type');
                        }
                        const address = vs.loadAddress();
                        const flags = vs.loadUint(8);
                        if (flags > 1) {
                            throw new Error('DNS wallet record must have flags 0 or 1');
                        }
                        let capabilities = (flags & 1) > 0 ? { isWallet: false } : null;
                        if (capabilities !== null) {
                            while (vs.loadBit()) {
                                const cap = vs.loadUint(16);
                                if (cap === 0x2177) {
                                    if (capabilities.isWallet && params.disallowModification) {
                                        throw new Error('DNS change record message would be modified');
                                    }
                                    capabilities.isWallet = true;
                                }
                                else {
                                    throw new Error('Unknown DNS wallet record capability');
                                }
                            }
                        }
                        return {
                            type: 'change-dns-record',
                            queryId,
                            record: {
                                type: 'wallet',
                                value: {
                                    address,
                                    capabilities,
                                },
                            },
                        };
                    }
                    else {
                        if (s.remainingBits > 0 && !params.disallowModification) {
                            // tolerate the Maybe bit
                            if (s.loadBit())
                                throw new Error('Incorrect change DNS record message');
                        }
                        s.endParse();
                        return {
                            type: 'change-dns-record',
                            queryId,
                            record: {
                                type: 'wallet',
                                value: null,
                            },
                        };
                    }
                }
                else {
                    if (s.remainingRefs > 0) {
                        const value = s.loadRef();
                        if (s.remainingBits > 0 && !params.disallowModification) {
                            // tolerate the Maybe bit
                            if (!s.loadBit())
                                throw new Error('Incorrect change DNS record message');
                        }
                        s.endParse();
                        return {
                            type: 'change-dns-record',
                            queryId,
                            record: {
                                type: 'unknown',
                                key,
                                value,
                            },
                        };
                    }
                    else {
                        if (s.remainingBits > 0 && !params.disallowModification) {
                            // tolerate the Maybe bit
                            if (s.loadBit())
                                throw new Error('Incorrect change DNS record message');
                        }
                        s.endParse();
                        return {
                            type: 'change-dns-record',
                            queryId,
                            record: {
                                type: 'unknown',
                                key,
                                value: null,
                            },
                        };
                    }
                }
            }
            case 0x8: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const swapId = s.loadBuffer(32);
                s.endParse();
                return {
                    type: 'token-bridge-pay-swap',
                    queryId,
                    swapId,
                };
            }
            case 0x7bcd1fef: {
                const queryId = s.loadUintBig(64);
                if (queryId <= 0n) {
                    throw new Error('Incorrect query id: must be greater than 0');
                }
                const gasLimit = s.loadCoins();
                s.endParse();
                return {
                    type: 'tonwhales-pool-deposit',
                    queryId,
                    gasLimit,
                };
            }
            case 0xda803efd: {
                const queryId = s.loadUintBig(64);
                if (queryId <= 0n) {
                    throw new Error('Incorrect query id: must be greater than 0');
                }
                const gasLimit = s.loadCoins();
                const amount = s.loadCoins();
                s.endParse();
                return {
                    type: 'tonwhales-pool-withdraw',
                    queryId,
                    gasLimit,
                    amount,
                };
            }
            case 0xa7733acd: {
                const queryId = normalizeQueryId(s.loadUintBig(64));
                const sendMode = s.loadUint(8);
                const msgRefSlice = s.loadRef().beginParse();
                s.endParse();
                const msg = (0, core_1.loadMessageRelaxed)(msgRefSlice);
                if (msg.info.type !== 'internal') {
                    throw new Error('Message is not internal');
                }
                const body = msg.body.beginParse();
                const op = body.loadUint(32);
                if (op !== 0) {
                    throw new Error('Message body is not a comment');
                }
                const text = body.loadStringTail();
                if (text.length > 120) {
                    throw new Error('Comment must be at most 120 ASCII characters long');
                }
                body.endParse();
                return {
                    type: 'vesting-send-msg-comment',
                    queryId,
                    sendMode,
                    value: msg.info.value.coins,
                    destination: msg.info.dest,
                    text,
                };
            }
        }
        throw new Error('Unknown op: ' + op);
    }
    catch (e) {
        if (params.disallowUnsafe) {
            throw e;
        }
    }
    return {
        type: 'unsafe',
        message: cell,
    };
}
exports.parseMessage = parseMessage;
function chunks(buf, n) {
    const nc = Math.ceil(buf.length / n);
    const cs = [];
    for (let i = 0; i < nc; i++) {
        cs.push(buf.subarray(i * n, (i + 1) * n));
    }
    return cs;
}
function processAddressFlags(opts) {
    const bounceable = opts?.bounceable ?? true;
    const testOnly = opts?.testOnly ?? false;
    const chain = opts?.chain ?? 0;
    const subwalletId = opts?.subwalletId ?? 698983191;
    const walletVersion = opts?.walletVersion ?? 'v4';
    let specifiers = undefined;
    let flags = 0x00;
    if (testOnly) {
        flags |= 0x01;
    }
    if (chain === -1) {
        flags |= 0x02;
    }
    if (subwalletId !== 698983191 || walletVersion !== 'v4') {
        flags |= 0x04;
        specifiers = {
            subwalletId,
            isV3R2: walletVersion === 'v3r2',
        };
    }
    return { bounceable, testOnly, chain, flags, specifiers };
}
function convertPayload(input) {
    let payload = null;
    let hints = Buffer.concat([(0, ledgerWriter_1.writeUint8)(0)]);
    if (input === undefined) {
        return {
            payload,
            hints,
        };
    }
    switch (input.type) {
        case 'unsafe': {
            payload = input.message;
            break;
        }
        case 'comment': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x00),
                (0, ledgerWriter_1.writeUint16)(Buffer.from(input.text).length),
                Buffer.from(input.text)
            ]);
            payload = (0, core_1.beginCell)()
                .storeUint(0, 32)
                .storeBuffer(Buffer.from(input.text))
                .endCell();
            break;
        }
        case 'jetton-transfer':
        case 'nft-transfer': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(input.type === 'jetton-transfer' ? 0x01 : 0x02)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(input.type === 'jetton-transfer' ? 0x0f8a7ea5 : 0x5fcc3d14, 32);
            let d = Buffer.alloc(0);
            let flags = 0;
            if (input.queryId !== null) {
                flags |= 1;
            }
            if (input.type === 'jetton-transfer' && input.knownJetton !== null) {
                flags |= 2;
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(flags)]);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                b = b.storeUint(0, 64);
            }
            if (input.type === 'jetton-transfer') {
                if (input.knownJetton !== null) {
                    d = Buffer.concat([d, (0, ledgerWriter_1.writeUint16)(input.knownJetton.jettonId), (0, ledgerWriter_1.writeUint8)(input.knownJetton.workchain)]);
                }
                d = Buffer.concat([d, (0, ledgerWriter_1.writeVarUInt)(input.amount)]);
                b = b.storeCoins(input.amount);
                d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.destination)]);
                b = b.storeAddress(input.destination);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.newOwner)]);
                b = b.storeAddress(input.newOwner);
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.responseDestination)]);
            b = b.storeAddress(input.responseDestination);
            if (input.customPayload !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeCellRef)(input.customPayload)]);
                b = b.storeMaybeRef(input.customPayload);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeMaybeRef(input.customPayload);
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeVarUInt)(input.forwardAmount)]);
            b = b.storeCoins(input.forwardAmount);
            if (input.forwardPayload !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeCellRef)(input.forwardPayload)]);
                b = b.storeMaybeRef(input.forwardPayload);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeMaybeRef(input.forwardPayload);
            }
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'jetton-burn': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x03)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(0x595f07bc, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeVarUInt)(input.amount)]);
            b = b.storeCoins(input.amount);
            d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.responseDestination)]);
            b = b.storeAddress(input.responseDestination);
            if (input.customPayload === null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeMaybeRef(input.customPayload);
            }
            else if (input.customPayload instanceof core_1.Cell) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeCellRef)(input.customPayload)]);
                b = b.storeMaybeRef(input.customPayload);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(2), (0, ledgerWriter_1.writeCellInline)(input.customPayload)]);
                b = b.storeMaybeRef((0, core_1.beginCell)().storeBuffer(input.customPayload).endCell());
            }
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'add-whitelist':
        case 'single-nominator-change-validator': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(input.type === 'add-whitelist' ? 0x04 : 0x06)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(input.type === 'add-whitelist' ? 0x7258a69b : 0x1001, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.address)]);
            b = b.storeAddress(input.address);
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'single-nominator-withdraw': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x05)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(0x1000, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeVarUInt)(input.amount)]);
            b = b.storeCoins(input.amount);
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'tonstakers-deposit': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x07)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(0x47d54391, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            if (input.appId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.appId)]);
                b = b.storeUint(input.appId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
            }
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'vote-for-proposal': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x08)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(0x69fb306c, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.votingAddress)]);
            b = b.storeAddress(input.votingAddress);
            d = Buffer.concat([d, (0, ledgerWriter_1.writeUint48)(input.expirationDate)]);
            b = b.storeUint(input.expirationDate, 48);
            d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(input.vote ? 1 : 0), (0, ledgerWriter_1.writeUint8)(input.needConfirmation ? 1 : 0)]);
            b = b.storeBit(input.vote).storeBit(input.needConfirmation);
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'change-dns-record': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x09)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(0x4eb1f0f9, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            if (input.record.type === 'unknown' && input.record.key.length !== 32) {
                throw new Error('DNS record key length must be 32 bytes long');
            }
            b = b.storeBuffer(input.record.type === 'wallet' ? (0, crypto_1.sha256_sync)('wallet') : input.record.key);
            d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(input.record.value === null ? 0 : 1), (0, ledgerWriter_1.writeUint8)(input.record.type === 'wallet' ? 0 : 1)]);
            if (input.record.type === 'wallet') {
                if (input.record.value !== null) {
                    d = Buffer.concat([d, (0, ledgerWriter_1.writeAddress)(input.record.value.address), (0, ledgerWriter_1.writeUint8)(input.record.value.capabilities === null ? 0 : 1)]);
                    let rb = (0, core_1.beginCell)().storeUint(0x9fd3, 16).storeAddress(input.record.value.address).storeUint(input.record.value.capabilities === null ? 0 : 1, 8);
                    if (input.record.value.capabilities !== null) {
                        d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(input.record.value.capabilities.isWallet ? 1 : 0)]);
                        if (input.record.value.capabilities.isWallet) {
                            rb = rb.storeBit(true).storeUint(0x2177, 16);
                        }
                        rb = rb.storeBit(false);
                    }
                    b = b.storeRef(rb);
                }
            }
            else {
                d = Buffer.concat([d, input.record.key]);
                if (input.record.value !== null) {
                    d = Buffer.concat([d, (0, ledgerWriter_1.writeCellRef)(input.record.value)]);
                    b = b.storeRef(input.record.value);
                }
            }
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'token-bridge-pay-swap': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x0A)
            ]);
            let b = (0, core_1.beginCell)()
                .storeUint(8, 32);
            let d = Buffer.alloc(0);
            if (input.queryId !== null) {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
                b = b.storeUint(input.queryId, 64);
            }
            else {
                d = Buffer.concat([d, (0, ledgerWriter_1.writeUint8)(0)]);
                b = b.storeUint(0, 64);
            }
            if (input.swapId.length !== 32) {
                throw new Error('Token bridge swap ID must be 32 bytes long');
            }
            d = Buffer.concat([d, input.swapId]);
            b = b.storeBuffer(input.swapId);
            payload = b.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(d.length),
                d
            ]);
            break;
        }
        case 'tonwhales-pool-deposit': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x0B)
            ]);
            const cell = (0, core_1.beginCell)()
                .storeUint(0x7bcd1fef, 32)
                .storeUint(input.queryId, 64)
                .storeCoins(input.gasLimit)
                .endCell();
            const buffer = Buffer.concat([
                (0, ledgerWriter_1.writeUint64)(input.queryId),
                (0, ledgerWriter_1.writeVarUInt)(input.gasLimit)
            ]);
            payload = cell;
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(buffer.length),
                buffer
            ]);
            break;
        }
        case 'tonwhales-pool-withdraw': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x0C)
            ]);
            const cell = (0, core_1.beginCell)()
                .storeUint(0xda803efd, 32)
                .storeUint(input.queryId, 64)
                .storeCoins(input.gasLimit)
                .storeCoins(input.amount)
                .endCell();
            const buffer = Buffer.concat([
                (0, ledgerWriter_1.writeUint64)(input.queryId),
                (0, ledgerWriter_1.writeVarUInt)(input.gasLimit),
                (0, ledgerWriter_1.writeVarUInt)(input.amount)
            ]);
            payload = cell;
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(buffer.length),
                buffer
            ]);
            break;
        }
        case 'vesting-send-msg-comment': {
            hints = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint32)(0x0D)
            ]);
            let builder = (0, core_1.beginCell)()
                .storeUint(0xa7733acd, 32);
            let buffer = Buffer.alloc(0);
            if (input.queryId !== null) {
                builder = builder.storeUint(input.queryId, 64);
                buffer = Buffer.concat([buffer, (0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint64)(input.queryId)]);
            }
            else {
                builder = builder.storeUint(0, 64);
                buffer = Buffer.concat([buffer, (0, ledgerWriter_1.writeUint8)(0)]);
            }
            builder = builder.storeUint(input.sendMode, 8);
            buffer = Buffer.concat([buffer, (0, ledgerWriter_1.writeUint8)(input.sendMode)]);
            const msg = (0, core_1.internal)({
                to: input.destination,
                value: input.value,
                body: (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(input.text).endCell(),
            });
            const msgRefBuilder = (0, core_1.beginCell)();
            (0, core_1.storeMessageRelaxed)(msg)(msgRefBuilder);
            builder = builder.storeRef(msgRefBuilder.endCell());
            buffer = Buffer.concat([buffer, (0, ledgerWriter_1.writeAddress)(input.destination)]);
            buffer = Buffer.concat([buffer, (0, ledgerWriter_1.writeVarUInt)(input.value)]);
            if (input.text.length > 120) {
                throw new Error('Comment must be at most 120 ASCII characters long');
            }
            buffer = Buffer.concat([buffer, (0, ledgerWriter_1.writeUint8)(Buffer.from(input.text).length), Buffer.from(input.text)]);
            payload = builder.endCell();
            hints = Buffer.concat([
                hints,
                (0, ledgerWriter_1.writeUint16)(buffer.length),
                buffer
            ]);
            break;
        }
        default: {
            throw new Error('Unknown payload type: ' + input.type);
        }
    }
    return {
        payload,
        hints,
    };
}
class TonTransport {
    transport;
    #lock = new teslabot_1.AsyncLock();
    constructor(transport) {
        this.transport = transport;
    }
    //
    // Apps
    //
    async #getCurrentApp() {
        return this.#lock.inLock(async () => {
            let r = await this.transport.send(LEDGER_SYSTEM, 0x01, 0x00, 0x00, undefined, [0x9000]);
            let data = r.slice(0, r.length - 2);
            if (data[0] !== 0x01) {
                throw Error('Invalid response');
            }
            let nameLength = data[1];
            let name = data.slice(2, 2 + nameLength).toString();
            let versionLength = data[2 + nameLength];
            let version = data.slice(3 + nameLength, 3 + nameLength + versionLength).toString();
            return { name, version };
        });
    }
    async isAppOpen() {
        return (await this.#getCurrentApp()).name === 'TON';
    }
    async getVersion() {
        let loaded = await this.#doRequest(INS_VERSION, 0x00, 0x00, Buffer.alloc(0));
        const [major, minor, patch] = loaded;
        return `${major}.${minor}.${patch}`;
    }
    //
    // Operations
    //
    async getAddress(path, opts) {
        // Check path
        validatePath(path);
        // Resolve flags
        const { bounceable, testOnly, chain, specifiers } = processAddressFlags(opts);
        // Get public key
        let response = await this.#doRequest(INS_ADDRESS, 0x00, 0x00, pathElementsToBuffer(path.map((v) => v + 0x80000000)));
        if (response.length !== 32) {
            throw Error('Invalid response');
        }
        // Contract
        const contract = (0, getInit_1.getInit)(response, specifiers?.subwalletId ?? 698983191, specifiers?.isV3R2 ?? false);
        const address = (0, core_1.contractAddress)(chain, contract);
        return { address: address.toString({ bounceable, testOnly }), publicKey: response };
    }
    async validateAddress(path, opts) {
        // Check path
        validatePath(path);
        // Resolve flags
        const { bounceable, testOnly, chain, flags, specifiers } = processAddressFlags(opts);
        let r = pathElementsToBuffer(path.map((v) => v + 0x80000000));
        if (specifiers !== undefined) {
            r = Buffer.concat([r, (0, ledgerWriter_1.writeUint8)(specifiers.isV3R2 ? 1 : 0), (0, ledgerWriter_1.writeUint32)(specifiers.subwalletId)]);
        }
        // Get public key
        let response = await this.#doRequest(INS_ADDRESS, 0x01, flags, r);
        if (response.length !== 32) {
            throw Error('Invalid response');
        }
        // Contract
        const contract = (0, getInit_1.getInit)(response, specifiers?.subwalletId ?? 698983191, specifiers?.isV3R2 ?? false);
        const address = (0, core_1.contractAddress)(chain, contract);
        return { address: address.toString({ bounceable, testOnly }), publicKey: response };
    }
    async getAddressProof(path, params, opts) {
        // Check path
        validatePath(path);
        let publicKey = (await this.getAddress(path)).publicKey;
        // Resolve flags
        const { flags, specifiers } = processAddressFlags(opts);
        let specifiersBuf = Buffer.alloc(0);
        if (specifiers !== undefined) {
            specifiersBuf = Buffer.concat([(0, ledgerWriter_1.writeUint8)(specifiers.isV3R2 ? 1 : 0), (0, ledgerWriter_1.writeUint32)(specifiers.subwalletId)]);
        }
        const domainBuf = Buffer.from(params.domain, 'utf-8');
        const reqBuf = Buffer.concat([
            pathElementsToBuffer(path.map((v) => v + 0x80000000)),
            specifiersBuf,
            (0, ledgerWriter_1.writeUint8)(domainBuf.length),
            domainBuf,
            (0, ledgerWriter_1.writeUint64)(BigInt(params.timestamp)),
            params.payload,
        ]);
        // Get public key
        let res = await this.#doRequest(INS_PROOF, 0x01, flags, reqBuf);
        let signature = res.slice(1, 1 + 64);
        let hash = res.slice(2 + 64, 2 + 64 + 32);
        if (!(0, crypto_1.signVerify)(hash, signature, publicKey)) {
            throw Error('Received signature is invalid');
        }
        return { signature, hash };
    }
    async signData(path, req, opts) {
        validatePath(path);
        const publicKey = (await this.getAddress(path)).publicKey;
        const timestamp = opts?.timestamp ?? Math.floor(Date.now() / 1000);
        let schema;
        let data;
        let cell;
        switch (req.type) {
            case 'plaintext': {
                schema = 0x754bf91b;
                data = Buffer.from(req.text, 'ascii');
                cell = (0, core_1.beginCell)().storeStringTail(req.text).endCell();
                break;
            }
            case 'app-data': {
                if (req.address === undefined && req.domain === undefined) {
                    throw new Error('At least one of `address` and `domain` must be set when using \'app-data\' request');
                }
                schema = 0x54b58535;
                let b = (0, core_1.beginCell)();
                let dp = [];
                if (req.address !== undefined) {
                    b.storeBit(1);
                    b.storeAddress(req.address);
                    dp.push((0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeAddress)(req.address));
                }
                else {
                    b.storeBit(0);
                    dp.push((0, ledgerWriter_1.writeUint8)(0));
                }
                if (req.domain !== undefined) {
                    b.storeBit(1);
                    let inner = (0, core_1.beginCell)();
                    req.domain.split('.').reverse().forEach(p => {
                        inner.storeBuffer(Buffer.from(p, 'ascii'));
                        inner.storeUint(0, 8);
                    });
                    b.storeRef(inner);
                    const db = Buffer.from(req.domain, 'ascii');
                    dp.push((0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeUint8)(db.length), db);
                }
                else {
                    b.storeBit(0);
                    dp.push((0, ledgerWriter_1.writeUint8)(0));
                }
                b.storeRef(req.data);
                dp.push((0, ledgerWriter_1.writeCellRef)(req.data));
                if (req.ext !== undefined) {
                    b.storeBit(1);
                    b.storeRef(req.ext);
                    dp.push((0, ledgerWriter_1.writeUint8)(1), (0, ledgerWriter_1.writeCellRef)(req.ext));
                }
                else {
                    b.storeBit(0);
                    dp.push((0, ledgerWriter_1.writeUint8)(0));
                }
                data = Buffer.concat(dp);
                cell = b.endCell();
                break;
            }
            default: {
                throw new Error(`Sign data request type '${req.type}' not supported`);
            }
        }
        const commonPart = Buffer.concat([
            (0, ledgerWriter_1.writeUint32)(schema),
            (0, ledgerWriter_1.writeUint64)(BigInt(timestamp)),
        ]);
        const pkg = Buffer.concat([
            commonPart,
            data,
        ]);
        await this.#doRequest(INS_SIGN_DATA, 0x00, 0x03, pathElementsToBuffer(path.map((v) => v + 0x80000000)));
        const pkgCs = chunks(pkg, 255);
        for (let i = 0; i < pkgCs.length - 1; i++) {
            await this.#doRequest(INS_SIGN_DATA, 0x00, 0x02, pkgCs[i]);
        }
        const res = await this.#doRequest(INS_SIGN_DATA, 0x00, 0x00, pkgCs[pkgCs.length - 1]);
        let signature = res.subarray(1, 1 + 64);
        let hash = res.subarray(2 + 64, 2 + 64 + 32);
        if (!hash.equals(cell.hash())) {
            throw Error('Hash mismatch. Expected: ' + cell.hash().toString('hex') + ', got: ' + hash.toString('hex'));
        }
        if (!(0, crypto_1.signVerify)(Buffer.concat([commonPart, hash]), signature, publicKey)) {
            throw Error('Received signature is invalid');
        }
        return {
            signature,
            cell,
            timestamp,
        };
    }
    signTransaction = async (path, transaction) => {
        // Check path
        validatePath(path);
        if (transaction.extraCurrency !== undefined && transaction.extraCurrency.index >= exports.KNOWN_EXTRA_CURRENCIES.length) {
            throw Error('Invalid extra currency index');
        }
        //
        // Fetch key
        //
        let publicKey = (await this.getAddress(path)).publicKey;
        //
        // Create package
        //
        const includeWalletOp = transaction.walletSpecifiers?.includeWalletOp ?? true;
        const subwalletId = transaction.walletSpecifiers?.subwalletId ?? DEFAULT_SUBWALLET_ID;
        const useTag1 = transaction.walletSpecifiers !== undefined || transaction.extraCurrency !== undefined;
        let pkg = Buffer.concat([
            (0, ledgerWriter_1.writeUint8)(useTag1 ? 1 : 0), // tag
        ]);
        if (useTag1) {
            let flags = 0;
            if (includeWalletOp) {
                flags |= 1;
            }
            if (transaction.extraCurrency !== undefined) {
                flags |= 2;
            }
            pkg = Buffer.concat([
                pkg,
                (0, ledgerWriter_1.writeUint32)(subwalletId),
                (0, ledgerWriter_1.writeUint8)(flags),
            ]);
        }
        let ecBuf = Buffer.alloc(0);
        if (transaction.extraCurrency !== undefined) {
            ecBuf = Buffer.concat([
                (0, ledgerWriter_1.writeUint8)(transaction.extraCurrency.index),
                (0, ledgerWriter_1.writeVarUInt)(transaction.extraCurrency.amount),
            ]);
        }
        pkg = Buffer.concat([
            pkg,
            (0, ledgerWriter_1.writeUint32)(transaction.seqno),
            (0, ledgerWriter_1.writeUint32)(transaction.timeout),
            (0, ledgerWriter_1.writeVarUInt)(transaction.amount),
            ecBuf,
            (0, ledgerWriter_1.writeAddress)(transaction.to),
            (0, ledgerWriter_1.writeUint8)(transaction.bounce ? 1 : 0),
            (0, ledgerWriter_1.writeUint8)(transaction.sendMode),
        ]);
        //
        // State init
        //
        let stateInit = null;
        if (transaction.stateInit) {
            stateInit = (0, core_1.beginCell)()
                .store((0, core_1.storeStateInit)(transaction.stateInit))
                .endCell();
            pkg = Buffer.concat([
                pkg,
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint16)(stateInit.depth()),
                stateInit.hash()
            ]);
        }
        else {
            pkg = Buffer.concat([
                pkg,
                (0, ledgerWriter_1.writeUint8)(0)
            ]);
        }
        //
        // Payload
        //
        const { payload, hints } = convertPayload(transaction.payload);
        if (payload) {
            pkg = Buffer.concat([
                pkg,
                (0, ledgerWriter_1.writeUint8)(1),
                (0, ledgerWriter_1.writeUint16)(payload.depth()),
                payload.hash(),
                hints
            ]);
        }
        else {
            pkg = Buffer.concat([
                pkg,
                (0, ledgerWriter_1.writeUint8)(0),
                (0, ledgerWriter_1.writeUint8)(0)
            ]);
        }
        //
        // Send package
        //
        await this.#doRequest(INS_SIGN_TX, 0x00, 0x03, pathElementsToBuffer(path.map((v) => v + 0x80000000)));
        const pkgCs = chunks(pkg, 255);
        for (let i = 0; i < pkgCs.length - 1; i++) {
            await this.#doRequest(INS_SIGN_TX, 0x00, 0x02, pkgCs[i]);
        }
        let res = await this.#doRequest(INS_SIGN_TX, 0x00, 0x00, pkgCs[pkgCs.length - 1]);
        //
        // Parse response
        //
        let orderBuilder = (0, core_1.beginCell)()
            .storeBit(0)
            .storeBit(true)
            .storeBit(transaction.bounce)
            .storeBit(false)
            .storeAddress(null)
            .storeAddress(transaction.to)
            .storeCoins(transaction.amount);
        if (transaction.extraCurrency !== undefined) {
            orderBuilder = orderBuilder
                .storeBit(true)
                .storeRef((0, core_1.beginCell)()
                .storeUint(0b10, 2)
                .storeUint(32, 6)
                .storeUint(exports.KNOWN_EXTRA_CURRENCIES[transaction.extraCurrency.index].id, 32)
                .storeVarUint(transaction.extraCurrency.amount, 5));
        }
        else {
            orderBuilder = orderBuilder.storeBit(false);
        }
        orderBuilder = orderBuilder
            .storeCoins(0)
            .storeCoins(0)
            .storeUint(0, 64)
            .storeUint(0, 32);
        // State Init
        if (stateInit) {
            orderBuilder = orderBuilder
                .storeBit(true)
                .storeBit(true) // Always in reference
                .storeRef(stateInit);
        }
        else {
            orderBuilder = orderBuilder
                .storeBit(false);
        }
        // Payload
        if (payload) {
            orderBuilder = orderBuilder
                .storeBit(true) // Always in reference
                .storeRef(payload);
        }
        else {
            orderBuilder = orderBuilder
                .storeBit(false);
        }
        // Transfer message
        let transferB = (0, core_1.beginCell)()
            .storeUint(subwalletId, 32)
            .storeUint(transaction.timeout, 32)
            .storeUint(transaction.seqno, 32);
        if (includeWalletOp) {
            transferB = transferB.storeUint(0, 8);
        }
        let transfer = transferB.storeUint(transaction.sendMode, 8)
            .storeRef(orderBuilder.endCell())
            .endCell();
        // Parse result
        let signature = res.slice(1, 1 + 64);
        let hash = res.slice(2 + 64, 2 + 64 + 32);
        if (!hash.equals(transfer.hash())) {
            throw Error('Hash mismatch. Expected: ' + transfer.hash().toString('hex') + ', got: ' + hash.toString('hex'));
        }
        if (!(0, crypto_1.signVerify)(hash, signature, publicKey)) {
            throw Error('Received signature is invalid');
        }
        // Build a message
        return (0, core_1.beginCell)()
            .storeBuffer(signature)
            .storeSlice(transfer.beginParse())
            .endCell();
    };
    async getSettings() {
        let loaded = await this.#doRequest(INS_SETTINGS, 0x00, 0x00, Buffer.alloc(0));
        return {
            blindSigningEnabled: (loaded[0] & 0x01) > 0,
            expertMode: (loaded[0] & 0x02) > 0,
        };
    }
    #doRequest = async (ins, p1, p2, data) => {
        return this.#lock.inLock(async () => {
            let r = await this.transport.send(LEDGER_CLA, ins, p1, p2, data);
            return r.slice(0, r.length - 2);
        });
    };
}
exports.TonTransport = TonTransport;
//
// Utils
//
function validatePath(path) {
    if (path.length < 6) {
        throw Error('Path is too short');
    }
    if (path[0] !== 44) {
        throw Error('First element of a path must be 44');
    }
    if (path[1] !== 607) {
        throw Error('Second element of a path must be 607');
    }
    for (let p of path) {
        if (p >= 0x80000000) {
            throw Error('All path elements must be under 0x80000000');
        }
    }
}
function pathElementsToBuffer(paths) {
    const buffer = Buffer.alloc(1 + paths.length * 4);
    buffer[0] = paths.length;
    paths.forEach((element, index) => {
        buffer.writeUInt32BE(element, 1 + 4 * index);
    });
    return buffer;
}


/***/ },

/***/ 88993
(__unused_webpack_module, exports, __webpack_require__) {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = exports._t = exports.vY = exports.vs = void 0;
var TonTransport_1 = __webpack_require__(27319);
Object.defineProperty(exports, "vs", ({ enumerable: true, get: function () { return TonTransport_1.TonTransport; } }));
Object.defineProperty(exports, "vY", ({ enumerable: true, get: function () { return TonTransport_1.parseMessage; } }));
Object.defineProperty(exports, "_t", ({ enumerable: true, get: function () { return TonTransport_1.KNOWN_JETTONS; } }));
__webpack_unused_export__ = ({ enumerable: true, get: function () { return TonTransport_1.KNOWN_EXTRA_CURRENCIES; } });


/***/ },

/***/ 11609
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getInit = void 0;
const core_1 = __webpack_require__(92911);
function getInit(publicKey, subwalletId, isV3R2) {
    let data = (0, core_1.beginCell)()
        .storeUint(0, 32) // Seqno
        .storeUint(subwalletId, 32)
        .storeBuffer(publicKey);
    return {
        code: isV3R2 ? core_1.Cell.fromBase64('te6cckEBAQEAcQAA3v8AIN0gggFMl7ohggEznLqxn3Gw7UTQ0x/THzHXC//jBOCk8mCDCNcYINMf0x/TH/gjE7vyY+1E0NMf0x/T/9FRMrryoVFEuvKiBPkBVBBV+RDyo/gAkyDXSpbTB9QC+wDo0QGkyMsfyx/L/8ntVBC9ba0=') : core_1.Cell.fromBase64('te6ccgECFAEAAtQAART/APSkE/S88sgLAQIBIAIDAgFIBAUE+PKDCNcYINMf0x/THwL4I7vyZO1E0NMf0x/T//QE0VFDuvKhUVG68qIF+QFUEGT5EPKj+AAkpMjLH1JAyx9SMMv/UhD0AMntVPgPAdMHIcAAn2xRkyDXSpbTB9QC+wDoMOAhwAHjACHAAuMAAcADkTDjDQOkyMsfEssfy/8QERITAubQAdDTAyFxsJJfBOAi10nBIJJfBOAC0x8hghBwbHVnvSKCEGRzdHK9sJJfBeAD+kAwIPpEAcjKB8v/ydDtRNCBAUDXIfQEMFyBAQj0Cm+hMbOSXwfgBdM/yCWCEHBsdWe6kjgw4w0DghBkc3RyupJfBuMNBgcCASAICQB4AfoA9AQw+CdvIjBQCqEhvvLgUIIQcGx1Z4MesXCAGFAEywUmzxZY+gIZ9ADLaRfLH1Jgyz8gyYBA+wAGAIpQBIEBCPRZMO1E0IEBQNcgyAHPFvQAye1UAXKwjiOCEGRzdHKDHrFwgBhQBcsFUAPPFiP6AhPLassfyz/JgED7AJJfA+ICASAKCwBZvSQrb2omhAgKBrkPoCGEcNQICEekk30pkQzmkD6f+YN4EoAbeBAUiYcVnzGEAgFYDA0AEbjJftRNDXCx+AA9sp37UTQgQFA1yH0BDACyMoHy//J0AGBAQj0Cm+hMYAIBIA4PABmtznaiaEAga5Drhf/AABmvHfaiaEAQa5DrhY/AAG7SB/oA1NQi+QAFyMoHFcv/ydB3dIAYyMsFywIizxZQBfoCFMtrEszMyXP7AMhAFIEBCPRR8qcCAHCBAQjXGPoA0z/IVCBHgQEI9FHyp4IQbm90ZXB0gBjIywXLAlAGzxZQBPoCFMtqEssfyz/Jc/sAAgBsgQEI1xj6ANM/MFIkgQEI9Fnyp4IQZHN0cnB0gBjIywXLAlAFzxZQA/oCE8tqyx8Syz/Jc/sAAAr0AMntVA=='),
        data: isV3R2 ? data.endCell() : data.storeBit(0).endCell(),
    };
}
exports.getInit = getInit;


/***/ },

/***/ 48025
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.writeCellInline = exports.writeCellRef = exports.writeAddress = exports.writeUint8 = exports.writeVarUInt = exports.writeUint64 = exports.writeUint48 = exports.writeUint16 = exports.writeUint32 = void 0;
const core_1 = __webpack_require__(92911);
function writeUint32(value) {
    let b = Buffer.alloc(4);
    b.writeUint32BE(value, 0);
    return b;
}
exports.writeUint32 = writeUint32;
function writeUint16(value) {
    let b = Buffer.alloc(2);
    b.writeUint16BE(value, 0);
    return b;
}
exports.writeUint16 = writeUint16;
function writeUint48(value) {
    let b = Buffer.alloc(6);
    b.writeUint16BE(value >> 32, 0);
    b.writeUint32BE(value & ((1 << 32) - 1), 2);
    return b;
}
exports.writeUint48 = writeUint48;
function writeUint64(value) {
    return (0, core_1.beginCell)().storeUint(value, 64).endCell().beginParse().loadBuffer(8);
}
exports.writeUint64 = writeUint64;
function writeVarUInt(value) {
    const sizeBytes = value === 0n ? 0 : Math.ceil((value.toString(2).length) / 8);
    return (0, core_1.beginCell)().storeUint(sizeBytes, 8).storeUint(value, sizeBytes * 8).endCell().beginParse().loadBuffer(1 + sizeBytes);
}
exports.writeVarUInt = writeVarUInt;
function writeUint8(value) {
    let b = Buffer.alloc(1);
    b[0] = value;
    return b;
}
exports.writeUint8 = writeUint8;
function writeAddress(address) {
    return Buffer.concat([
        writeUint8(address.workChain === -1 ? 0xff : address.workChain),
        address.hash
    ]);
}
exports.writeAddress = writeAddress;
function writeCellRef(ref) {
    return Buffer.concat([
        writeUint16(ref.depth()),
        ref.hash()
    ]);
}
exports.writeCellRef = writeCellRef;
function writeCellInline(bytes) {
    return Buffer.concat([
        writeUint8(bytes.length),
        bytes,
    ]);
}
exports.writeCellInline = writeCellInline;


/***/ },

/***/ 49726
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asyncTimeout = exports.minimumDelay = exports.delay = exports.exponentialBackoffDelay = exports.createBackoff = exports.BoundedConcurrencyPool = exports.UnboundedConcurrencyPool = exports.Queue = exports.SyncValue = exports.InvalidateSync = exports.AsyncLock = exports.createAsyncIterator = void 0;
var createAsyncIterator_1 = __webpack_require__(6059);
Object.defineProperty(exports, "createAsyncIterator", ({ enumerable: true, get: function () { return createAsyncIterator_1.createAsyncIterator; } }));
var AsyncLock_1 = __webpack_require__(72039);
Object.defineProperty(exports, "AsyncLock", ({ enumerable: true, get: function () { return AsyncLock_1.AsyncLock; } }));
var InvalidateSync_1 = __webpack_require__(8328);
Object.defineProperty(exports, "InvalidateSync", ({ enumerable: true, get: function () { return InvalidateSync_1.InvalidateSync; } }));
var SyncValue_1 = __webpack_require__(74984);
Object.defineProperty(exports, "SyncValue", ({ enumerable: true, get: function () { return SyncValue_1.SyncValue; } }));
var Queue_1 = __webpack_require__(56415);
Object.defineProperty(exports, "Queue", ({ enumerable: true, get: function () { return Queue_1.Queue; } }));
var ConcurrencyPool_1 = __webpack_require__(10041);
Object.defineProperty(exports, "UnboundedConcurrencyPool", ({ enumerable: true, get: function () { return ConcurrencyPool_1.UnboundedConcurrencyPool; } }));
Object.defineProperty(exports, "BoundedConcurrencyPool", ({ enumerable: true, get: function () { return ConcurrencyPool_1.BoundedConcurrencyPool; } }));
var backoff_1 = __webpack_require__(70232);
Object.defineProperty(exports, "createBackoff", ({ enumerable: true, get: function () { return backoff_1.createBackoff; } }));
Object.defineProperty(exports, "exponentialBackoffDelay", ({ enumerable: true, get: function () { return backoff_1.exponentialBackoffDelay; } }));
var delay_1 = __webpack_require__(7843);
Object.defineProperty(exports, "delay", ({ enumerable: true, get: function () { return delay_1.delay; } }));
Object.defineProperty(exports, "minimumDelay", ({ enumerable: true, get: function () { return delay_1.minimumDelay; } }));
var asyncTimeout_1 = __webpack_require__(29857);
Object.defineProperty(exports, "asyncTimeout", ({ enumerable: true, get: function () { return asyncTimeout_1.asyncTimeout; } }));
//# sourceMappingURL=index.js.map

/***/ },

/***/ 6059
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAsyncIterator = void 0;
function createAsyncIterator(onExit) {
    let events = [];
    let resolvers = [];
    const getValue = () => {
        return new Promise((resolve => {
            if (events.length > 0) {
                let val = events.shift();
                if (val === null) {
                    resolve({ value: undefined, done: true });
                }
                else {
                    resolve({ value: val, done: false });
                }
            }
            else {
                resolvers.push(resolve);
            }
        }));
    };
    let onReturn = () => {
        events = [];
        resolvers = [];
        onExit();
        return Promise.resolve({ value: undefined, done: true });
    };
    return {
        [Symbol.asyncIterator]() {
            return {
                next() {
                    return getValue();
                },
                return: onReturn,
                throw(error) {
                    return Promise.reject(error);
                }
            };
        },
        push(data) {
            if (resolvers.length > 0) {
                resolvers.shift()({
                    value: data,
                    done: false
                });
            }
            else {
                events.push(data);
            }
        },
        complete() {
            if (resolvers.length > 0) {
                resolvers.shift()({
                    value: null,
                    done: true
                });
            }
            else {
                events.push(null);
            }
        }
    };
}
exports.createAsyncIterator = createAsyncIterator;
//# sourceMappingURL=createAsyncIterator.js.map

/***/ },

/***/ 72039
(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsyncLock = void 0;
class AsyncLock {
    constructor() {
        this.permits = 1;
        this.promiseResolverQueue = [];
    }
    inLock(func) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.lock();
                return yield func();
            }
            finally {
                this.unlock();
            }
        });
    }
    lock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.permits > 0) {
                this.permits = this.permits - 1;
                return;
            }
            yield new Promise(resolve => this.promiseResolverQueue.push(resolve));
        });
    }
    unlock() {
        this.permits += 1;
        if (this.permits > 1 && this.promiseResolverQueue.length > 0) {
            throw new Error('this.permits should never be > 0 when there is someone waiting.');
        }
        else if (this.permits === 1 && this.promiseResolverQueue.length > 0) {
            // If there is someone else waiting, immediately consume the permit that was released
            // at the beginning of this function and let the waiting function resume.
            this.permits -= 1;
            const nextResolver = this.promiseResolverQueue.shift();
            // Resolve on the next tick
            if (nextResolver) {
                setTimeout(() => {
                    nextResolver(true);
                }, 0);
            }
        }
    }
}
exports.AsyncLock = AsyncLock;
//# sourceMappingURL=AsyncLock.js.map

/***/ },

/***/ 10041
(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _BoundedConcurrencyPool_inFlight;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BoundedConcurrencyPool = exports.UnboundedConcurrencyPool = void 0;
exports.UnboundedConcurrencyPool = {
    run: (src) => {
        return src();
    }
};
class BoundedConcurrencyPool {
    constructor(concurrencyFactor) {
        this.pending = [];
        _BoundedConcurrencyPool_inFlight.set(this, 0);
        if (typeof concurrencyFactor === 'number') {
            this.concurrencyFactor = () => concurrencyFactor;
        }
        else {
            this.concurrencyFactor = concurrencyFactor;
        }
    }
    run(src) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (__classPrivateFieldGet(this, _BoundedConcurrencyPool_inFlight, "f") >= this.concurrencyFactor()) {
                yield new Promise((resolve) => this.pending.push(resolve));
            }
            __classPrivateFieldSet(this, _BoundedConcurrencyPool_inFlight, (_a = __classPrivateFieldGet(this, _BoundedConcurrencyPool_inFlight, "f"), _a++, _a), "f");
            try {
                let res = yield src();
                return res;
            }
            finally {
                __classPrivateFieldSet(this, _BoundedConcurrencyPool_inFlight, (_b = __classPrivateFieldGet(this, _BoundedConcurrencyPool_inFlight, "f"), _b--, _b), "f");
                if (this.pending.length > 0) {
                    let p = this.pending[0];
                    this.pending.shift();
                    p();
                }
            }
        });
    }
    get inFlight() {
        return __classPrivateFieldGet(this, _BoundedConcurrencyPool_inFlight, "f");
    }
    get inQueue() {
        return this.pending.length;
    }
}
exports.BoundedConcurrencyPool = BoundedConcurrencyPool;
_BoundedConcurrencyPool_inFlight = new WeakMap();
//# sourceMappingURL=ConcurrencyPool.js.map

/***/ },

/***/ 8328
(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidateSync = void 0;
const backoff_1 = __webpack_require__(70232);
class InvalidateSync {
    constructor(command, opts) {
        this._invalidated = false;
        this._invalidatedDouble = false;
        this._stopped = false;
        this._doSync = () => __awaiter(this, void 0, void 0, function* () {
            yield this._backoff(() => __awaiter(this, void 0, void 0, function* () {
                if (this._stopped) {
                    return;
                }
                yield this._command();
            }));
            if (this._stopped) {
                return;
            }
            if (this._invalidatedDouble) {
                this._invalidatedDouble = false;
                this._doSync();
            }
            else {
                this._invalidated = false;
            }
        });
        this._backoff = opts && opts.backoff ? opts.backoff : (0, backoff_1.createBackoff)();
        this._command = command;
    }
    invalidate() {
        if (this._stopped) {
            return;
        }
        if (!this._invalidated) {
            this._invalidated = true;
            this._invalidatedDouble = false;
            this._doSync();
        }
        if (!this._invalidatedDouble) {
            this._invalidatedDouble = true;
        }
    }
    stop() {
        if (this._stopped) {
            return;
        }
        this._stopped = true;
    }
}
exports.InvalidateSync = InvalidateSync;
//# sourceMappingURL=InvalidateSync.js.map

/***/ },

/***/ 56415
(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Queue = void 0;
class Queue {
    constructor() {
        this.q = [];
        this.awaiters = [];
        this.push = (item) => {
            // If queue is not empty
            if (this.q.length > 0) {
                this.q.push(item);
                return;
            }
            // If queue is empty and there are awaiters
            if (this.awaiters.length > 0) {
                this.awaiters.shift()(item);
                return;
            }
            // No awaiters and not empty queue
            this.q.push(item);
        };
        this.get = () => __awaiter(this, void 0, void 0, function* () {
            if (this.q.length > 0) {
                return this.q.shift();
            }
            return yield new Promise((resolver) => this.awaiters.push(resolver));
        });
        this.getOptional = () => {
            if (this.q.length > 0) {
                return this.q.shift();
            }
            else {
                return null;
            }
        };
    }
    get isEmpty() {
        return this.q.length === 0;
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map

/***/ },

/***/ 74984
(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SyncValue = void 0;
const InvalidateSync_1 = __webpack_require__(8328);
class SyncValue {
    constructor(initial, updater, opts) {
        this._value = initial;
        this._updater = updater;
        this._sync = new InvalidateSync_1.InvalidateSync(() => __awaiter(this, void 0, void 0, function* () {
            yield this._updater(this._value);
        }), opts);
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (!Object.is(v, this._value)) {
            this._value = v;
            this._sync.invalidate();
        }
    }
}
exports.SyncValue = SyncValue;
//# sourceMappingURL=SyncValue.js.map

/***/ },

/***/ 29857
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asyncTimeout = void 0;
function asyncTimeout(src, timeout) {
    return new Promise((resolve, reject) => {
        // Callbacks
        let timer = null;
        function abort(err) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            reject(err);
        }
        function complete(value) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            resolve(value);
        }
        // Timeout
        timer = setTimeout(() => {
            abort(new Error('Request timeout'));
        }, timeout);
        // Source
        src.then(complete);
        src.catch(abort);
    });
}
exports.asyncTimeout = asyncTimeout;
//# sourceMappingURL=asyncTimeout.js.map

/***/ },

/***/ 70232
(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBackoff = exports.exponentialBackoffDelay = void 0;
const delay_1 = __webpack_require__(7843);
function exponentialBackoffDelay(currentFailureCount, minDelay, maxDelay, maxFailureCount) {
    let maxDelayRet = minDelay + ((maxDelay - minDelay) / maxFailureCount) * Math.max(currentFailureCount, maxFailureCount);
    return Math.round(Math.random() * maxDelayRet);
}
exports.exponentialBackoffDelay = exponentialBackoffDelay;
function createBackoff(opts) {
    return (callback) => __awaiter(this, void 0, void 0, function* () {
        let currentFailureCount = 0;
        const minDelay = opts && opts.minDelay !== undefined ? opts.minDelay : 250;
        const maxDelay = opts && opts.maxDelay !== undefined ? opts.maxDelay : 1000;
        const maxFailureCount = opts && opts.maxFailureCount !== undefined ? opts.maxFailureCount : 50;
        while (true) {
            try {
                return yield callback();
            }
            catch (e) {
                if (currentFailureCount < maxFailureCount) {
                    currentFailureCount++;
                }
                if (opts && opts.onError) {
                    opts.onError(e, currentFailureCount);
                }
                let waitForRequest = exponentialBackoffDelay(currentFailureCount, minDelay, maxDelay, maxFailureCount);
                yield (0, delay_1.delay)(waitForRequest);
            }
        }
    });
}
exports.createBackoff = createBackoff;
//# sourceMappingURL=backoff.js.map

/***/ },

/***/ 7843
(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.minimumDelay = exports.delay = void 0;
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
exports.delay = delay;
function minimumDelay(ms, src) {
    return __awaiter(this, void 0, void 0, function* () {
        let start = Date.now();
        let r = yield src;
        let d = ms - (Date.now() - start);
        if (d > 0) {
            yield delay(d);
        }
        return r;
    });
}
exports.minimumDelay = minimumDelay;
//# sourceMappingURL=delay.js.map

/***/ }

};
;