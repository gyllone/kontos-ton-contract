
import "./library/builtins";
import "./library/helper";
import "./message";
import "./types";

struct TransferResult {
    jetton_wallet: Address;
    msg: Cell;
    gas_fee: Int as coins;
}

struct TargetResult {
    value: Int as coins;
    msg: Cell;
}

trait SmartAccount {

    const MAX_EXTERNAL_OWNERS: Int = 100;
    const CONPENSATION_GAS: Int = 10_000;

    pubkey: Slice; // reserved for future use, secp256r1 pubkey
    nonce: Int;
    eoa_owner: Address;
    external_owners: map<Address, Bool>;
    entrypoint: Address;

    receive() {
        // receive ton
    }

    // receive(msg: Upgrade) {
    //     self.require_entrypoint();

    //     setCode(msg.code);
    // }

    receive(msg: ExecuteByEOA) {
        self.require_eoa_owner();

        while(msg.message.refs() > 0) {
            let mode: Int = msg.messages.loadUint(8);
            let msg: Cell = msg.messages.loadRef();
            nativeSendMessage(msg, mode);
        }
    }

    // receive(msg: BatchExecuteByEntrypoint) {
    //     let gas_start: Int = gasConsumed();

    //     self.require_unlocked();
    //     self.require_entrypoint();
    //     require(self.nonce == msg.nonce, "Invalid nonce");

    //     let ctx: Context = context();
    //     let budget: Int = ctx.value + msg.user_borne;
    //     let reserve: Int = myBalance() - budget;
    //     require(reserve >= self.storageReserve, "Not enough balance");
    //     // reserve and send with remaining balance later
    //     nativeReserve(reserve, ReserveExact);

    //     // Notice: we don't check the signature here, cuz the msg is sent by entrypoint
    //     self.nonce += 1;

    //     let payload: Slice = msg.jetton_message.beginParse();
    //     let transfer_res: TransferResult = self.process_jetton_transfer_result(payload);
    //     payload.endParse();
    //     budget -= transfer_res.gas_fee + estimate_forward_fee(transfer_res.msg, SendRemainingBalance);
    //     self.broker = transfer_res.broker;
    //     self.jetton_wallet = transfer_res.jetton_wallet;

    //     let builder: Builder = beginCell();
    //     while(msg.target_messages.refs() > 0) {
    //         payload = msg.target_messages.loadRef().beginParse();
    //         let target_res: MessageAndValue = self.process_target_result(payload);
    //         payload.endParse();
    //         budget -= target_res.value + estimate_forward_fee(target_res.msg, SendPayGasSeparately);
    //         builder.storeRef(target_res.msg);
    //     }
    //     self.packed_messages = builder.endCell();

    //     budget -= getComputeFee(0, gasConsumed() - gas_start + self.CONPENSATION_GAS);
    //     require(budget >= 0, "Not enough budget");

    //     // send transfer message
    //     nativeSendMessage(transfer_res.msg, SendRemainingBalance);
    // }

    receive(msg: UpdatePubkey) {
        self.require_eoa_owner();

        self.pubkey = msg.pubkey;
    }

    receive(msg: PrePay) {
        let gas_0: Int = gasConsumed();

        self.require_entrypoint();

        let left_balance: Int = myBalance() - msg.amount;
        require(left_balance >= 0, "Insufficient balance");
        nativeReserve(left_balance, SendRemainingBalance);

        let sinit: StateInit = self.get_smart_account_init(msg.receiver_pubkey);
        let receiver: Address = contractAddress(sinit);

        let gas_1: Int = gasConsumed();

        let exec_msg: Cell = pack_message(
            false,
            receiver,
            0,
            Execute {
                gas: 0,
                forward_fee: 0,
                from_pubkey: self.pubkey,
                payload: msg.payload
            }.toCell(),
            sinit.code,
            sinit.data,
        );

        let gas_2: Int = gasConsumed();
        let fwd_fee: Int = msg.forward_fee + estimate_forward_fee(exec_msg, SendRemainingBalance);
        let gas_consumption: Int = msg.gas - gas_0 + (gas_2 - gas_1);
        gas_consumption += gasConsumed();

        exec_msg = pack_message(
            false,
            receiver,
            0,
            Execute {
                gas: gas_consumption,
                forward_fee: fwd_fee,
                from_pubkey: self.pubkey,
                payload: msg.payload
            }.toCell(),
            sinit.code,
            sinit.data,
        );
        nativeSendMessage(exec_msg, SendRemainingBalance);
    }

