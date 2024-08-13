import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode } from '@ton/core';

export class JettonWallet implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new JettonWallet(address);
    }

    async getJettonBalance(provider: ContractProvider) {
        let state = await provider.getState();
        if (state.state.type !== 'active') {
            return 0n;
        }
        let res = await provider.get('get_wallet_data', []);
        return res.stack.readBigNumber();
    }

    static transferMessage(
        jettonAmount: bigint,
        to: Address,
        responseAddress: Address,
        forwardTonAmount: bigint = BigInt(0),
        customPayload?: Cell,
        forwardPayload?: Cell,
    ) {
        return beginCell()
            .storeUint(0xf8a7ea5, 32)
            .storeUint(0, 64) // op, queryId
            .storeCoins(jettonAmount)
            .storeAddress(to)
            .storeAddress(responseAddress)
            .storeMaybeRef(customPayload)
            .storeCoins(forwardTonAmount)
            .storeMaybeRef(forwardPayload)
            .endCell();
    }

    async transfer(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        jettonAmount: bigint,
        to: Address,
        responseAddress: Address,
        forwardTonAmount: bigint = BigInt(0),
        customPayload?: Cell,
        forwardPayload?: Cell,
    ) {
        await provider.internal(
            via,
            {
                sendMode: SendMode.PAY_GAS_SEPARATELY,
                body: JettonWallet.transferMessage(jettonAmount, to, responseAddress, forwardTonAmount, customPayload, forwardPayload),
                value: value
            },
        );
    }
}