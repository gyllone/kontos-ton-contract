import { Address } from "@ton/core";
import { TonClient4 } from "@ton/ton";

export const Client = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
    timeout: 30000,
});

export const Deployments = {
    Entrypoint: Address.parse("kQCaV2GwI1iZ4RYyYEi4P_dkRf_CtHYBv9Uda8RGvv2xjp7I"),
};