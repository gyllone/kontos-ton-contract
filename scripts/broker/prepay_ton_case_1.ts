import { Address, beginCell, Cell, SendMode, toNano } from "@ton/core";
import { sign } from "@ton/crypto";
import { Entrypoint } from "../../output/contract_Entrypoint";
import { SmartAccount } from "../../output/contract_SmartAccount";
import { Client, Deployments, P256Pubkeys } from "../constants";
import { getUserKeyPair, getAdminKeyPair, getWalletV4 } from "../utils/keypair";
import { build_exec_payload } from "../utils/exec_builder";

import * as dotenv from "dotenv";
dotenv.config();

function build_send_ton_payload(
    to: Address,
    value: bigint,
    mode: SendMode = SendMode.NONE,
): Cell {
    return build_exec_payload({
        bounce: true,
        to: to,
        value: value,
        mode: mode,
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
    const userNonce = BigInt(0);
    const tonAmount = toNano("0.4");
    const brokerPubkey = beginCell()
        .storeBuffer(P256Pubkeys.Broker)
        .endCell();
    const userPubkey = beginCell()
        .storeBuffer(P256Pubkeys.User)
        .endCell();
    const jettonPayload = null;
    // make receiver equals to broker
    const receiver = await SmartAccount.fromInit(brokerPubkey, Deployments.Entrypoint);
    const sendTonPayload = build_send_ton_payload(
        receiver.address,
        toNano("0.2"),
    );
    const payload = beginCell()
        .storeMaybeRef(jettonPayload)
        .storeRef(sendTonPayload)
        .endCell();
    const op_hash = beginCell()
        .storeAddress(Deployments.Entrypoint)
        .storeUint(validUntil, 64)
        .storeUint(storageIndex, 64)
        .storeRef(brokerPubkey)
        .storeRef(userPubkey)
        .storeUint(userNonce, 64)
        .storeCoins(tonAmount)
        .storeRef(payload)
        .endCell()
        .hash();
    const signature = sign(op_hash, adminKeypair.secretKey);

    const entrypoint = Entrypoint.fromAddress(Deployments.Entrypoint);
    await Client.open(entrypoint).send(
        sender,
        { value: toNano("1") },
        {
            $$type: "PrepayAndHandleOpRequest",
            valid_until: validUntil,
            storage_index: storageIndex,
            broker_pubkey: brokerPubkey,
            user_pubkey: userPubkey,
            user_nonce: userNonce,
            ton_amount: tonAmount,
            payload: payload,
            signature: beginCell().storeBuffer(signature).endCell(),
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});