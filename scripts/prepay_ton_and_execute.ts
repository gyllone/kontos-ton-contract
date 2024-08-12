import { Address, beginCell, Cell, toNano } from "@ton/core";
import { sign } from "@ton/crypto";
import { Entrypoint } from "../output/contract_Entrypoint";
import { Client, Deployments } from "./constants";
import { } from "./utils/p256";
import { getUserKeyPair, getAdminKeyPair, getWalletV4 } from "./utils/keypair";
import { SendParameters, build_exec_payload } from "./utils/exec_builder";

import * as dotenv from "dotenv";
dotenv.config();

function build_send_ton_payload(
    to: Address,
    value: bigint,
    mode: bigint = BigInt(0),
): Cell {
    return build_exec_payload({
        bounce: true,
        to: to,
        value: value,
        mode: mode,
        body: null,
        code: null,
        data: null,
    });
}

async function main() {
    // Parameters
    const userKeypair = await getUserKeyPair();
    const adminKeypair = await getAdminKeyPair();
    const wallet = await getWalletV4(userKeypair);
    const sender = Client.open(wallet).sender(userKeypair.secretKey);

    // valid for 5 min
    const validUntil = BigInt(Math.ceil(Date.now() / 1000) + 5 * 60);
    const storageIndex = BigInt(0);
    const jetton_payload = null;
    const send_ton_payload = build_send_ton_payload(
        Address.parse("0"),
        toNano("1"),
    );
    const payload = beginCell()
        .storeMaybeRef(jetton_payload)
        .storeRef(send_ton_payload)
        .endCell();


    // Sign message with another keypair
    const content = beginCell().storeInt(0x01, 8).storeStringRefTail(BadgeCollectionUrl).endCell();
    const collection = await BadgeCollection.fromInit(wallet.address, content);

    // expired after 5 min
    const expiration = BigInt(Math.ceil(Date.now() / 1000) + 5 * 60);
    const item_index = BigInt(0);
    const digest = beginCell()
        .storeAddress(collection.address)
        .storeAddress(wallet.address)
        .storeUint(item_index, 64)
        .storeUint(expiration, 64)
        .endCell()
        .hash();
    // Keypair2 should be stored backend
    const keypair2 = await getKeyPair2();
    const sig = sign(digest, keypair2.secretKey);

    await Client.open(collection).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "MintBadgeItem",
            index: item_index,
            expiration: expiration,
            signature: beginCell().storeBuffer(sig).endCell(),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});