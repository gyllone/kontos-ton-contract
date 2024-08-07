import { toNano } from "@ton/core";
import { Entrypoint } from "../../output/contract_Entrypoint";
import { Client, JettonData } from "../constants";
import { getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const deposit_vault = await DepositVault.fromInit(wallet.address, JettonData.Master, JettonData.WalletCode);
    await Client.open(deposit_vault).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Deposit vault address", deposit_vault.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});