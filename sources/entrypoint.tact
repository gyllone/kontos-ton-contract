import "@stdlib/ownable";
import "./library/helper";
import "./messages";


trait BaseEntrypoint with OwnableTransferable {

    const GAS_COMPENSATION: Int = 10000;

    owner: Address;

    admin_pubkey: Int;
    broker_status: map<Address, Bool>;
    stranded_assets: map<Address, Int>;
    light_client: Address;

    receive() {
        // receive ton
    }

    receive(msg: SetAdminPubkey) {
        self.requireOwner();
        self.admin_pubkey = msg.pubkey;

        self.notify(null);
    }

    receive(msg: HandleOpWithPrePay) {
        let gas_0: Int = gasConsumed();

        let executor: Address = sender();
        let broker_address: Address = self.get_smart_account_address(msg.broker_pubkey);
        self.require_broker_valid(broker_address);

        let gas_1: Int = gasConsumed();
        let prepay_msg: Cell = pack_message(
            false,
            broker_address,
            0,
            PrePay {
                executor: executor,
                executor_fee: 0,
                user_pubkey: msg.user_pubkey,
                amount: msg.amount,
                exec_payload: msg.exec_payload
            }.toCell(),
            null,
            null,
        );
        let gas_2: Int = gasConsumed();

        let refund_msg: Cell = pack_message(
            false,
            executor,
            0,
            null,
            null,
            null,
        );

        let fee: Int = estimate_forward_fee(prepay_msg, SendPayGasSeparately);
        fee += estimate_forward_fee(refund_msg, SendRemainingValue);
        let gas: Int = self.GAS_COMPENSATION - gas_0 + (gas_2 - gas_1);
        gas += gasConsumed();
        fee += compute_gas_fee(gas);

        prepay_msg = pack_message(
            false,
            broker_address,
            0,
            PrePay {
                executor: executor,
                executor_fee: fee,
                user_pubkey: msg.user_pubkey,
                amount: msg.amount,
                exec_payload: msg.exec_payload
            }.toCell(),
            null,
            null,
        );
        nativeSendMessage(prepay_msg, SendPayGasSeparately);
        nativeSendMessage(refund_msg, SendRemainingValue);
    }

    receive(msg: HandleOpWithJettonPrePay) {
        let gas_0: Int = gasConsumed();

        let executor: Address = sender();
        let broker_address: Address = self.get_smart_account_address(msg.broker_pubkey);
        self.require_broker_valid(broker_address);

        let gas_1: Int = gasConsumed();
        let prepay_msg: Cell = pack_message(
            false,
            broker_address,
            0,
            JettonPrePay {
                executor: executor,
                executor_fee: 0,
                user_pubkey: msg.user_pubkey,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
            null,
            null,
        );
        let gas_2: Int = gasConsumed();

        let refund_msg: Cell = pack_message(
            false,
            executor,
            0,
            null,
            null,
            null,
        );

        let fee: Int = estimate_forward_fee(prepay_msg, SendPayGasSeparately);
        fee += estimate_forward_fee(refund_msg, SendRemainingValue);
        let gas: Int = self.GAS_COMPENSATION - gas_0 + (gas_2 - gas_1);
        gas += gasConsumed();
        fee += compute_gas_fee(gas);

        prepay_msg = pack_message(
            false,
            broker_address,
            0,
            JettonPrePay {
                executor: executor,
                executor_fee: fee,
                user_pubkey: msg.user_pubkey,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
            null,
            null,
        );
        nativeSendMessage(prepay_msg, SendPayGasSeparately);
        nativeSendMessage(refund_msg, SendRemainingValue);
    }

    // receive(msg: HandleKontosProof) {

    // }

    receive(msg: ValidateJettonTransfer) {
        let broker_address: Address = self.get_smart_account_address(msg.broker_pubkey);
        self.require_broker_valid(broker_address);
        self.require_smart_account(msg.user_pubkey);
        // TODO: check jetton_wallet

        send(SendParameters {
            bounce: false,
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            body: Execute {
                broker_pubkey: msg.broker_pubkey,
                exec_payload: msg.exec_payload
            }.toCell()
        });
    }

    // fun verify_sig_for_batch_execute(msg: BatchExecuteByEntrypoint) {
    //     require(self.nonce == msg.nonce, "Invalid nonce");
    //     let digest: Int = beginCell()
    //         .storeUint(self.nonce, 64)
    //         .storeAddress(myAddress())
    //         .storeAddress(msg.broker)
    //         .storeCoins(msg.user_borne)
    //         .storeRef(msg.jetton_message)
    //         .storeSlice(msg.target_messages)
    //         .endCell()
    //         .hash();
    //     require(
    //         checkSignature(digest, msg.signature, self.admin_pubkey),
    //         "Invalid signature",
    //     );

    //     self.nonce += 1;
    // }

    inline fun require_broker_valid(broker: Address) {
        let status: Bool? = self.broker_status.get(broker);
        require(status != null && status!!, "Invalid broker");
    }

    inline fun require_smart_account(pubkey: Cell) {
        require(
            self.get_smart_account_address(pubkey) == sender(),
            "Invalid sender"
        );
    }

    inline fun get_smart_account_address(pubkey: Cell): Address {
        let sinit: StateInit = self.get_smart_account_init(pubkey);
        return contractAddress(sinit);
    }

    abstract inline fun get_smart_account_init(pubkey: Cell): StateInit;
}