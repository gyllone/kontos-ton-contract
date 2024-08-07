import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Upgrade = {
    $$type: 'Upgrade';
    code: Cell;
}

export function storeUpgrade(src: Upgrade) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1573472578, 32);
        b_0.storeRef(src.code);
    };
}

export function loadUpgrade(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1573472578) { throw Error('Invalid prefix'); }
    let _code = sc_0.loadRef();
    return { $$type: 'Upgrade' as const, code: _code };
}

function loadTupleUpgrade(source: TupleReader) {
    let _code = source.readCell();
    return { $$type: 'Upgrade' as const, code: _code };
}

function storeTupleUpgrade(source: Upgrade) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserUpgrade(): DictionaryValue<Upgrade> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgrade(src)).endCell());
        },
        parse: (src) => {
            return loadUpgrade(src.loadRef().beginParse());
        }
    }
}

export type SetAdminPubkey = {
    $$type: 'SetAdminPubkey';
    pubkey: bigint;
}

export function storeSetAdminPubkey(src: SetAdminPubkey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(179445649, 32);
        b_0.storeUint(src.pubkey, 256);
    };
}

export function loadSetAdminPubkey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 179445649) { throw Error('Invalid prefix'); }
    let _pubkey = sc_0.loadUintBig(256);
    return { $$type: 'SetAdminPubkey' as const, pubkey: _pubkey };
}

function loadTupleSetAdminPubkey(source: TupleReader) {
    let _pubkey = source.readBigNumber();
    return { $$type: 'SetAdminPubkey' as const, pubkey: _pubkey };
}

function storeTupleSetAdminPubkey(source: SetAdminPubkey) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.pubkey);
    return builder.build();
}

function dictValueParserSetAdminPubkey(): DictionaryValue<SetAdminPubkey> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetAdminPubkey(src)).endCell());
        },
        parse: (src) => {
            return loadSetAdminPubkey(src.loadRef().beginParse());
        }
    }
}

export type PrepayAndHandleOpRequest = {
    $$type: 'PrepayAndHandleOpRequest';
    pay_for_jetton: boolean;
    valid_until: bigint;
    storage_index: bigint;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    user_nonce: bigint;
    ton_amount: bigint;
    payload: Cell;
    signature: Cell;
}

export function storePrepayAndHandleOpRequest(src: PrepayAndHandleOpRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(217083520, 32);
        b_0.storeBit(src.pay_for_jetton);
        b_0.storeUint(src.valid_until, 64);
        b_0.storeUint(src.storage_index, 64);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeUint(src.user_nonce, 64);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.payload);
        b_0.storeBuilder(src.signature.asBuilder());
    };
}

export function loadPrepayAndHandleOpRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 217083520) { throw Error('Invalid prefix'); }
    let _pay_for_jetton = sc_0.loadBit();
    let _valid_until = sc_0.loadUintBig(64);
    let _storage_index = sc_0.loadUintBig(64);
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _user_nonce = sc_0.loadUintBig(64);
    let _ton_amount = sc_0.loadCoins();
    let _payload = sc_0.loadRef();
    let _signature = sc_0.asCell();
    return { $$type: 'PrepayAndHandleOpRequest' as const, pay_for_jetton: _pay_for_jetton, valid_until: _valid_until, storage_index: _storage_index, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, payload: _payload, signature: _signature };
}

function loadTuplePrepayAndHandleOpRequest(source: TupleReader) {
    let _pay_for_jetton = source.readBoolean();
    let _valid_until = source.readBigNumber();
    let _storage_index = source.readBigNumber();
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _user_nonce = source.readBigNumber();
    let _ton_amount = source.readBigNumber();
    let _payload = source.readCell();
    let _signature = source.readCell();
    return { $$type: 'PrepayAndHandleOpRequest' as const, pay_for_jetton: _pay_for_jetton, valid_until: _valid_until, storage_index: _storage_index, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, payload: _payload, signature: _signature };
}

function storeTuplePrepayAndHandleOpRequest(source: PrepayAndHandleOpRequest) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.pay_for_jetton);
    builder.writeNumber(source.valid_until);
    builder.writeNumber(source.storage_index);
    builder.writeCell(source.broker_pubkey);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.user_nonce);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.payload);
    builder.writeSlice(source.signature);
    return builder.build();
}

