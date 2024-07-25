
import "./types";

// === General ===

message Upgrade {
    code: Cell;
}

// === Light client ===

message UpdateBlockHeaders {
    payload: Slice as remaining;
}

// === Smart Account ===

message BatchExecuteByEOA {
    messages: Slice as remaining;
}

message BatchExecuteByEntrypoint {
    nonce: Int;
    signature: Slice;
    jetton_message: Cell;
    jetton_fee: Int as coins;
    user_borne: Int as coins; 
    target_messages: Slice as remaining;
}

message ExecuteByEntrypoint {
    broker: Address;
    nonce: Int;
    signature: Slice;
    jetton_msg: JettonMessage;
    main_msg: MainMessage;
}

message UpdatePubkey {
    pubkey: Slice;
}

// === Jetton Wallet ===

message(0xf8a7ea5) JettonTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address?;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining; 
}

message(0x7362d09c) JettonTransferNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining;
}

message(0xd53276db) JettonExcesses {
    query_id: Int as uint64;
}
