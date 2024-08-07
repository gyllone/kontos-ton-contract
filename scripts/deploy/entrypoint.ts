import { toNano } from "@ton/core";
import { Entrypoint } from "../../output/contract_Entrypoint";
import { Client } from "../constants";
import { getUserKeyPair, getWalletV4 } from "../utils";

async function main() {
    // Parameters
    const keypair = await getUserKeyPair();
    const wallet = await getWalletV4(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const entrypoint = await Entrypoint.fromInit(wallet.address);
    await Client.open(entrypoint).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Entrypoint", entrypoint.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});