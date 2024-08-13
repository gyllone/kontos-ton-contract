import { Address, Cell } from "@ton/core";
import { TonClient4 } from "@ton/ton";
import walletHex from "./external/jetton-wallet.compiled.json";

export const Client = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
    timeout: 30000,
});

export const Deployments = {
    Entrypoint: Address.parse("kQCaV2GwI1iZ4RYyYEi4P_dkRf_CtHYBv9Uda8RGvv2xjp7I"),
};

export const P256Pubkeys = {
    Broker: Buffer.from("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAExhc0xRctM+tNNYA3Sm7lqmtYIU19hwLxq7TtPTzvNGbFuZw1WGaSAq3SvNO+3bJJucKZJdO6TP/yWJ5DvISOkA==", "base64"),
    User: Buffer.from("MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEiOdeUmNYSP/SdbcBO7+CICGIQSmOohTPn/WP/uyM4hkI8eDsHnjdpJQPFq3qdh4K8xHVV/mEQRfWp5Acl6/WvQ==", "base64"),
};

export const JettonData = {
    Master: Address.parse("EQC0yUT-9ihnQlzZziXha7X7IU8mOTgUHYbmyxgIxB5W0AMV"),
    WalletCode: Cell.fromBoc(Buffer.from(walletHex.hex, "hex"))[0],
}
