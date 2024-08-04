import "@stdlib/deploy";
import "./entrypoint";
import "./light_client";
import "./messages";
import "./smart_account";

contract Entrypoint with BaseEntrypoint, Deployable {
    override const storageReserve: Int = ton("0.1");

    owner: Address;

    admin_pubkey: Int as uint256;
    broker_status: map<Address, Bool>;
    stranded_assets: map<Address, Int as coins>;
    light_client: Address;

    init(owner: Address, light_client: Address) {
        self.owner = owner;
        self.admin_pubkey = 0;
        self.broker_status = emptyMap();
        self.stranded_assets = emptyMap();
        self.light_client = light_client;
    }

    override inline fun get_smart_account_init(pubkey: Cell): StateInit {
        return initOf SmartAccount(pubkey, myAddress());
    }
}

contract LightClient with BaseLightClient, Deployable {
    override const storageReserve: Int = ton("1.0");

    owner: Address;

    storage_index: Int as uint64;
    kontos_sim_headers: map<Int as uint64, Int as uint256>;
    tip: Int as uint64;

    init(owner: Address) {
        self.owner = owner;
        self.storage_index = 0;
        self.kontos_sim_headers = emptyMap();
        self.tip = 0;
    }
}

contract SmartAccount with BaseSmartAccount {

    pubkey: Cell;
    nonce: Int as uint64;
    eoa_owner: Address?;
    external_owners: map<Address, Bool>;
    entrypoint: Address;

    init(pubkey: Cell, entrypoint: Address) {
        self.pubkey = pubkey;
        self.nonce = 0;
        self.eoa_owner = null;
        self.external_owners = emptyMap();
        self.entrypoint = entrypoint;
    }

    override inline fun get_smart_account_init(pubkey: Cell): StateInit {
        return initOf SmartAccount(pubkey, self.entrypoint);
    }
}