    receive(msg: JettonPrePay) {
        let gas_0: Int = gasConsumed();

        self.require_entrypoint();

        let jetton_fee: Int = msg.jetton_payload.loadCoins();
        let jetton_wallet_address: Address = msg.jetton_payload.loadAddress();
        let jetton_amount: Int = msg.jetton_payload.loadCoins();
        let custom_payload: Cell? = null;
        if (msg.jetton_payload.loadBool()) {
            custom_payload = msg.jetton_payload.loadRef();
        }
        msg.jetton_payload.endParse();

        let gas_1: Int = gasConsumed();

        let contract_address: Address = myAddress();
        let ton_amount: Int = jetton_fee + msg.ton_amount;
        let forward_payload: Slice = beginCell()
            .storeUint(msg.gas, 64)
            .storeCoins(msg.fee)
            .storeRef(msg.payload)
            .asSlice();
        let transfer_msg: Cell = pack_message(
            false,
            jetton_wallet_address,
            ton_amount,
            JettonTransfer {
                query_id: 0,
                amount: jetton_amount,
                destination: msg.destination,
                response_destination: contract_address,
                custom_payload: custom_payload,
                forward_ton_amount: msg.ton_amount,
                forward_payload: forward_payload
            }.toCell(),
            null,
            null,
        );

        let gas_2: Int = gasConsumed();
        let fee: Int = msg.fee + jetton_fee + estimate_forward_fee(transfer_msg, SendPayGasSeparately);
        let gas_consumption: Int = msg.gas - gas_0 + (gas_2 - gas_1);
        gas_consumption += gasConsumed();

        forward_payload = beginCell()
            .storeUint(gas_consumption, 64)
            .storeCoins(fee)
            .storeRef(msg.payload)
            .asSlice();
        transfer_msg = pack_message(
            false,
            jetton_wallet_address,
            ton_amount,
            JettonTransfer {
                query_id: 0,
                amount: jetton_amount,
                destination: msg.destination,
                response_destination: contract_address,
                custom_payload: custom_payload,
                forward_ton_amount: msg.ton_amount,
                forward_payload: forward_payload
            }.toCell(),
            null,
            null,
        );
        nativeSendMessage(exec_msg, SendPayGasSeparately);
    }

    receive(msg: Execute) {
        let gas_0: Int = gasConsumed();

        self.require_smart_account(msg.from_pubkey);

        let to: Address = msg.payload.loadAddress();
        let value: Int = msg.payload.loadCoins();
        let body: Cell? = null;
        if (msg.payload.loadBool()) {
            body = msg.payload.loadRef();
        }
        let code: Cell? = null;
        if (msg.payload.loadBool()) {
            code = msg.payload.loadRef();
        }
        let data: Cell? = null;
        if (msg.payload.loadBool()) {
            data = msg.payload.loadRef();
        }

        let main_msg: Cell = pack_message(
            false,
            to,
            value,
            body,
            code,
            data,
        );
        // send the execution message
        nativeSendMessage(main_msg, SendPayGasSeparately);

        let gas_1: Int = gasConsumed();

        let receipt_msg: Cell = pack_message(
            false,
            self.entrypoint,
            0,
            ExecutionReceipt { gas: 0, fwd_fee: 0 }.toCell(),
            null,
            null,
        );

        let gas_2: Int = gasConsumed();
        let fwd_fee: Int = msg.forward_fee
            + estimate_forward_fee(main_msg, SendPayGasSeparately)
            + estimate_forward_fee(receipt_msg, SendPayGasSeparately);
        let gas_consumption: Int = msg.gas - gas_0 + (gas_2 - gas_1);
        gas_consumption += gasConsumed();

        receipt_msg = pack_message(
            false,
            self.entrypoint,
            0,
            ExecutionReceipt { gas: gas_comsumption, fwd_fee: fwd_fee }.toCell(),
            null,
            null,
        );
        // send the receipt message
        nativeSendMessage(receipt_msg, SendPayGasSeparately);
    }

    receive(msg: ExecuteByEntrypoint) {
        let gas_start: Int = gasConsumed();

        self.require_entrypoint();

        let to: Address = msg.payload.loadAddress();
        let value: Int = msg.payload.loadCoins();
        let body: Cell? = null;
        if (msg.payload.loadBool()) {
            body = msg.payload.loadRef();
        }
        let code: Cell? = null;
        if (msg.payload.loadBool()) {
            code = msg.payload.loadRef();
        }
        let data: Cell? = null;
        if (msg.payload.loadBool()) {
            data = msg.payload.loadRef();
        }

        let exec_msg: Cell = pack_message(
            false,
            to,
            value,
            body,
            code,
            data,
        );
        // send the execution message
        nativeSendMessage(exec_msg, SendPayGasSeparately);

        let gas_mid: Int = gasConsumed();

        let receipt_msg: Cell = pack_message(
            false,
            self.entrypoint,
            0,
            ExecutionReceipt { gas: 0, fwd_fee: 0 }.toCell(),
            null,
            null,
        );

        let gas_end: Int = gasConsumed();
        let fwd_fee: Int = estimate_forward_fee(exec_msg, SendPayGasSeparately)
            + estimate_forward_fee(receipt_msg, SendPayGasSeparately);
        let gas_comsumption: Int = gas_end - gas_start + (gas_end - gas_mid);

        receipt_msg = pack_message(
            false,
            self.entrypoint,
            0,
            ExecutionReceipt {
                gas: msg.gas + gas_comsumption,
                fwd_fee: msg.fwd_fee + fwd_fee
            }.toCell(),
            null,
            null,
        );
        // send the receipt message
        nativeSendMessage(receipt_msg, SendPayGasSeparately);
    }