function dictValueParserPrepayAndHandleOpRequest(): DictionaryValue<PrepayAndHandleOpRequest> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePrepayAndHandleOpRequest(src)).endCell());
        },
        parse: (src) => {
            return loadPrepayAndHandleOpRequest(src.loadRef().beginParse());
        }
    }
}

export type PrepayAndHandleOp = {
    $$type: 'PrepayAndHandleOp';
    init_value: bigint;
    executor: Address;
    storage_index: bigint;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    user_nonce: bigint;
    ton_amount: bigint;
    jetton_payload: Cell | null;
    exec_payload: Cell;
}

export function storePrepayAndHandleOp(src: PrepayAndHandleOp) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(100942365, 32);
        b_0.storeCoins(src.init_value);
        b_0.storeAddress(src.executor);
        b_0.storeUint(src.storage_index, 64);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeUint(src.user_nonce, 64);
        b_0.storeCoins(src.ton_amount);
        if (src.jetton_payload !== null && src.jetton_payload !== undefined) { b_0.storeBit(true).storeRef(src.jetton_payload); } else { b_0.storeBit(false); }
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadPrepayAndHandleOp(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 100942365) { throw Error('Invalid prefix'); }
    let _init_value = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _storage_index = sc_0.loadUintBig(64);
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _user_nonce = sc_0.loadUintBig(64);
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _exec_payload = sc_0.asCell();
    return { $$type: 'PrepayAndHandleOp' as const, init_value: _init_value, executor: _executor, storage_index: _storage_index, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTuplePrepayAndHandleOp(source: TupleReader) {
    let _init_value = source.readBigNumber();
    let _executor = source.readAddress();
    let _storage_index = source.readBigNumber();
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _user_nonce = source.readBigNumber();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCellOpt();
    let _exec_payload = source.readCell();
    return { $$type: 'PrepayAndHandleOp' as const, init_value: _init_value, executor: _executor, storage_index: _storage_index, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTuplePrepayAndHandleOp(source: PrepayAndHandleOp) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.init_value);
    builder.writeAddress(source.executor);
    builder.writeNumber(source.storage_index);
    builder.writeCell(source.broker_pubkey);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.user_nonce);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserPrepayAndHandleOp(): DictionaryValue<PrepayAndHandleOp> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePrepayAndHandleOp(src)).endCell());
        },
        parse: (src) => {
            return loadPrepayAndHandleOp(src.loadRef().beginParse());
        }
    }
}

export type HandleKontosProof = {
    $$type: 'HandleKontosProof';
}

export function storeHandleKontosProof(src: HandleKontosProof) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(316013570, 32);
    };
}

export function loadHandleKontosProof(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 316013570) { throw Error('Invalid prefix'); }
    return { $$type: 'HandleKontosProof' as const };
}

function loadTupleHandleKontosProof(source: TupleReader) {
    return { $$type: 'HandleKontosProof' as const };
}

function storeTupleHandleKontosProof(source: HandleKontosProof) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserHandleKontosProof(): DictionaryValue<HandleKontosProof> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeHandleKontosProof(src)).endCell());
        },
        parse: (src) => {
            return loadHandleKontosProof(src.loadRef().beginParse());
        }
    }
}

export type ValidateJettonTransfer = {
    $$type: 'ValidateJettonTransfer';
    refund_fee: bigint;
    executor: Address;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    jetton_wallet: Address;
    exec_payload: Cell;
}

export function storeValidateJettonTransfer(src: ValidateJettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3197193134, 32);
        b_0.storeCoins(src.refund_fee);
        b_0.storeAddress(src.executor);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadValidateJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3197193134) { throw Error('Invalid prefix'); }
    let _refund_fee = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _jetton_wallet = sc_0.loadAddress();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'ValidateJettonTransfer' as const, refund_fee: _refund_fee, executor: _executor, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, jetton_wallet: _jetton_wallet, exec_payload: _exec_payload };
}

