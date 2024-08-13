import { beginCell } from "@ton/core";
import { SmartAccount } from "../../output/contract_SmartAccount";
import { Deployments, P256Pubkeys } from "../constants";

async function main() {
    const userPubkey = beginCell().storeBuffer(P256Pubkeys.User).endCell();
    const userSmartAccount = await SmartAccount.fromInit(userPubkey, Deployments.Entrypoint);
    console.log("User Smart Account:", userSmartAccount.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});