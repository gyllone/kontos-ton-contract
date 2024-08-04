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

export type HandleOpWithPrePay = {
    $$type: 'HandleOpWithPrePay';
    broker_pubkey: Cell;
    user_pubkey: Cell;
    amount: bigint;
    exec_payload: Cell;
}

export function storeHandleOpWithPrePay(src: HandleOpWithPrePay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2617211426, 32);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeCoins(src.amount);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadHandleOpWithPrePay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2617211426) { throw Error('Invalid prefix'); }
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'HandleOpWithPrePay' as const, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, amount: _amount, exec_payload: _exec_payload };
}

function loadTupleHandleOpWithPrePay(source: TupleReader) {
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _amount = source.readBigNumber();
    let _exec_payload = source.readCell();
    return { $$type: 'HandleOpWithPrePay' as const, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, amount: _amount, exec_payload: _exec_payload };
}

function storeTupleHandleOpWithPrePay(source: HandleOpWithPrePay) {
    let builder = new TupleBuilder();
    builder.writeCell(source.broker_pubkey);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.amount);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserHandleOpWithPrePay(): DictionaryValue<HandleOpWithPrePay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeHandleOpWithPrePay(src)).endCell());
        },
        parse: (src) => {
            return loadHandleOpWithPrePay(src.loadRef().beginParse());
        }
    }
}

export type HandleOpWithJettonPrePay = {
    $$type: 'HandleOpWithJettonPrePay';
    broker_pubkey: Cell;
    user_pubkey: Cell;
    ton_amount: bigint;
    jetton_payload: Cell;
    exec_payload: Cell;
}

export function storeHandleOpWithJettonPrePay(src: HandleOpWithJettonPrePay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2774263899, 32);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.jetton_payload);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadHandleOpWithJettonPrePay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2774263899) { throw Error('Invalid prefix'); }
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'HandleOpWithJettonPrePay' as const, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleHandleOpWithJettonPrePay(source: TupleReader) {
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'HandleOpWithJettonPrePay' as const, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleHandleOpWithJettonPrePay(source: HandleOpWithJettonPrePay) {
    let builder = new TupleBuilder();
    builder.writeCell(source.broker_pubkey);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserHandleOpWithJettonPrePay(): DictionaryValue<HandleOpWithJettonPrePay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeHandleOpWithJettonPrePay(src)).endCell());
        },
        parse: (src) => {
            return loadHandleOpWithJettonPrePay(src.loadRef().beginParse());
        }
    }
}

export type ValidateJettonTransfer = {
    $$type: 'ValidateJettonTransfer';
    broker_pubkey: Cell;
    user_pubkey: Cell;
    jetton_wallet: Address;
    exec_payload: Cell;
}

export function storeValidateJettonTransfer(src: ValidateJettonTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1190188753, 32);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeRef(src.user_pubkey);
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadValidateJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1190188753) { throw Error('Invalid prefix'); }
    let _broker_pubkey = sc_0.loadRef();
    let _user_pubkey = sc_0.loadRef();
    let _jetton_wallet = sc_0.loadAddress();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'ValidateJettonTransfer' as const, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, jetton_wallet: _jetton_wallet, exec_payload: _exec_payload };
}

function loadTupleValidateJettonTransfer(source: TupleReader) {
    let _broker_pubkey = source.readCell();
    let _user_pubkey = source.readCell();
    let _jetton_wallet = source.readAddress();
    let _exec_payload = source.readCell();
    return { $$type: 'ValidateJettonTransfer' as const, broker_pubkey: _broker_pubkey, user_pubkey: _user_pubkey, jetton_wallet: _jetton_wallet, exec_payload: _exec_payload };
}

function storeTupleValidateJettonTransfer(source: ValidateJettonTransfer) {
    let builder = new TupleBuilder();
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
    payload: Cell;
}

export function storeUpdateBlockHeaders(src: UpdateBlockHeaders) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(819026393, 32);
        b_0.storeBuilder(src.payload.asBuilder());
    };
}

export function loadUpdateBlockHeaders(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 819026393) { throw Error('Invalid prefix'); }
    let _payload = sc_0.asCell();
    return { $$type: 'UpdateBlockHeaders' as const, payload: _payload };
}

function loadTupleUpdateBlockHeaders(source: TupleReader) {
    let _payload = source.readCell();
    return { $$type: 'UpdateBlockHeaders' as const, payload: _payload };
}

