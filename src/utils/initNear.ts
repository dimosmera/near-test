import { connect, WalletConnection, Contract, keyStores } from "near-api-js";

import getNearConfig from "configs/near";

/**
 * Initializes a connection to NEAR, the current contract and loads user's account data
 */
const initNear = async () => {
  const nearConfig = getNearConfig();

  // Initializing connection to NEAR
  const near = await connect({
    deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
    ...nearConfig,
  });

  const walletConnection = new WalletConnection(near, "near-test");

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing contract APIs
  const contract = new Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["nft_token"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["nft_mint"],
    }
  );

  return {
    contract,
    currentUser,
    nearConfig,
    walletConnection,
    near,
  };
};

export default initNear;