    receive(msg: JettonTransferNotification) {
        let gas_start: Int = gasConsumed();

        let contract_address: Address = myAddress();
        let jetton_wallet: Address = sender();
        let fwd_msg: Cell = pack_message(
            false,
            self.entrypoint,
            0,
            ValidateJettonTransfer {
                gas: 0,
                fwd_fee: 0,
                from: msg.from,
                to: contract_address,
                jetton_wallet: jetton_wallet,
                payload: msg.forward_payload
            }.toCell(),
            null,
            null,
        );

        let gas_comsumption: Int = gasConsumed() - gas_start;
        let fwd_fee: Int = estimate_forward_fee(fwd_msg, SendRemainingValue);

        // rebuilt the message with forward fee and gas consumption
        fwd_msg = pack_message(
            false,
            self.entrypoint,
            0,
            ValidateJettonTransfer {
                gas: gas_comsumption * 2,
                fwd_fee: fwd_fee,
                jetton_wallet: msg.from,
                from: msg.from,
                payload: msg.forward_payload,
            }.toCell(),
            null,
            null,
        );
        nativeSendMessage(fwd_msg, SendRemainingValue);
    }

    receive(msg: JettonExcesses) {
        // receive excess TON
    }

    fun process_jetton_transfer_result(broker: Address, payload: Slice): TransferResult {
        let jetton_amount: Int = payload.loadCoins();
        let jetton_gas_fee: Int = payload.loadCoins();
        let jetton_wallet: Address = payload.loadAddress();
        let jetton_wallet_code: Cell = payload.loadRef();
        let jetton_wallet_data: Cell = payload.loadRef();

        let msg: Cell = pack_message(
            false,
            jetton_wallet,
            0, // no value, cuz we will send with remaining balance
            JettonTransfer {
                query_id: 0,
                amount: jetton_amount,
                destination: broker,
                response_destination: myAddress(),
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().storeBool(false).asSlice()
            }.toCell(),
            jetton_wallet_code,
            jetton_wallet_data,
        );
        return TransferResult {
            jetton_wallet: jetton_wallet,
            msg: msg,
            gas_fee: jetton_gas_fee,
        };
    }

    fun process_target_result(payload: Slice): TargetResult {
        let to: Address = payload.loadAddress();
        let value: Int = payload.loadCoins();
        let body: Cell? = null;
        if (payload.loadBool()) {
            body = payload.loadRef();
        }
        let code: Cell? = null;
        if (payload.loadBool()) {
            code = payload.loadRef();
        }
        let data: Cell? = null;
        if (payload.loadBool()) {
            data = payload.loadRef();
        }

        let msg: Cell = pack_message(
            false,
            to,
            value,
            body,
            code,
            data,
        );
        return TargetResult {
            value: value,
            msg: msg
        };
    }

    inline fun require_entrypoint() {
        require(sender() == self.entrypoint, "Invalid sender");
    }

    inline fun require_eoa_owner() {
        let from: Address = sender();
        require(
            from == self.eoa_owner || self.external_owners.get(from) == true,
            "Invalid sender",
        );
    }

    inline fun require_locked() {
        require(
            self.broker != null && self.jetton_wallet != null && self.message != null,
            "Unlocked",
        );
    }

    inline fun require_unlocked() {
        require(
            self.broker == null && self.jetton_wallet == null && self.message == null,
            "Locked",
        );
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet!!, "Invalid sender");
    }

    inline fun require_smart_account(pubkey: Slice) {
        require(sender() == self.get_smart_account_address(pubkey), "Invalid sender");
    }

    inline fun get_smart_account_address(pubkey: Slice): Address {
        let sinit: StateInit = self.get_smart_account_init(pubkey);
        return contractAddress(sinit);
    }

    abstract inline fun get_smart_account_init(pubkey: Slice): StateInit;
}