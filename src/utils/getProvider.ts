import { providers } from "near-api-js";

const provider = new providers.JsonRpcProvider(
  "https://archival-rpc.testnet.near.org"
);

const getProvider = () => provider;

export default getProvider;
