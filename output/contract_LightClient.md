# TACT Compilation Report
Contract: LightClient
BOC Size: 1766 bytes

# Types
Total Types: 27

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## Upgrade
TLB: `upgrade#5dc94942 code:^cell = Upgrade`
Signature: `Upgrade{code:^cell}`

## SetAdminPubkey
TLB: `set_admin_pubkey#0ab21f91 pubkey:uint256 = SetAdminPubkey`
Signature: `SetAdminPubkey{pubkey:uint256}`

## PrepayAndHandleOpRequest
TLB: `prepay_and_handle_op_request#0cf06e80 pay_for_jetton:bool valid_until:uint64 storage_index:uint64 broker_pubkey:^cell user_pubkey:^cell user_nonce:uint64 ton_amount:coins payload:^cell signature:remainder<slice> = PrepayAndHandleOpRequest`
Signature: `PrepayAndHandleOpRequest{pay_for_jetton:bool,valid_until:uint64,storage_index:uint64,broker_pubkey:^cell,user_pubkey:^cell,user_nonce:uint64,ton_amount:coins,payload:^cell,signature:remainder<slice>}`

## PrepayAndHandleOp
TLB: `prepay_and_handle_op#0604421d init_value:coins executor:address storage_index:uint64 broker_pubkey:^cell user_pubkey:^cell user_nonce:uint64 ton_amount:coins jetton_payload:Maybe ^cell exec_payload:remainder<slice> = PrepayAndHandleOp`
Signature: `PrepayAndHandleOp{init_value:coins,executor:address,storage_index:uint64,broker_pubkey:^cell,user_pubkey:^cell,user_nonce:uint64,ton_amount:coins,jetton_payload:Maybe ^cell,exec_payload:remainder<slice>}`

## HandleKontosProof
TLB: `handle_kontos_proof#12d5fc02  = HandleKontosProof`
Signature: `HandleKontosProof{}`

## ValidateJettonTransfer
TLB: `validate_jetton_transfer#be914bae refund_fee:coins executor:address broker_pubkey:^cell user_pubkey:^cell jetton_wallet:address exec_payload:remainder<slice> = ValidateJettonTransfer`
Signature: `ValidateJettonTransfer{refund_fee:coins,executor:address,broker_pubkey:^cell,user_pubkey:^cell,jetton_wallet:address,exec_payload:remainder<slice>}`

## UpdateBlockHeaders
TLB: `update_block_headers#790ea7b7 cashback:address payload:remainder<slice> = UpdateBlockHeaders`
Signature: `UpdateBlockHeaders{cashback:address,payload:remainder<slice>}`

## CheckOpHash
TLB: `check_op_hash#74729f41 init_value:coins executor:address digest:uint256 broker_pubkey:^cell user_pubkey:^cell user_nonce:uint64 ton_amount:coins jetton_payload:Maybe ^cell exec_payload:remainder<slice> = CheckOpHash`
Signature: `CheckOpHash{init_value:coins,executor:address,digest:uint256,broker_pubkey:^cell,user_pubkey:^cell,user_nonce:uint64,ton_amount:coins,jetton_payload:Maybe ^cell,exec_payload:remainder<slice>}`

## RecordOpHash
TLB: `record_op_hash#e0acc5b6 op_hash:uint256 pubkey:^cell = RecordOpHash`
Signature: `RecordOpHash{op_hash:uint256,pubkey:^cell}`

## PrePay
TLB: `pre_pay#377618ea init_value:coins executor:address user_pubkey:^cell user_nonce:uint64 ton_amount:coins jetton_payload:Maybe ^cell exec_payload:remainder<slice> = PrePay`
Signature: `PrePay{init_value:coins,executor:address,user_pubkey:^cell,user_nonce:uint64,ton_amount:coins,jetton_payload:Maybe ^cell,exec_payload:remainder<slice>}`

## CheckDeployment
TLB: `check_deployment#141fec2f refund_fee:coins executor:address user_nonce:uint64 broker_pubkey:^cell ton_amount:coins jetton_payload:^cell exec_payload:remainder<slice> = CheckDeployment`
Signature: `CheckDeployment{refund_fee:coins,executor:address,user_nonce:uint64,broker_pubkey:^cell,ton_amount:coins,jetton_payload:^cell,exec_payload:remainder<slice>}`

## JettonPrepay
TLB: `jetton_prepay#94d25dd6 refund_fee:coins executor:address user_pubkey:^cell ton_amount:coins jetton_payload:^cell exec_payload:remainder<slice> = JettonPrepay`
Signature: `JettonPrepay{refund_fee:coins,executor:address,user_pubkey:^cell,ton_amount:coins,jetton_payload:^cell,exec_payload:remainder<slice>}`

## Execute
TLB: `execute#c10acfbf refund_fee:coins executor:address user_nonce:Maybe int257 broker_pubkey:^cell exec_payload:remainder<slice> = Execute`
Signature: `Execute{refund_fee:coins,executor:address,user_nonce:Maybe int257,broker_pubkey:^cell,exec_payload:remainder<slice>}`

## ExecuteByEOA
TLB: `execute_by_eoa#f06d27c6 exec_payload:remainder<slice> = ExecuteByEOA`
Signature: `ExecuteByEOA{exec_payload:remainder<slice>}`

## RefundFee
TLB: `refund_fee#773f81ed init_value:coins = RefundFee`
Signature: `RefundFee{init_value:coins}`

## UpdatePubkey
TLB: `update_pubkey#558b05ee pubkey:^cell = UpdatePubkey`
Signature: `UpdatePubkey{pubkey:^cell}`

## JettonTransfer
TLB: `jetton_transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:Maybe address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonTransfer`
Signature: `JettonTransfer{query_id:uint64,amount:coins,destination:address,response_destination:Maybe address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## JettonTransferNotification
TLB: `jetton_transfer_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = JettonTransferNotification`
Signature: `JettonTransferNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## JettonExcesses
TLB: `jetton_excesses#d53276db query_id:uint64 = JettonExcesses`
Signature: `JettonExcesses{query_id:uint64}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

# Get Methods
Total Get Methods: 3

## get_storage_index

## get_kontos_sim_header
Argument: number

## get_tip

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
17473: Expired
18527: Op already used
27543: Block hash mismatch
45716: Invalid broker
47851: Block number out of range
48401: Invalid signature