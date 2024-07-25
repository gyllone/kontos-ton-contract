
import "./library/builtins";
import "./library/helper";
import "./message";

struct TransferResult {
    receiver: Address;
    jetton_wallet: Address;
    msg: Cell;
}

struct TargetResult {
    value: Int as coins;
    msg: Cell;
}

trait SmartAccount {

    const MAX_EXTERNAL_OWNERS: Int = 100;
    const CONPENSATION_GAS: Int = 10_000;

    pubkey: Slice;
    nonce: Int;
    eoa_owner: Address;
    external_owners: map<Address, Bool>;
    entrypoint: Address;

    receiver: Address?;
    jetton_wallet: Address?;
    packed_messages: Cell?;

    receive() {
        // receive ton
    }

    receive(msg: Upgrade) {
        self.require_entrypoint();

        setCode(msg.code);
    }

    receive(msg: ExecuteByEOA) {
        self.require_eoa_owner();

        while(msg.message.refs() > 0) {
            let mode: Int = msg.messages.loadUint(8);
            let msg: Cell = msg.messages.loadRef();
            nativeSendMessage(msg, mode);
        }
    }

    receive(msg: BatchExecuteByEntrypoint) {
        let gas_start: Int = gasConsumed();

        self.require_unlocked();
        self.require_entrypoint();

        let ctx: Context = context();
        let budget: Int = ctx.value + msg.user_borne;
        let reserve: Int = myBalance() - budget;
        require(reserve >= self.storageReserve, "Not enough balance");
        // reserve and send with remaining balance later
        nativeReserve(reserve, ReserveExact);

        // TODO: check signature

        // Notice: only increase nonce
        self.nonce += 1;

        let payload: Slice = msg.jetton_message.beginParse();
        let transfer_res: TransferResult = self.process_jetton_transfer_result(payload);
        payload.endParse();
        budget -= msg.jetton_fee + estimate_forward_fee(transfer_res.msg, SendRemainingBalance);
        self.receiver = transfer_res.receiver;
        self.jetton_wallet = transfer_res.jetton_wallet;

        let builder: Builder = beginCell();
        while(msg.target_messages.refs() > 0) {
            payload = msg.target_messages.loadRef().beginParse();
            let target_res: MessageAndValue = self.process_target_result(payload);
            payload.endParse();
            budget -= target_res.value + estimate_forward_fee(target_res.msg, SendPayGasSeparately);
            builder.storeRef(target_res.msg);
        }
        self.packed_messages = builder.endCell();

        budget -= getComputeFee(0, gasConsumed() - gas_start + self.CONPENSATION_GAS);
        require(budget >= 0, "Not enough budget");

        // send transfer message
        nativeSendMessage(transfer_res.msg, SendRemainingBalance);
    }

    receive(msg: UpdatePubkey) {
        self.require_eoa_owner();

        self.pubkey = msg.pubkey;
    }

    receive(msg: JettonExcesses) {
        self.require_locked();
        self.require_jetton_wallet();

        // jetton transfer is success, send the target message
    
        let receiver: Address = self.receiver!!;
        let payload: Slice = self.packed_messages!!.beginParse();
    
        // reset
        self.receiver = null;
        self.jetton_wallet = null;
        self.packed_messages = null;

        // send message
        while(payload.refs() > 0) {
            let msg: Cell = payload.loadRef();
            nativeSendMessage(msg, SendPayGasSeparately);
        }
        payload.endParse();

        // commit here, cuz refund is not neccessary
        commit();

        let refund_msg: Cell = pack_message(
            false,
            receiver,
            0,
            null,
            null,
            null,
        );
        nativeSendMessage(refund_msg, SendRemainingValue | SendIgnoreErrors);
    }

    fun process_jetton_transfer_result(payload: Slice): TransferResult {
        let jetton_amount: Int = payload.loadCoins();
        let receiver: Address = payload.loadAddress();
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
                destination: receiver,
                response_destination: myAddress(),
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().storeBool(false).asSlice()
            }.toCell(),
            jetton_wallet_code,
            jetton_wallet_data,
        );
        return TransferResult {
            receiver: receiver,
            jetton_wallet: jetton_wallet,
            msg: msg
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
            self.jetton_wallet != null && self.receiver != null && self.message != null,
            "Unlocked",
        );
    }

    inline fun require_unlocked() {
        require(
            self.jetton_wallet == null && self.receiver == null && self.message == null,
            "Locked",
        );
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet!!, "Invalid sender");
    }
}