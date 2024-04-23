
import scrypt from "scrypt-js";
import { KeyRingService } from "packages/keyring/service";
import { KeyRingKeystoneService } from "packages/keyring-keystone";
import { KeyRingLedgerService } from "packages/keyring-ledger";
import { KeyRingMnemonicService } from "packages/keyring-mnemonic";
import { KeyRingPrivateKeyService } from "packages/keyring-private-key";
import { VaultService } from "packages/vault/service";
import { PreferencesCRStore } from "packages/cr-store";
import { storeCreator } from "./store-creator";

const vaultService = new VaultService(storeCreator("vault"));

const keyRingStore = new KeyRingService(
    storeCreator("keyring-v2"),
    {
        crStore: storeCreator("keyring"),
        commonCrypto: {
            scrypt: async (
                text: string,
                params: { dklen: number; salt: string; n: number; r: number; p: number }
            ) => scrypt.scrypt(
                    Buffer.from(text),
                    Buffer.from(params.salt, "hex"),
                    params.n,
                    params.r,
                    params.p,
                    params.dklen
                ),
        },
        getDisabledChainIdentifiers: async () => {
            const crStore = new PreferencesCRStore("store_chain_config");
            const legacy = await crStore.get<{ disabledChains: string[] }>(
                "extension_chainInfoInUIConfig"
            );
            if (!legacy) {
                return [];
            }
            return legacy.disabledChains ?? [];
        },
    },
    vaultService,
    [
        new KeyRingMnemonicService(vaultService),
        new KeyRingLedgerService(),
        new KeyRingPrivateKeyService(vaultService),
        new KeyRingKeystoneService(),
    ]
)


const keyRingStoreInit = async () => {
    await keyRingStore.init()
}
const vaultServiceInit = async () => {
    await vaultService.init()
}

export { keyRingStore, vaultService, keyRingStoreInit, vaultServiceInit }