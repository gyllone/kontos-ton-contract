import "@stdlib/ownable";
import "./messages";


trait BaseEntrypoint {

    admin_pubkey: Int;
    broker_status: map<Address, Bool>;
    stranded_assets: map<Address, Int>;
    light_client: Address;

    receive(msg: HandleOps) {
        
    }

    receive(msg: HandleKontosProof) {

    }

    fun verify_sig_for_batch_execute(msg: BatchExecuteByEntrypoint) {
        require(self.nonce == msg.nonce, "Invalid nonce");
        let digest: Int = beginCell()
            .storeUint(self.nonce, 64)
            .storeAddress(myAddress())
            .storeAddress(msg.broker)
            .storeCoins(msg.user_borne)
            .storeRef(msg.jetton_message)
            .storeSlice(msg.target_messages)
            .endCell()
            .hash();
        require(
            checkSignature(digest, msg.signature, self.admin_pubkey),
            "Invalid signature",
        );

        self.nonce += 1;
    }

    inline fun get_smart_account_address(pubkey: Slice): Address {
        let sinit: StateInit = self.get_smart_account_init(pubkey);
        return contractAddress(sinit);
    }

    abstract inline fun get_smart_account_init(pubkey: Slice): StateInit;
}