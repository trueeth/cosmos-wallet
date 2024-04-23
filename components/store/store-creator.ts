import { PreferencesCRStore } from "packages/cr-store";

const storeCreator = (prefix: string) => new PreferencesCRStore(prefix)

export { storeCreator }