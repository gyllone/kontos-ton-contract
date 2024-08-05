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
    27543: { message: `Block hash mismatch` },
    45716: { message: `Invalid broker` },
    47851: { message: `Block number out of range` },
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
    {"name":"HandleOpWithPrePay","header":2617211426,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"HandleOpWithJettonPrePay","header":2774263899,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ValidateJettonTransfer","header":1190188753,"fields":[{"name":"broker_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"user_pubkey","type":{"kind":"simple","type":"cell","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"exec_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"UpdateBlockHeaders","header":2031003575,"fields":[{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
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

const Entrypoint_getters: ABIGetter[] = [
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Entrypoint_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetAdminPubkey"}},
    {"receiver":"internal","message":{"kind":"typed","type":"HandleOpWithPrePay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"HandleOpWithJettonPrePay"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetAdminPubkey | HandleOpWithPrePay | HandleOpWithJettonPrePay | ValidateJettonTransfer | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetAdminPubkey') {
            body = beginCell().store(storeSetAdminPubkey(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'HandleOpWithPrePay') {
            body = beginCell().store(storeHandleOpWithPrePay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'HandleOpWithJettonPrePay') {
            body = beginCell().store(storeHandleOpWithJettonPrePay(message)).endCell();
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