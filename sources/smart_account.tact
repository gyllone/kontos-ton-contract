
import "./library/builtins";
import "./library/helper";
import "./messages";

trait BaseSmartAccount {

    const MAX_EXTERNAL_OWNERS: Int = 100;
    const GAS_COMPENSATION: Int = 10000;

    pubkey: Cell; // reserved for future use, secp256r1 pubkey
    nonce: Int;
    eoa_owner: Address?;
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

        while(msg.exec_payload.refs() > 0) {
            let mode: Int = msg.exec_payload.loadUint(8);
            let m: Cell = msg.exec_payload.loadRef();
            nativeSendMessage(m, mode);
        }
    }

    receive(msg: UpdatePubkey) {
        self.require_eoa_owner();

        self.pubkey = msg.pubkey;

        send(SendParameters {
            bounce: false,
            to: sender(),
            value: 0,
            mode: SendRemainingValue | SendPayGasSeparately
        });
    }

    receive(msg: PrePay) {
        self.require_entrypoint();

        let refund_fee: Int = msg.init_value + compute_gas_fee(self.GAS_COMPENSATION);

        let sinit: StateInit = self.get_smart_account_init(msg.user_pubkey);
        if (msg.jetton_payload != null) {
            // check deployment first
            send(SendParameters {
                bounce: true,
                to: contractAddress(sinit),
                value: 0,
                mode: SendRemainingBalance,
                body: CheckDeployment {
                    refund_fee: refund_fee,
                    executor: msg.executor,
                    user_nonce: msg.user_nonce,
                    broker_pubkey: self.pubkey,
                    ton_amount: msg.ton_amount,
                    jetton_payload: msg.jetton_payload!!,
                    exec_payload: msg.exec_payload
                }.toCell(),
                code: sinit.code,
                data: sinit.data
            });
        } else {
            // prepay and execute
            send(SendParameters {
                bounce: true,
                to: contractAddress(sinit),
                value: msg.ton_amount + refund_fee,
                mode: SendPayGasSeparately,
                body: Execute {
                    refund_fee: refund_fee,
                    executor: msg.executor,
                    user_nonce: msg.user_nonce,
                    broker_pubkey: self.pubkey,
                    exec_payload: msg.exec_payload
                }.toCell(),
                code: sinit.code,
                data: sinit.data
            });
        }
    }

    receive(msg: CheckDeployment) {
        self.require_smart_account(msg.broker_pubkey);

        self.nonce = msg.user_nonce;

        send(SendParameters {
            bounce: true,
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            body: JettonPrepay {
                refund_fee: msg.refund_fee,
                executor: msg.executor,
                user_pubkey: self.pubkey,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
        });
    }

    receive(msg: JettonPrepay) {
        self.require_smart_account(msg.user_pubkey);

        let jetton_payload: Slice = msg.jetton_payload.beginParse();
        let jetton_fee: Int = jetton_payload.loadCoins();
        let jetton_wallet_address: Address = jetton_payload.loadAddress();
        let jetton_amount: Int = jetton_payload.loadCoins();
        let custom_payload: Cell? = null;
        if (jetton_payload.loadBool()) {
            custom_payload = jetton_payload.loadRef();
        }
        jetton_payload.endParse();

        let forward_payload: Slice = beginCell()
            .storeCoins(msg.refund_fee)
            .storeAddress(msg.executor)
            .storeRef(self.pubkey)
            .storeSlice(msg.exec_payload)
            .asSlice();
        let ton_amount: Int = msg.ton_amount + msg.refund_fee;
        // prepay jetton
        send(SendParameters {
            bounce: false,
            to: jetton_wallet_address,
            value: jetton_fee + ton_amount,
            mode: SendPayGasSeparately,
            body: JettonTransfer {
                query_id: 0,
                amount: jetton_amount,
                destination: sender(),
                response_destination: myAddress(),
                custom_payload: custom_payload,
                forward_ton_amount: ton_amount,
                forward_payload: forward_payload
            }.toCell(),
        });
    }

    receive(msg: Execute) {
        self.require_entrypoint_or_smart_account(msg.broker_pubkey);
        if (msg.user_nonce != null) {
            self.nonce = msg.user_nonce!!;
        }

        // refund to the executor
        send(SendParameters {
            bounce: false,
            to: msg.executor,
            value: msg.refund_fee,
            mode: SendPayGasSeparately
        });

        // send the execution messages
        while(msg.exec_payload.refs() > 0) {
            let mode: Int = msg.exec_payload.loadUint(8);
            let m: Cell = msg.exec_payload.loadRef();
            nativeSendMessage(m, mode);
        }
    }

    receive(msg: JettonTransferNotification) {
        let refund_fee: Int = msg.forward_payload.loadCoins();
        let executor: Address = msg.forward_payload.loadAddress();
        let broker_pubkey: Cell = msg.forward_payload.loadRef();
        let exec_payload: Slice = msg.forward_payload;

        send(SendParameters {
            bounce: true,
            to: self.entrypoint,
            value: 0,
            mode: SendRemainingBalance,
            body: ValidateJettonTransfer {
                refund_fee: refund_fee,
                executor: executor,
                broker_pubkey: broker_pubkey,
                user_pubkey: self.pubkey,
                jetton_wallet: sender(),
                exec_payload: exec_payload
            }.toCell(),
        });
    }

    receive(msg: JettonExcesses) {
        // receive excess TON
    }

    inline fun require_entrypoint() {
        require(sender() == self.entrypoint, "Invalid sender");
    }

    inline fun require_smart_account(pubkey: Cell) {
        require(sender() == self.get_smart_account_address(pubkey), "Invalid sender");
    }

    inline fun require_entrypoint_or_smart_account(pubkey: Cell) {
        let from: Address = sender();
        require(
            from == self.entrypoint || from == self.get_smart_account_address(pubkey),
            "Invalid sender",
        );
    }

    inline fun require_eoa_owner() {
        let from: Address = sender();
        if (self.eoa_owner != null) {
            require(
                from == self.eoa_owner!! || self.external_owners.get(from) == true,
                "Invalid sender",
            );
        } else {
            require(self.external_owners.get(from) == true, "Invalid sender");
        }
    }

    inline fun get_smart_account_address(pubkey: Cell): Address {
        let sinit: StateInit = self.get_smart_account_init(pubkey);
        return contractAddress(sinit);
    }

    abstract inline fun get_smart_account_init(pubkey: Cell): StateInit;
}