
import "./types";

// === General ===

message Upgrade {
    code: Cell;
}

// === Entrypoint ===

message ValidateJettonTransfer {
    gas: Int as uint64;
    fwd_fee: Int as coins;
    jetton_wallet: Address;
    from: Address;
    payload: Slice as remaining;
}

message ExecutionReceipt {
    gas: Int as uint64;
    fwd_fee: Int as coins;
}

message HandleOps {
    ops: Slice as remaining;
}

message ConfirmBroker {
    broker: Address;
}

// === Light client ===

message UpdateBlockHeaders {
    payload: Slice as remaining;
}

// === Smart Account ===

message PrePay {
    gas: Int as uint64;
    forward_fee: Int as coins;
    receiver_pubkey: Slice;
    amount: Int as coins;
    payload: Slice as remaining;
}

message JettonPrePay {
    gas: Int as uint64;
    fee: Int as coins;
    destination: Address;
    ton_amount: Int as coins;
    payload: Cell;
    jetton_payload: Slice as remaining;
}

message Execute {
    gas: Int as uint64;
    forward_fee: Int as coins;
    from_pubkey: Slice;
    payload: Slice as remaining;
}

message ExecuteByEntrypoint {
    gas: Int as uint64;
    forward_fee: Int as coins;
    payload: Slice as remaining;
}

message BatchExecuteByEOA {
    messages: Slice as remaining;
}

message BatchExecuteByEntrypoint {
    nonce: Int as uint64;
    signature: Slice;
    broker: Address;
    user_borne: Int as coins; 
    jetton_message: Cell;
    target_messages: Slice as remaining;
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
