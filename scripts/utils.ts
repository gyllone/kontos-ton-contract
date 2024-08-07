import { WalletContractV4 } from "@ton/ton";
import { KeyPair, mnemonicToWalletKey } from "@ton/crypto";
import * as dotenv from "dotenv";

dotenv.config();

export async function getUserKeyPair(): Promise<KeyPair> {
    const mnemonics = (process.env.USER_MNEMONICS || "").toString();
    return await mnemonicToWalletKey(mnemonics.split(" "));
}

export async function getAdminKeyPair(): Promise<KeyPair> {
    return await mnemonicToWalletKey([
        "match", "skin", "settle", "wine", "salmon", "penalty",
        "trophy", "grace", "spell", "circle", "nothing", "click",
        "route", "bonus", "good", "coffee", "assault", "artefact",
        "oval", "party", "junior", "width", "engage", "subway",
    ]);
}

export async function getWalletV4(keyPair: KeyPair): Promise<WalletContractV4> {
    return WalletContractV4.create({
        workchain: 0,
        publicKey: keyPair.publicKey,
    });
}
