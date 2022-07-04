import { connect, WalletConnection, Contract, keyStores } from "near-api-js";

import logo from "./logo.svg";
import "./App.css";
import getNearConfig from "configs/near";
import { useEffect } from "react";

const initContract = async () => {
  const nearConfig = getNearConfig();

  // Initializing connection to NEAR
  const near = await connect({
    deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() },
    ...nearConfig,
  });

  const walletConnection = new WalletConnection(near, "near-test");
  console.log("walletConnection: ", walletConnection);

  // Load in account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      accountId: walletConnection.getAccountId(),
      balance: (await walletConnection.account().state()).amount,
    };
  }

  console.log("currentUser: ", currentUser);

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

  console.log("contract: ", contract);

  return {
    contract,
    currentUser,
    nearConfig,
    walletConnection,
    near,
  };
};

function App() {
  useEffect(() => {
    const init = async () => {
      const result = await initContract();
      console.log("result: ", result);
    };

    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
