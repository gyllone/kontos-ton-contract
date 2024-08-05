import "./messages";


trait BaseLightClient {

    const MAX_LIGHT_HEADERS: Int = 5000;

    entrypoint: Address;
    storage_index: Int; 
    kontos_sim_headers: map<Int as uint64, Int as uint256>;
    tip: Int;

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