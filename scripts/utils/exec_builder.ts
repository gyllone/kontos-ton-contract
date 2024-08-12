import { Address, beginCell, Cell } from "@ton/core";

export type SendParameters = {
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function build_exec_payload(params: SendParameters): Cell {
    let msg_builder = beginCell()
        .storeInt(1, 2)
        .storeBit(params.bounce)
        .storeInt(0, 3)
        .storeAddress(params.to)
        .storeCoins(params.value)
        .storeInt(0, 1 + 4 + 4 + 64 + 32);
    
    if (params.code != null || params.data != null) {
        let b = beginCell()
            .storeBit(false) // SplitDepth
            .storeBit(false) // TickTock
            .storeMaybeRef(params.code)
            .storeMaybeRef(params.data)
            .storeBit(false);  // Library
        msg_builder = msg_builder.storeBit(true).storeMaybeRef(b.endCell());
    } else {
        msg_builder = msg_builder.storeBit(false);
    }

    msg_builder = msg_builder.storeMaybeRef(params.body);

    return beginCell()
        .storeUint(params.mode, 8)
        .storeRef(msg_builder.endCell())
        .endCell();
}