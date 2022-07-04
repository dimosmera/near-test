import logo from "assets/logo.svg";
import { useGetContractContext } from "context/ContractProvider/ContractProvider";
import { useGetNearContext } from "context/NearProvider/NearProvider";
import "./App.css";
import * as Style from "./styled";

const App = () => {
  const { signIn, signOut, user } = useGetNearContext();
  const { mintNFT, loading, error } = useGetContractContext();
  console.log("loading: ", loading);
  console.log("error: ", error);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {user && (
          <Style.MintButton onClick={mintNFT}>Mint NFT</Style.MintButton>
        )}
      </header>

      {user ? (
        <Style.SignInButton onClick={signOut}>Disconnect</Style.SignInButton>
      ) : (
        <Style.SignInButton onClick={signIn}>Connect Wallet</Style.SignInButton>
      )}
    </div>
  );
};

export default App;
