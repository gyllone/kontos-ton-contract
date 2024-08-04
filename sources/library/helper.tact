import "./builtins";

fun pack_message(
    bounce: Bool,
    to: Address,
    value: Int,
    body: Cell?,
    code: Cell?,
    data: Cell?,
): Cell {
    let builder: Builder = beginCell()
        .storeInt(1, 2) // internal_message + ihd_disabled
        .storeBool(bounce) // bounce
        .storeInt(0, 3) // bounced + from
        .storeAddress(to) // To
        .storeCoins(value) // Value
        .storeInt(0, 1 + 4 + 4 + 64 + 32); // currency_collection + IHR fees + Fwd fees + CreatedLT + CreatedAt

    // Stateinit
    if (code != null || data != null) {
        // Assemble state init cell
        let b: Builder = beginCell()
            .storeBool(false) // SplitDepth
            .storeBool(false); // TickTock
        if (code != null) {
            b = b.storeBool(true).storeRef(code!!);
        } else {
            b = b.storeBool(false); // Code presence
        }
        if (data != null) {
            b = b.storeBool(true).storeRef(data!!);
        } else {
            b = b.storeBool(false); // Data presence
        }
        b = b.storeBool(false); // Library

        builder = builder.storeBool(true).storeRef(b.endCell());
    } else {
        // No state init
        builder = builder.storeBool(false);
    }
    
    // Body
    if (body != null) {
        builder = builder.storeBool(true).storeRef(body!!);
    } else {
        builder = builder.storeBool(false); // No body
    }

    return builder.endCell();
}

inline fun estimate_forward_fee(msg: Cell, flag: Int): Int {
    return sendMessage(msg, 1024 | flag);
}

inline fun compute_gas_fee(gas: Int): Int {
    return getComputeFee(0, gas);
}