function loadTupleValidateJettonTransfer(source: TupleReader) {
    let _refund_fee = source.readBigNumber();
    let _executor = source.readAddress();
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _jetton_wallet = source.readAddress();
    let _exec_payload = source.readCell();
    return { $$type: 'ValidateJettonTransfer' as const, refund_fee: _refund_fee, executor: _executor, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, jetton_wallet: _jetton_wallet, exec_payload: _exec_payload };
}

function storeTupleValidateJettonTransfer(source: ValidateJettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.refund_fee);
    builder.writeAddress(source.executor);
    builder.writeCell(source.broker_pubkey);
    builder.writeCell(source.user_pubkey);
    builder.writeAddress(source.jetton_wallet);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserValidateJettonTransfer(): DictionaryValue<ValidateJettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeValidateJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadValidateJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type UpdateBlockHeaders = {
    $$type: 'UpdateBlockHeaders';
    cashback: Address;
    payload: Cell;
}

export function storeUpdateBlockHeaders(src: UpdateBlockHeaders) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2031003575, 32);
        b_0.storeAddress(src.cashback);
        b_0.storeBuilder(src.payload.asBuilder());
    };
}

export function loadUpdateBlockHeaders(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2031003575) { throw Error('Invalid prefix'); }
    let _cashback = sc_0.loadAddress();
    let _payload = sc_0.asCell();
    return { $$type: 'UpdateBlockHeaders' as const, cashback: _cashback, payload: _payload };
}

function loadTupleUpdateBlockHeaders(source: TupleReader) {
    let _cashback = source.readAddress();
    let _payload = source.readCell();
    return { $$type: 'UpdateBlockHeaders' as const, cashback: _cashback, payload: _payload };
}

function storeTupleUpdateBlockHeaders(source: UpdateBlockHeaders) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.cashback);
    builder.writeSlice(source.payload);
    return builder.build();
}

function dictValueParserUpdateBlockHeaders(): DictionaryValue<UpdateBlockHeaders> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateBlockHeaders(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateBlockHeaders(src.loadRef().beginParse());
        }
    }
}

export type CheckOpHash = {
    $$type: 'CheckOpHash';
    init_value: bigint;
    executor: Address;
    op_hash: bigint;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    user_nonce: bigint;
    ton_amount: bigint;
    jetton_payload: Cell | null;
    exec_payload: Cell;
}

export function storeCheckOpHash(src: CheckOpHash) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3577283849, 32);
        b_0.storeCoins(src.init_value);
        b_0.storeAddress(src.executor);
        b_0.storeUint(src.op_hash, 256);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeUint(src.user_nonce, 64);
        b_0.storeCoins(src.ton_amount);
        if (src.jetton_payload !== null && src.jetton_payload !== undefined) { b_0.storeBit(true).storeRef(src.jetton_payload); } else { b_0.storeBit(false); }
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadCheckOpHash(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3577283849) { throw Error('Invalid prefix'); }
    let _init_value = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _op_hash = sc_0.loadUintBig(256);
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _user_nonce = sc_0.loadUintBig(64);
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _exec_payload = sc_0.asCell();
    return { $$type: 'CheckOpHash' as const, init_value: _init_value, executor: _executor, op_hash: _op_hash, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleCheckOpHash(source: TupleReader) {
    let _init_value = source.readBigNumber();
    let _executor = source.readAddress();
    let _op_hash = source.readBigNumber();
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _user_nonce = source.readBigNumber();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCellOpt();
    let _exec_payload = source.readCell();
    return { $$type: 'CheckOpHash' as const, init_value: _init_value, executor: _executor, op_hash: _op_hash, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleCheckOpHash(source: CheckOpHash) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.init_value);
    builder.writeAddress(source.executor);
    builder.writeNumber(source.op_hash);
    builder.writeCell(source.broker_pubkey);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.user_nonce);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserCheckOpHash(): DictionaryValue<CheckOpHash> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckOpHash(src)).endCell());
        },
        parse: (src) => {
            return loadCheckOpHash(src.loadRef().beginParse());
        }
    }
}

