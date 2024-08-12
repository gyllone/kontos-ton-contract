import { beginCell, toNano } from "@ton/core";
import { Entrypoint } from "../../output/contract_Entrypoint";
import { Client, Deployments } from "../constants";
import { P256Pubkeys } from "../utils/p256";
import { getUserKeyPair, getWalletV4 } from "../utils/keypair";

async function main() {
    // Parameters
    const userKeypair = await getUserKeyPair();
    const wallet = await getWalletV4(userKeypair);
    const sender = Client.open(wallet).sender(userKeypair.secretKey);

    const brokerPubkey = beginCell()
        .storeBuffer(P256Pubkeys.Broker)
        .endCell();
    const entrypoint = Entrypoint.fromAddress(Deployments.Entrypoint);
    await Client.open(entrypoint).send(
        sender,
        { value: toNano("0.05") },
        {
            $$type: "AddBroker",
            pubkey: brokerPubkey,
        },
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});