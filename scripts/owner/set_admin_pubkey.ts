import { toNano } from "@ton/core";
import { Entrypoint } from "../../output/contract_Entrypoint";
import { Client, Deployments } from "../constants";
import { getUserKeyPair, getAdminKeyPair, getWalletV4 } from "../utils/keypair";

async function main() {
    // Parameters
    const userKeypair = await getUserKeyPair();
    const adminKeypair = await getAdminKeyPair();
    const wallet = await getWalletV4(userKeypair);
    const sender = Client.open(wallet).sender(userKeypair.secretKey);

    const entrypoint = Entrypoint.fromAddress(Deployments.Entrypoint);
    await Client.open(entrypoint).send(
        sender,
        { value: toNano("0.05") },
        {
            $$type: "SetAdminPubkey",
            pubkey: BigInt(`0x${adminKeypair.publicKey.toString("hex")}`)
        },
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});