export type PrePay = {
    $$type: 'PrePay';
    init_value: bigint;
    executor: Address;
    user_pubkey: Cell;
    user_nonce: bigint;
    ton_amount: bigint;
    jetton_payload: Cell | null;
    exec_payload: Cell;
}

export function storePrePay(src: PrePay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(930486506, 32);
        b_0.storeCoins(src.init_value);
        b_0.storeAddress(src.executor);
        b_0.storeRef(src.user_pubkey);
        b_0.storeUint(src.user_nonce, 64);
        b_0.storeCoins(src.ton_amount);
        if (src.jetton_payload !== null && src.jetton_payload !== undefined) { b_0.storeBit(true).storeRef(src.jetton_payload); } else { b_0.storeBit(false); }
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadPrePay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 930486506) { throw Error('Invalid prefix'); }
    let _init_value = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _user_pubkey = sc_0.loadRef();
    let _user_nonce = sc_0.loadUintBig(64);
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _exec_payload = sc_0.asCell();
    return { $$type: 'PrePay' as const, init_value: _init_value, executor: _executor, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTuplePrePay(source: TupleReader) {
    let _init_value = source.readBigNumber();
    let _executor = source.readAddress();
    let _user_pubkey = source.readCell();
    let _user_nonce = source.readBigNumber();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCellOpt();
    let _exec_payload = source.readCell();
    return { $$type: 'PrePay' as const, init_value: _init_value, executor: _executor, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTuplePrePay(source: PrePay) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.init_value);
    builder.writeAddress(source.executor);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.user_nonce);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserPrePay(): DictionaryValue<PrePay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePrePay(src)).endCell());
        },
        parse: (src) => {
            return loadPrePay(src.loadRef().beginParse());
        }
    }
}

export type CheckDeployment = {
    $$type: 'CheckDeployment';
    refund_fee: bigint;
    executor: Address;
    user_nonce: bigint;
    broker_pubkey: Cell;
    ton_amount: bigint;
    jetton_payload: Cell;
    exec_payload: Cell;
}

export function storeCheckDeployment(src: CheckDeployment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(337636399, 32);
        b_0.storeCoins(src.refund_fee);
        b_0.storeAddress(src.executor);
        b_0.storeUint(src.user_nonce, 64);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.jetton_payload);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadCheckDeployment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 337636399) { throw Error('Invalid prefix'); }
    let _refund_fee = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _user_nonce = sc_0.loadUintBig(64);
    let _broker_pubkey = sc_0.loadRef();
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'CheckDeployment' as const, refund_fee: _refund_fee, executor: _executor, user_nonce: _user_nonce, broker_pubkey: _broker_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleCheckDeployment(source: TupleReader) {
    let _refund_fee = source.readBigNumber();
    let _executor = source.readAddress();
    let _user_nonce = source.readBigNumber();
    let _broker_pubkey = source.readCell();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'CheckDeployment' as const, refund_fee: _refund_fee, executor: _executor, user_nonce: _user_nonce, broker_pubkey: _broker_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleCheckDeployment(source: CheckDeployment) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.refund_fee);
    builder.writeAddress(source.executor);
    builder.writeNumber(source.user_nonce);
    builder.writeCell(source.broker_pubkey);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserCheckDeployment(): DictionaryValue<CheckDeployment> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckDeployment(src)).endCell());
        },
        parse: (src) => {
            return loadCheckDeployment(src.loadRef().beginParse());
        }
    }
}

export type JettonPrepay = {
    $$type: 'JettonPrepay';
    refund_fee: bigint;
    executor: Address;
    user_pubkey: Cell;
    ton_amount: bigint;
    jetton_payload: Cell;
    exec_payload: Cell;
}

