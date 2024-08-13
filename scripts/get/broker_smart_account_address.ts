import { beginCell } from "@ton/core";
import { SmartAccount } from "../../output/contract_SmartAccount";
import { Deployments, P256Pubkeys } from "../constants";

async function main() {
    const brokerPubkey = beginCell().storeBuffer(P256Pubkeys.Broker).endCell();
    const brokerSmartAccount = await SmartAccount.fromInit(brokerPubkey, Deployments.Entrypoint);
    console.log("Broker Smart Account:", brokerSmartAccount.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});