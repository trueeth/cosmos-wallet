import { CRStore } from "./interface";

export class PrefixCRStore implements CRStore {
  constructor(
    protected readonly crStore: CRStore,
    protected readonly _prefix: string
  ) { }

  prefix(): string {
    return this._prefix;
  }

  async get<T = unknown>(key: string): Promise<T | undefined> {
    const k = `${this.prefix()  }/${  key}`;

    return this.crStore.get(k);
  }

  async set<T = unknown>(key: string, data: T | null): Promise<void> {
    const k = `${this.prefix()  }/${  key}`;

    return this.crStore.set(k, data);
  }
}
