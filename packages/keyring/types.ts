import { PubKeySecp256k1 } from "packages/crypto";
import { Vault, PlainObject } from "packages/vault";

export type KeyRingStatus = "empty" | "locked" | "unlocked";

export type BIP44HDPath = {
  account: number;
  change: number;
  addressIndex: number;
};

export interface KeyInfo {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly isSelected: boolean;
  readonly insensitive: PlainObject;
}

export interface KeyRing {
  supportedKeyRingType(): string;
  createKeyRingVault(...args: any[]): Promise<{
    insensitive: PlainObject;
    sensitive: PlainObject;
  }>;
  getPubKey(
    vault: Vault,
    coinType: number,
  ): PubKeySecp256k1 | Promise<PubKeySecp256k1>;
  sign(
    vault: Vault,
    coinType: number,
    data: Uint8Array,
    digestMethod: "sha256" | "keccak256",
  ):
    | {
      readonly r: Uint8Array;
      readonly s: Uint8Array;
      readonly v: number | null;
    }
    | Promise<{
      readonly r: Uint8Array;
      readonly s: Uint8Array;
      readonly v: number | null;
    }>;
}

export interface ExportedKeyRingVault {
  type: "mnemonic" | "private-key";
  id: string;
  insensitive: PlainObject;
  sensitive: string;
}
