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

export type AddBroker = {
    $$type: 'AddBroker';
    pubkey: Cell;
}

export function storeAddBroker(src: AddBroker) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(753706198, 32);
        b_0.storeRef(src.pubkey);
    };
}

export function loadAddBroker(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 753706198) { throw Error('Invalid prefix'); }
    let _pubkey = sc_0.loadRef();
    return { $$type: 'AddBroker' as const, pubkey: _pubkey };
}

function loadTupleAddBroker(source: TupleReader) {
    let _pubkey = source.readCell();
    return { $$type: 'AddBroker' as const, pubkey: _pubkey };
}

function storeTupleAddBroker(source: AddBroker) {
    let builder = new TupleBuilder();
    builder.writeCell(source.pubkey);
    return builder.build();
}

function dictValueParserAddBroker(): DictionaryValue<AddBroker> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAddBroker(src)).endCell());
        },
        parse: (src) => {
            return loadAddBroker(src.loadRef().beginParse());
        }
    }
}

export type RemoveBroker = {
    $$type: 'RemoveBroker';
    pubkey: Cell;
}

export function storeRemoveBroker(src: RemoveBroker) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490534500, 32);
        b_0.storeRef(src.pubkey);
    };
}

export function loadRemoveBroker(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490534500) { throw Error('Invalid prefix'); }
    let _pubkey = sc_0.loadRef();
    return { $$type: 'RemoveBroker' as const, pubkey: _pubkey };
}

function loadTupleRemoveBroker(source: TupleReader) {
    let _pubkey = source.readCell();
    return { $$type: 'RemoveBroker' as const, pubkey: _pubkey };
}

function storeTupleRemoveBroker(source: RemoveBroker) {
    let builder = new TupleBuilder();
    builder.writeCell(source.pubkey);
    return builder.build();
}

function dictValueParserRemoveBroker(): DictionaryValue<RemoveBroker> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRemoveBroker(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveBroker(src.loadRef().beginParse());
        }
    }
}

export type PrepayAndHandleOpRequest = {
    $$type: 'PrepayAndHandleOpRequest';
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
        b_0.storeUint(2041627313, 32);
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
    if (sc_0.loadUint(32) !== 2041627313) { throw Error('Invalid prefix'); }
    let _valid_until = sc_0.loadUintBig(64);
    let _storage_index = sc_0.loadUintBig(64);
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _user_nonce = sc_0.loadUintBig(64);
    let _ton_amount = sc_0.loadCoins();
    let _payload = sc_0.loadRef();
    let _signature = sc_0.asCell();
    return { $$type: 'PrepayAndHandleOpRequest' as const, valid_until: _valid_until, storage_index: _storage_index, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, payload: _payload, signature: _signature };
}

function loadTuplePrepayAndHandleOpRequest(source: TupleReader) {
    let _valid_until = source.readBigNumber();
    let _storage_index = source.readBigNumber();
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _user_nonce = source.readBigNumber();
    let _ton_amount = source.readBigNumber();
    let _payload = source.readCell();
    let _signature = source.readCell();
    return { $$type: 'PrepayAndHandleOpRequest' as const, valid_until: _valid_until, storage_index: _storage_index, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, user_nonce: _user_nonce, ton_amount: _ton_amount, payload: _payload, signature: _signature };
}

function storeTuplePrepayAndHandleOpRequest(source: PrepayAndHandleOpRequest) {
    let builder = new TupleBuilder();
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
    {"name":"AddBroker","header":753706198,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"RemoveBroker","header":2490534500,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"PrepayAndHandleOpRequest","header":2041627313,"fields":[{"name":"valid_until","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"storage_index","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_nonce","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"signature","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
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
    {"receiver":"internal","message":{"kind":"typed","type":"AddBroker"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RemoveBroker"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetAdminPubkey | AddBroker | RemoveBroker | PrepayAndHandleOpRequest | PrepayAndHandleOp | ValidateJettonTransfer | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAdminPubkey') {
            body = beginCell().store(storeSetAdminPubkey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddBroker') {
            body = beginCell().store(storeAddBroker(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveBroker') {
            body = beginCell().store(storeRemoveBroker(message)).endCell();
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