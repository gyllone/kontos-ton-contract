import { beginCell, toNano } from "@ton/core";
import { SmartAccount } from "../../output/contract_SmartAccount";
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
    const brokerSmartAccount = await SmartAccount.fromInit(brokerPubkey, Deployments.Entrypoint);
    await Client.open(brokerSmartAccount).send(
        sender,
        { value: toNano("0.6") },
        "receive or deploy",
    );
    console.log("Broker Smart Account:", brokerSmartAccount.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});