function storeTupleUpdateBlockHeaders(source: UpdateBlockHeaders) {
    let builder = new TupleBuilder();
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

export type PrePay = {
    $$type: 'PrePay';
    executor: Address;
    executor_fee: bigint;
    user_pubkey: Cell;
    amount: bigint;
    exec_payload: Cell;
}

export function storePrePay(src: PrePay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(593867888, 32);
        b_0.storeAddress(src.executor);
        b_0.storeCoins(src.executor_fee);
        b_0.storeRef(src.user_pubkey);
        b_0.storeCoins(src.amount);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadPrePay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 593867888) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadAddress();
    let _executor_fee = sc_0.loadCoins();
    let _user_pubkey = sc_0.loadRef();
    let _amount = sc_0.loadCoins();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'PrePay' as const, executor: _executor, executor_fee: _executor_fee, user_pubkey: _user_pubkey, amount: _amount, exec_payload: _exec_payload };
}

function loadTuplePrePay(source: TupleReader) {
    let _executor = source.readAddress();
    let _executor_fee = source.readBigNumber();
    let _user_pubkey = source.readCell();
    let _amount = source.readBigNumber();
    let _exec_payload = source.readCell();
    return { $$type: 'PrePay' as const, executor: _executor, executor_fee: _executor_fee, user_pubkey: _user_pubkey, amount: _amount, exec_payload: _exec_payload };
}

function storeTuplePrePay(source: PrePay) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeNumber(source.executor_fee);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.amount);
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

export type JettonPrePay = {
    $$type: 'JettonPrePay';
    executor: Address;
    executor_fee: bigint;
    user_pubkey: Cell;
    ton_amount: bigint;
    jetton_payload: Cell;
    exec_payload: Cell;
}

export function storeJettonPrePay(src: JettonPrePay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2273695281, 32);
        b_0.storeAddress(src.executor);
        b_0.storeCoins(src.executor_fee);
        b_0.storeRef(src.user_pubkey);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.jetton_payload);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadJettonPrePay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2273695281) { throw Error('Invalid prefix'); }
    let _executor = sc_0.loadAddress();
    let _executor_fee = sc_0.loadCoins();
    let _user_pubkey = sc_0.loadRef();
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'JettonPrePay' as const, executor: _executor, executor_fee: _executor_fee, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleJettonPrePay(source: TupleReader) {
    let _executor = source.readAddress();
    let _executor_fee = source.readBigNumber();
    let _user_pubkey = source.readCell();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'JettonPrePay' as const, executor: _executor, executor_fee: _executor_fee, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleJettonPrePay(source: JettonPrePay) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.executor);
    builder.writeNumber(source.executor_fee);
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserJettonPrePay(): DictionaryValue<JettonPrePay> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonPrePay(src)).endCell());
        },
        parse: (src) => {
            return loadJettonPrePay(src.loadRef().beginParse());
        }
    }
}

export type CheckDeployment = {
    $$type: 'CheckDeployment';
    broker_pubkey: Cell;
    ton_amount: bigint;
    jetton_payload: Cell;
    exec_payload: Cell;
}

export function storeCheckDeployment(src: CheckDeployment) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2620465890, 32);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.jetton_payload);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadCheckDeployment(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2620465890) { throw Error('Invalid prefix'); }
    let _broker_pubkey = sc_0.loadRef();
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'CheckDeployment' as const, broker_pubkey: _broker_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleCheckDeployment(source: TupleReader) {
    let _broker_pubkey = source.readCell();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'CheckDeployment' as const, broker_pubkey: _broker_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleCheckDeployment(source: CheckDeployment) {
    let builder = new TupleBuilder();
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

export type JettonPrePayInternal = {
    $$type: 'JettonPrePayInternal';
    user_pubkey: Cell;
    ton_amount: bigint;
    jetton_payload: Cell;
    exec_payload: Cell;
}

export function storeJettonPrePayInternal(src: JettonPrePayInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(711716439, 32);
        b_0.storeRef(src.user_pubkey);
        b_0.storeCoins(src.ton_amount);
        b_0.storeRef(src.jetton_payload);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadJettonPrePayInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 711716439) { throw Error('Invalid prefix'); }
    let _user_pubkey = sc_0.loadRef();
    let _ton_amount = sc_0.loadCoins();
    let _jetton_payload = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'JettonPrePayInternal' as const, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function loadTupleJettonPrePayInternal(source: TupleReader) {
    let _user_pubkey = source.readCell();
    let _ton_amount = source.readBigNumber();
    let _jetton_payload = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'JettonPrePayInternal' as const, user_pubkey: _user_pubkey, ton_amount: _ton_amount, jetton_payload: _jetton_payload, exec_payload: _exec_payload };
}

function storeTupleJettonPrePayInternal(source: JettonPrePayInternal) {
    let builder = new TupleBuilder();
    builder.writeCell(source.user_pubkey);
    builder.writeNumber(source.ton_amount);
    builder.writeCell(source.jetton_payload);
    builder.writeSlice(source.exec_payload);
    return builder.build();
}

function dictValueParserJettonPrePayInternal(): DictionaryValue<JettonPrePayInternal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonPrePayInternal(src)).endCell());
        },
        parse: (src) => {
            return loadJettonPrePayInternal(src.loadRef().beginParse());
        }
    }
}

