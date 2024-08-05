# TACT Compilation Report
Contract: Entrypoint
BOC Size: 2839 bytes

# Types
Total Types: 24

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

## HandleOpWithPrePay
TLB: `handle_op_with_pre_pay#9bff7a22 broker_pubkey:^cell user_pubkey:^cell amount:coins exec_payload:remainder<slice> = HandleOpWithPrePay`
Signature: `HandleOpWithPrePay{broker_pubkey:^cell,user_pubkey:^cell,amount:coins,exec_payload:remainder<slice>}`

## HandleOpWithJettonPrePay
TLB: `handle_op_with_jetton_pre_pay#a55be85b broker_pubkey:^cell user_pubkey:^cell ton_amount:coins jetton_payload:^cell exec_payload:remainder<slice> = HandleOpWithJettonPrePay`
Signature: `HandleOpWithJettonPrePay{broker_pubkey:^cell,user_pubkey:^cell,ton_amount:coins,jetton_payload:^cell,exec_payload:remainder<slice>}`

## ValidateJettonTransfer
TLB: `validate_jetton_transfer#46f0d6d1 broker_pubkey:^cell user_pubkey:^cell jetton_wallet:address exec_payload:remainder<slice> = ValidateJettonTransfer`
Signature: `ValidateJettonTransfer{broker_pubkey:^cell,user_pubkey:^cell,jetton_wallet:address,exec_payload:remainder<slice>}`

## UpdateBlockHeaders
TLB: `update_block_headers#790ea7b7 cashback:address payload:remainder<slice> = UpdateBlockHeaders`
Signature: `UpdateBlockHeaders{cashback:address,payload:remainder<slice>}`

## PrePay
TLB: `pre_pay#2365b470 executor:address executor_fee:coins user_pubkey:^cell amount:coins exec_payload:remainder<slice> = PrePay`
Signature: `PrePay{executor:address,executor_fee:coins,user_pubkey:^cell,amount:coins,exec_payload:remainder<slice>}`

## JettonPrePay
TLB: `jetton_pre_pay#8785d631 executor:address executor_fee:coins user_pubkey:^cell ton_amount:coins jetton_payload:^cell exec_payload:remainder<slice> = JettonPrePay`
Signature: `JettonPrePay{executor:address,executor_fee:coins,user_pubkey:^cell,ton_amount:coins,jetton_payload:^cell,exec_payload:remainder<slice>}`

## CheckDeployment
TLB: `check_deployment#9c3122e2 broker_pubkey:^cell ton_amount:coins jetton_payload:^cell exec_payload:remainder<slice> = CheckDeployment`
Signature: `CheckDeployment{broker_pubkey:^cell,ton_amount:coins,jetton_payload:^cell,exec_payload:remainder<slice>}`

## JettonPrePayInternal
TLB: `jetton_pre_pay_internal#2a6bee57 user_pubkey:^cell ton_amount:coins jetton_payload:^cell exec_payload:remainder<slice> = JettonPrePayInternal`
Signature: `JettonPrePayInternal{user_pubkey:^cell,ton_amount:coins,jetton_payload:^cell,exec_payload:remainder<slice>}`

## Execute
TLB: `execute#8e8820df broker_pubkey:^cell exec_payload:remainder<slice> = Execute`
Signature: `Execute{broker_pubkey:^cell,exec_payload:remainder<slice>}`

## ExecuteByEOA
TLB: `execute_by_eoa#f06d27c6 exec_payload:remainder<slice> = ExecuteByEOA`
Signature: `ExecuteByEOA{exec_payload:remainder<slice>}`

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
Total Get Methods: 1

## owner

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
27543: Block hash mismatch
45716: Invalid broker
47851: Block number out of range