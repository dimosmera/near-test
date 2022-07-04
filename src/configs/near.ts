const CONTRACT_NAME = "nfts.examples.testnet";

/**
 * Returns a NEAR testnet config
 */
const getNearConfig = () => ({
  networkId: "default",
  nodeUrl: "https://rpc.testnet.near.org",
  contractName: CONTRACT_NAME,
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
});

export default getNearConfig;