export type Execute = {
    $$type: 'Execute';
    broker_pubkey: Cell;
    exec_payload: Cell;
}

export function storeExecute(src: Execute) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2391285983, 32);
        b_0.storeRef(src.broker_pubkey);
        b_0.storeBuilder(src.exec_payload.asBuilder());
    };
}

export function loadExecute(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2391285983) { throw Error('Invalid prefix'); }
    let _broker_pubkey = sc_0.loadRef();
    let _exec_payload = sc_0.asCell();
    return { $$type: 'Execute' as const, broker_pubkey: _broker_pubkey, exec_payload: _exec_payload };
}

function loadTupleExecute(source: TupleReader) {
    let _broker_pubkey = source.readCell();
    let _exec_payload = source.readCell();
    return { $$type: 'Execute' as const, broker_pubkey: _broker_pubkey, exec_payload: _exec_payload };
}

function storeTupleExecute(source: Execute) {
    let builder = new TupleBuilder();
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

 type SmartAccount_init_args = {
    $$type: 'SmartAccount_init_args';
    pubkey: Cell;
    entrypoint: Address;
}

function initSmartAccount_init_args(src: SmartAccount_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.pubkey);
        b_0.storeAddress(src.entrypoint);
    };
}

async function SmartAccount_init(pubkey: Cell, entrypoint: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSmartAccount_init_args({ $$type: 'SmartAccount_init_args', pubkey, entrypoint })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SmartAccount_errors: { [key: number]: { message: string } } = {
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
    27543: { message: `Block hash mismatch` },
    45716: { message: `Invalid broker` },
    47851: { message: `Block number out of range` },
}

const SmartAccount_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Upgrade","header":1573472578,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SetAdminPubkey","header":179445649,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"HandleOpWithPrePay","header":2617211426,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"HandleOpWithJettonPrePay","header":2774263899,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ValidateJettonTransfer","header":1190188753,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateBlockHeaders","header":819026393,"fields":[{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"PrePay","header":593867888,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"executor_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonPrePay","header":2273695281,"fields":[{"name":"executor","type":{"kind":"simple","type":"address","optional":false}},{"name":"executor_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"CheckDeployment","header":2620465890,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonPrePayInternal","header":711716439,"fields":[{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Execute","header":2391285983,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ExecuteByEOA","header":4033685446,"fields":[{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdatePubkey","header":1435174382,"fields":[{"name":"pubkey","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const SmartAccount_getters: ABIGetter[] = [
]

const SmartAccount_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExecuteByEOA"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdatePubkey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PrePay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonPrePay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CheckDeployment"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonPrePayInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Execute"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonTransferNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonExcesses"}},
]

export class SmartAccount implements Contract {
    
    static async init(pubkey: Cell, entrypoint: Address) {
        return await SmartAccount_init(pubkey, entrypoint);
    }
    
    static async fromInit(pubkey: Cell, entrypoint: Address) {
        const init = await SmartAccount_init(pubkey, entrypoint);
        const address = contractAddress(0, init);
        return new SmartAccount(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SmartAccount(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SmartAccount_types,
        getters: SmartAccount_getters,
        receivers: SmartAccount_receivers,
        errors: SmartAccount_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | ExecuteByEOA | UpdatePubkey | PrePay | JettonPrePay | CheckDeployment | JettonPrePayInternal | Execute | JettonTransferNotification | JettonExcesses) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExecuteByEOA') {
            body = beginCell().store(storeExecuteByEOA(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdatePubkey') {
            body = beginCell().store(storeUpdatePubkey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PrePay') {
            body = beginCell().store(storePrePay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonPrePay') {
            body = beginCell().store(storeJettonPrePay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CheckDeployment') {
            body = beginCell().store(storeCheckDeployment(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonPrePayInternal') {
            body = beginCell().store(storeJettonPrePayInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Execute') {
            body = beginCell().store(storeExecute(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonTransferNotification') {
            body = beginCell().store(storeJettonTransferNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonExcesses') {
            body = beginCell().store(storeJettonExcesses(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}