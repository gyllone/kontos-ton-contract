
import "./library/builtins";
import "./library/helper";
import "./messages";

trait BaseSmartAccount {

    const MAX_EXTERNAL_OWNERS: Int = 100;

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

        let sinit: StateInit = self.get_smart_account_init(msg.user_pubkey);
        // prepay and execute
        send(SendParameters {
            bounce: true,
            to: contractAddress(sinit),
            value: msg.amount,
            mode: SendPayGasSeparately,
            body: Execute {
                broker_pubkey: self.pubkey,
                exec_payload: msg.exec_payload
            }.toCell(),
            code: sinit.code,
            data: sinit.data
        });

        // pay to executor
        send(SendParameters {
            bounce: false,
            to: msg.executor,
            value: msg.executor_fee,
            mode: SendPayGasSeparately
        });
    }

    receive(msg: JettonPrePay) {
        self.require_entrypoint();

        let sinit: StateInit = self.get_smart_account_init(msg.user_pubkey);
        send(SendParameters {
            bounce: true,
            to: contractAddress(sinit),
            value: 0,
            mode: SendPayGasSeparately,
            body: CheckDeployment {
                broker_pubkey: self.pubkey,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
            code: sinit.code,
            data: sinit.data
        });

        // pay to executor
        send(SendParameters {
            bounce: false,
            to: msg.executor,
            value: msg.executor_fee,
            mode: SendPayGasSeparately
        });
    }

    receive(msg: CheckDeployment) {
        self.require_smart_account(msg.broker_pubkey);

        send(SendParameters {
            bounce: true,
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            body: JettonPrePayInternal {
                user_pubkey: self.pubkey,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
        });
    }

    receive(msg: JettonPrePayInternal) {
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
            .storeRef(self.pubkey)
            .storeSlice(msg.exec_payload)
            .asSlice();
        // prepay jetton
        send(SendParameters {
            bounce: false,
            to: jetton_wallet_address,
            value: jetton_fee + msg.ton_amount,
            mode: SendPayGasSeparately,
            body: JettonTransfer {
                query_id: 0,
                amount: jetton_amount,
                destination: sender(),
                response_destination: myAddress(),
                custom_payload: custom_payload,
                forward_ton_amount: msg.ton_amount,
                forward_payload: forward_payload
            }.toCell(),
        });
    }

    receive(msg: Execute) {
        self.require_entrypoint_or_smart_account(msg.broker_pubkey);

        // send the execution messages
        while(msg.exec_payload.refs() > 0) {
            let mode: Int = msg.exec_payload.loadUint(8);
            let m: Cell = msg.exec_payload.loadRef();
            nativeSendMessage(m, mode);
        }
    }

    receive(msg: JettonTransferNotification) {
        let broker_pubkey: Cell = msg.forward_payload.loadRef();
        let exec_payload: Slice = msg.forward_payload;

        send(SendParameters {
            bounce: true,
            to: self.entrypoint,
            value: 0,
            mode: SendRemainingBalance,
            body: ValidateJettonTransfer {
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