import "@stdlib/ownable";
import "./library/helper";
import "./messages";


trait BaseEntrypoint with OwnableTransferable {

    const GAS_COMPENSATION: Int = 10000;

    owner: Address;

    admin_pubkey: Int;
    broker_status: map<Address, Bool>;
    stranded_assets: map<Address, Int>;

    receive() {
        // receive ton
    }

    receive(msg: SetAdminPubkey) {
        self.requireOwner();
        self.admin_pubkey = msg.pubkey;

        self.notify(null);
    }

    receive(msg: PrepayAndHandleOpRequest) {
        let ctx: Context = context();

        require(msg.valid_until >= now(), "Expired");

        let digest: Int = beginCell()
            .storeAddress(myAddress())
            .storeBool(msg.pay_for_jetton)
            .storeUint(msg.valid_until, 64)
            .storeUint(msg.storage_index, 64)
            .storeRef(msg.broker_pubkey)
            .storeRef(msg.user_pubkey)
            .storeUint(msg.user_nonce, 64)
            .storeCoins(msg.ton_amount)
            .storeRef(msg.payload)
            .endCell()
            .hash();
        require(
            checkSignature(digest, msg.signature, self.admin_pubkey),
            "Invalid signature",
        );

        let payload: Slice = msg.payload.beginParse();
        let jetton_payload: Cell? = null;
        if (msg.pay_for_jetton) {
            jetton_payload = payload.loadRef();
        }
        let exec_payload: Cell = payload.loadRef();

        let origin_msg: Cell = pack_message(
            true,
            myAddress(),
            0,
            msg.toCell(),
            null,
            null,
        );
        let fwd_fee: Int = estimate_forward_fee(origin_msg, SendPayGasSeparately);
        send(SendParameters {
            bounce: false,
            to: self.get_light_client_address(msg.storage_index),
            value: 0,
            mode: SendRemainingValue,
            body: CheckOpHash {
                init_value: ctx.value + fwd_fee,
                executor: ctx.sender,
                digest: digest,
                broker_pubkey: msg.broker_pubkey,
                user_pubkey: msg.user_pubkey,
                user_nonce: msg.user_nonce,
                ton_amount: msg.ton_amount,
                jetton_payload: jetton_payload,
                exec_payload: exec_payload.beginParse()
            }.toCell(),
        });
    }

    receive(msg: PrepayAndHandleOp) {
        self.require_light_client(msg.storage_index);

        let broker_address: Address = self.get_smart_account_address(msg.broker_pubkey);
        self.require_broker_valid(broker_address);

        send(SendParameters {
            bounce: false,
            to: broker_address,
            value: 0,
            mode: SendRemainingValue,
            body: PrePay {
                init_value: msg.init_value,
                executor: msg.executor,
                user_pubkey: msg.user_pubkey,
                user_nonce: msg.user_nonce,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
        });
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
                refund_fee: msg.refund_fee,
                executor: msg.executor,
                user_nonce: null,
                broker_pubkey: msg.broker_pubkey,
                exec_payload: msg.exec_payload
            }.toCell()
        });
    }

    inline fun require_broker_valid(broker: Address) {
        let status: Bool? = self.broker_status.get(broker);
        require(status != null && status!!, "Invalid broker");
    }

    inline fun require_smart_account(pubkey: Cell) {
        require(
            sender() == self.get_smart_account_address(pubkey),
            "Invalid sender"
        );
    }

    inline fun require_light_client(storage_index: Int) {
        require(
            sender() == self.get_light_client_address(storage_index),
            "Invalid sender"
        );
    }

    inline fun get_smart_account_address(pubkey: Cell): Address {
        let sinit: StateInit = self.get_smart_account_init(pubkey);
        return contractAddress(sinit);
    }

    inline fun get_light_client_address(storage_index: Int): Address {
        let sinit: StateInit = self.get_light_client_init(storage_index);
        return contractAddress(sinit);
    }

    abstract inline fun get_smart_account_init(pubkey: Cell): StateInit;

    abstract inline fun get_light_client_init(storage_index: Int): StateInit;
}