
// === General ===

message Upgrade {
    code: Cell;
}

// === Entrypoint ===

message SetAdminPubkey {
    pubkey: Int as uint256;
}

message HandleOpWithPrePay {
    broker_pubkey: Cell;
    user_pubkey: Cell;
    amount: Int as coins;
    exec_payload: Slice as remaining;
}

message HandleOpWithJettonPrePay {
    broker_pubkey: Cell;
    user_pubkey: Cell;
    ton_amount: Int as coins;
    jetton_payload: Cell;
    exec_payload: Slice as remaining;
}

message ValidateJettonTransfer {
    broker_pubkey: Cell;
    user_pubkey: Cell;
    jetton_wallet: Address;
    exec_payload: Slice as remaining;
}

// === Light client ===

message UpdateBlockHeaders {
    payload: Slice as remaining;
}

// === Smart Account ===

message PrePay {
    executor: Address;
    executor_fee: Int as coins;
    user_pubkey: Cell;
    amount: Int as coins;
    exec_payload: Slice as remaining;
}

message JettonPrePay {
    executor: Address;
    executor_fee: Int as coins;
    user_pubkey: Cell;
    ton_amount: Int as coins;
    jetton_payload: Cell;
    exec_payload: Slice as remaining;
}

message CheckDeployment {
    broker_pubkey: Cell;
    ton_amount: Int as coins;
    jetton_payload: Cell;
    exec_payload: Slice as remaining;
}

message JettonPrePayInternal {
    user_pubkey: Cell;
    ton_amount: Int as coins;
    jetton_payload: Cell;
    exec_payload: Slice as remaining;
}

message Execute {
    broker_pubkey: Cell;
    exec_payload: Slice as remaining;
}

message ExecuteByEOA {
    exec_payload: Slice as remaining;
}

message UpdatePubkey {
    pubkey: Cell;
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