export function storeJettonPrepay(src: JettonPrepay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2496814550, 32);
        b_0.storeCoins(src.refund_fee);
        b_0.storeAddress(src.executor);
        b_0.storeRef(src.user_pubkey);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.jetton_payload);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadJettonPrepay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2496814550) { throw Error('Invalid prefix'); }
    let _refund_fee = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _user_pubkey = sc_0.loadRef();
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'JettonPrepay' as const, refund_fee: _refund_fee, executor: _executor, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleJettonPrepay(source: TupleReader) {
    let _refund_fee = source.readBigNumber();
    let _executor = source.readAddress();
    let _user_pubkey = source.readCell();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'JettonPrepay' as const, refund_fee: _refund_fee, executor: _executor, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleJettonPrepay(source: JettonPrepay) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.refund_fee);
    builder.writeAddress(source.executor);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserJettonPrepay(): DictionaryValue<JettonPrepay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonPrepay(src)).endCell());
        },
        parse: (src) => {
            return loadJettonPrepay(src.loadRef().beginParse());
        }
    }
}

export type Execute = {
    $$type: 'Execute';
    refund_fee: bigint;
    executor: Address;
    user_nonce: bigint | null;
    broker_pubkey: Cell;
    exec_payload: Cell;
}

export function storeExecute(src: Execute) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3238711231, 32);
        b_0.storeCoins(src.refund_fee);
        b_0.storeAddress(src.executor);
        if (src.user_nonce !== null && src.user_nonce !== undefined) { b_0.storeBit(true).storeInt(src.user_nonce, 257); } else { b_0.storeBit(false); }
        b_0.storeRef(src.broker_pubkey);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadExecute(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3238711231) { throw Error('Invalid prefix'); }
    let _refund_fee = sc_0.loadCoins();
    let _executor = sc_0.loadAddress();
    let _user_nonce = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _broker_pubkey = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'Execute' as const, refund_fee: _refund_fee, executor: _executor, user_nonce: _user_nonce, broker_pubkey: _broker_pubkey, exec_payload: _exec_payload };
}

function loadTupleExecute(source: TupleReader) {
    let _refund_fee = source.readBigNumber();
    let _executor = source.readAddress();
    let _user_nonce = source.readBigNumberOpt();
    let _broker_pubkey = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'Execute' as const, refund_fee: _refund_fee, executor: _executor, user_nonce: _user_nonce, broker_pubkey: _broker_pubkey, exec_payload: _exec_payload };
}

function storeTupleExecute(source: Execute) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.refund_fee);
    builder.writeAddress(source.executor);
    builder.writeNumber(source.user_nonce);
    builder.writeCell(source.broker_pubkey);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserExecute(): DictionaryValue<Execute> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecute(src)).endCell());
        },
        parse: (src) => {
            return loadExecute(src.loadRef().beginParse());
        }
    }
}

export type ExecuteByEOA = {
    $$type: 'ExecuteByEOA';
    exec_payload: Cell;
}

export function storeExecuteByEOA(src: ExecuteByEOA) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4033685446, 32);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadExecuteByEOA(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4033685446) { throw Error('Invalid prefix'); }
    let _exec_payload = sc_0.asCell();
    return { $$type: 'ExecuteByEOA' as const, exec_payload: _exec_payload };
}

function loadTupleExecuteByEOA(source: TupleReader) {
    let _exec_payload = source.readCell();
    return { $$type: 'ExecuteByEOA' as const, exec_payload: _exec_payload };
}

function storeTupleExecuteByEOA(source: ExecuteByEOA) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserExecuteByEOA(): DictionaryValue<ExecuteByEOA> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExecuteByEOA(src)).endCell());
        },
        parse: (src) => {
            return loadExecuteByEOA(src.loadRef().beginParse());
        }
    }
}

export type RefundFee = {
    $$type: 'RefundFee';
    init_value: bigint;
}

export function storeRefundFee(src: RefundFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2000650733, 32);
        b_0.storeCoins(src.init_value);
    };
}

export function loadRefundFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2000650733) { throw Error('Invalid prefix'); }
    let _init_value = sc_0.loadCoins();
    return { $$type: 'RefundFee' as const, init_value: _init_value };
}

function loadTupleRefundFee(source: TupleReader) {
    let _init_value = source.readBigNumber();
    return { $$type: 'RefundFee' as const, init_value: _init_value };
}

function storeTupleRefundFee(source: RefundFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.init_value);
    return builder.build();
}

function dictValueParserRefundFee(): DictionaryValue<RefundFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRefundFee(src)).endCell());
        },
        parse: (src) => {
            return loadRefundFee(src.loadRef().beginParse());
        }
    }
}

