
import "./builtins.fc";

@name(set_code)
native setCode(code: Cell);

@name(get_compute_fee)
native getComputeFee(workchain: Int, gasUsed: Int): Int;

@name(send_message)
native sendMessage(msg: Cell, mode: Int): Int;

@name(gas_consumed)
native gasConsumed(): Int;

@name(check_p256_signature)
native checkP256Signature(hash: Int, signature: Slice, public_key: Slice): Bool;

@name(check_data_p256_signature)
native checkDataP256Signature(data: Slice, signature: Slice, public_key: Slice): Bool;
