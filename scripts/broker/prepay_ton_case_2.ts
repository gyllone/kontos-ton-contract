import { Address, beginCell, Cell, SendMode, toNano } from "@ton/core";
import { sign } from "@ton/crypto";
import { Entrypoint } from "../../output/contract_Entrypoint";
import { SmartAccount } from "../../output/contract_SmartAccount";
import { Client, Deployments, P256Pubkeys } from "../constants";
import { getUserKeyPair, getAdminKeyPair, getWalletV4 } from "../utils/keypair";
import { build_exec_payload } from "../utils/exec_builder";
import { JettonWallet } from "../utils/jetton_transfer";

import * as dotenv from "dotenv";
dotenv.config();

function build_send_jetton_payload(
    jettonWallet: Address,
    from: Address,
    to: Address,
    amount: bigint,
    jettonGasFee: bigint = toNano("0.07"),
    forwardTonAmount: bigint = BigInt(0),
    customPayload?: Cell,
    forwardPayload?: Cell,
    mode: SendMode = SendMode.NONE,
): Cell {
    return build_exec_payload({
        bounce: true,
        to: jettonWallet,
        value: forwardTonAmount + jettonGasFee,
        mode: mode,
        body: JettonWallet.transferMessage(
            amount,
            to,
            from,
            forwardTonAmount,
            customPayload,
            forwardPayload,
        ),
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
    const tonAmount = toNano("0.2");
    const brokerPubkey = beginCell()
        .storeBuffer(P256Pubkeys.Broker)
        .endCell();
    const userPubkey = beginCell()
        .storeBuffer(P256Pubkeys.User)
        .endCell();
    const jettonPayload = null;
    // === start building jetton transfer payload ===
    const from = await SmartAccount.fromInit(userPubkey, Deployments.Entrypoint);
    const to = await SmartAccount.fromInit(brokerPubkey, Deployments.Entrypoint);
    const sendJettonPayload = build_send_jetton_payload(
        Address.parse("kQCAAoGOGiM-Jvk5cFw_nQP9gDq0b-V0ga8lVm-yIL04ciL4"), // Note: hard code here! You should compute the jettonWallet address by yourself
        from.address,
        to.address,
        100n * 1000000000n,
    );
    // === end building jetton transfer payload ===
    const payload = beginCell()
        .storeMaybeRef(jettonPayload)
        .storeRef(sendJettonPayload)
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
        { value: toNano("0.3") },
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