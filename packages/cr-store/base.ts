import { CRStore, CRStoreProvider } from "./interface";

export class BaseCRStore implements CRStore {
  constructor(
    private readonly provider: CRStoreProvider,
    private readonly _prefix: string
  ) { }

  async get<T = unknown>(key: string): Promise<T | undefined> {
    const k = `${this.prefix()  }/${  key}`;

    const data = await this.provider.get(k);
    return data[k];
  }

  set<T = unknown>(key: string, data: T | null): Promise<void> {
    const k = `${this.prefix()  }/${  key}`;

    return this.provider.set({ [k]: data });
  }

  prefix(): string {
    return this._prefix;
  }
}