export type UpdatePubkey = {
    $$type: 'UpdatePubkey';
    pubkey: Cell;
}

export function storeUpdatePubkey(src: UpdatePubkey) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1435174382, 32);
        b_0.storeRef(src.pubkey);
    };
}

export function loadUpdatePubkey(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1435174382) { throw Error('Invalid prefix'); }
    let _pubkey = sc_0.loadRef();
    return { $$type: 'UpdatePubkey' as const, pubkey: _pubkey };
}

function loadTupleUpdatePubkey(source: TupleReader) {
    let _pubkey = source.readCell();
    return { $$type: 'UpdatePubkey' as const, pubkey: _pubkey };
}

function storeTupleUpdatePubkey(source: UpdatePubkey) {
    let builder = new TupleBuilder();
    builder.writeCell(source.pubkey);
    return builder.build();
}

function dictValueParserUpdatePubkey(): DictionaryValue<UpdatePubkey> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdatePubkey(src)).endCell());
        },
        parse: (src) => {
            return loadUpdatePubkey(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type JettonTransferNotification = {
    $$type: 'JettonTransferNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeJettonTransferNotification(src: JettonTransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransferNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleJettonTransferNotification(source: JettonTransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonExcesses = {
    $$type: 'JettonExcesses';
    query_id: bigint;
}

export function storeJettonExcesses(src: JettonExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadJettonExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadJettonExcesses(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

 type Entrypoint_init_args = {
    $$type: 'Entrypoint_init_args';
    owner: Address;
}

function initEntrypoint_init_args(src: Entrypoint_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function Entrypoint_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initEntrypoint_init_args({ $$type: 'Entrypoint_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Entrypoint_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    17473: { message: `Expired` },
    18527: { message: `Op already used` },
    27543: { message: `Block hash mismatch` },
    45716: { message: `Invalid broker` },
    47851: { message: `Block number out of range` },
    48401: { message: `Invalid signature` },
}

const Entrypoint_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Upgrade","header":1573472578,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SetAdminPubkey","header":179445649,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"PrepayAndHandleOpRequest","header":217083520,"fields":[{"name":"pay_for_jetton","type":{"kind":"simple","type":"bool","optional":false}},{"name":"valid_until","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"storage_index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"PrepayAndHandleOp","header":100942365,"fields":[{"name":"init_value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"storage_index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"HandleKontosProof","header":316013570,"fields":[]},
    {"name":"ValidateJettonTransfer","header":3197193134,"fields":[{"name":"refund_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateBlockHeaders","header":2031003575,"fields":[{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CheckOpHash","header":3577283849,"fields":[{"name":"init_value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"op_hash","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"PrePay","header":930486506,"fields":[{"name":"init_value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CheckDeployment","header":337636399,"fields":[{"name":"refund_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonPrepay","header":2496814550,"fields":[{"name":"refund_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Execute","header":3238711231,"fields":[{"name":"refund_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ExecuteByEOA","header":4033685446,"fields":[{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"RefundFee","header":2000650733,"fields":[{"name":"init_value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpdatePubkey","header":1435174382,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Entrypoint_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Entrypoint_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetAdminPubkey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PrepayAndHandleOpRequest"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PrepayAndHandleOp"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ValidateJettonTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Entrypoint implements Contract {
    
    static async init(owner: Address) {
        return await Entrypoint_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await Entrypoint_init(owner);
        const address = contractAddress(0, init);
        return new Entrypoint(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Entrypoint(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Entrypoint_types,
        getters: Entrypoint_getters,
        receivers: Entrypoint_receivers,
        errors: Entrypoint_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetAdminPubkey | PrepayAndHandleOpRequest | PrepayAndHandleOp | ValidateJettonTransfer | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAdminPubkey') {
            body = beginCell().store(storeSetAdminPubkey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PrepayAndHandleOpRequest') {
            body = beginCell().store(storePrepayAndHandleOpRequest(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PrepayAndHandleOp') {
            body = beginCell().store(storePrepayAndHandleOp(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ValidateJettonTransfer') {
            body = beginCell().store(storeValidateJettonTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}