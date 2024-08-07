
// === General ===

message Upgrade {
    code: Cell;
}

// === Entrypoint ===

message SetAdminPubkey {
    pubkey: Int as uint256;
}

message PrepayAndHandleOpRequest {
    pay_for_jetton: Bool;
    valid_until: Int as uint64;
    storage_index: Int as uint64;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    user_nonce: Int as uint64;
    ton_amount: Int as coins;
    payload: Cell;
    signature: Slice as remaining;
}

message PrepayAndHandleOp {
    init_value: Int as coins;
    executor: Address;
    storage_index: Int as uint64;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    user_nonce: Int as uint64;
    ton_amount: Int as coins;
    jetton_payload: Cell?;
    exec_payload: Slice as remaining;
}

message HandleKontosProof {
    // TODO
}

message ValidateJettonTransfer {
    refund_fee: Int as coins;
    executor: Address;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    jetton_wallet: Address;
    exec_payload: Slice as remaining;
}

// === Light client ===

message UpdateBlockHeaders {
    cashback: Address;
    payload: Slice as remaining;
}

message CheckOpHash {
    init_value: Int as coins;
    executor: Address;
    op_hash: Int as uint256;
    broker_pubkey: Cell;
    user_pubkey: Cell;
    user_nonce: Int as uint64;
    ton_amount: Int as coins;
    jetton_payload: Cell?;
    exec_payload: Slice as remaining;
}

// === Smart Account ===

message PrePay {
    init_value: Int as coins;
    executor: Address;
    // light_client: Address;
    // op_hash: Int as uint256;
    user_pubkey: Cell;
    user_nonce: Int as uint64;
    ton_amount: Int as coins;
    jetton_payload: Cell?;
    exec_payload: Slice as remaining;
}

// message JettonPrePay {
//     executor: Address;
//     executor_fee: Int as coins;
//     user_pubkey: Cell;
//     ton_amount: Int as coins;
//     jetton_payload: Cell;
//     exec_payload: Slice as remaining;
// }

message CheckDeployment {
    refund_fee: Int as coins;
    executor: Address;
    user_nonce: Int as uint64;
    broker_pubkey: Cell;
    ton_amount: Int as coins;
    jetton_payload: Cell;
    exec_payload: Slice as remaining;
}

message JettonPrepay {
    refund_fee: Int as coins;
    executor: Address;
    user_pubkey: Cell;
    ton_amount: Int as coins;
    jetton_payload: Cell;
    exec_payload: Slice as remaining;
}

message Execute {
    refund_fee: Int as coins;
    executor: Address;
    user_nonce: Int?;
    broker_pubkey: Cell;
    exec_payload: Slice as remaining;
}

message ExecuteByEOA {
    exec_payload: Slice as remaining;
}

message RefundFee {
    init_value: Int as coins;
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
