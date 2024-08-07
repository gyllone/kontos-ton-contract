import "./messages";


trait BaseLightClient {

    const MAX_LIGHT_HEADERS: Int = 5000;

    entrypoint: Address;
    storage_index: Int;
    kontos_sim_headers: map<Int as uint64, Int as uint256>;
    tip: Int;
    used_op_hash: map<Int as uint256, Bool>;

    receive() {
        // receive ton
    }

    receive(msg: UpdateBlockHeaders) {
        self.require_entrypoint();

        let last_number: Int = 0;
        let min_number: Int = self.min_number();
        let max_number: Int = self.max_number();

        last_number = self.update_block_headers_payload(
            last_number,
            min_number,
            max_number,
            msg.payload,
        );

        if (last_number > self.tip) {
            self.tip = last_number;
        }

        self.forward(msg.cashback, null, false, null);
    }

    receive(msg: CheckOpHash) {
        self.require_entrypoint();

        require(self.used_op_hash.get(msg.digest) == null, "Op already used");

        self.used_op_hash.set(msg.digest, true);

        send(SendParameters {
            bounce: false,
            to: self.entrypoint,
            value: 0,
            mode: SendRemainingValue,
            body: PrepayAndHandleOp {
                init_value: msg.init_value,
                executor: msg.executor,
                storage_index: self.storage_index,
                broker_pubkey: msg.broker_pubkey,
                user_pubkey: msg.user_pubkey,
                user_nonce: msg.user_nonce,
                ton_amount: msg.ton_amount,
                jetton_payload: msg.jetton_payload,
                exec_payload: msg.exec_payload
            }.toCell(),
        });
    }

    // receive(msg: HandleOpWithPrePay) {
    //     let gas_0: Int = gasConsumed();

    //     require(msg.valid_until >= now(), "Expired");
    //     require(msg.storage_index == self.storage_index, "Invalid storage index");

    //     let digest: Int = beginCell()
    //         .storeAddress(self.entrypoint)
    //         .storeUint(self.storage_index, 64)
    //         .storeUint(self.valid_until, 64)
    //         .storeRef(msg.broker_address)
    //         .storeRef(msg.user_pubkey)
    //         .storeUint(self.user_nonce, 64)
    //         .storeCoins(msg.amount)
    //         .storeRef(msg.exec_payload)
    //         .hash();
    //     require(self.used_op_hash.get(digest) == null, "Op already used");

    //     self.used_op_hash.set(digest, true);

        
    // }

    fun update_block_headers_payload(last_number: Int, min_number: Int, max_number: Int, payload: Slice): Int {
        while(payload.bits() >= 64 + 256) {
            let number: Int = payload.loadUint(64);
            require(number >= max(last_number, min_number) && number < max_number, "Block number out of range");

            let hash: Int = payload.loadUint(256);
            let prev_hash: Int? = self.kontos_sim_headers.get(number);
            if (prev_hash != null) {
                require(prev_hash!! == hash, "Block hash mismatch");
            } else {
                self.kontos_sim_headers.set(number, hash);
            }

            last_number = number;
        }

        while(payload.refs() > 0) {
            let p: Slice = payload.loadRef().beginParse();
            last_number = self.update_block_headers_payload(last_number, min_number, max_number, p);
            p.endParse();
        }

        return last_number;
    }

    inline fun min_number(): Int {
        return self.storage_index * self.MAX_LIGHT_HEADERS;
    }

    inline fun max_number(): Int {
        return (self.storage_index + 1) * self.MAX_LIGHT_HEADERS;
    }

    inline fun require_entrypoint() {
        require(sender() == self.entrypoint, "Invalid sender");
    }

    // === getters ===

    get fun get_storage_index(): Int {
        return self.storage_index;
    }

    get fun get_kontos_sim_header(number: Int): Int? {
        return self.kontos_sim_headers.get(number);
    }

    get fun get_tip(): Int {
        return self.tip;
    }
}