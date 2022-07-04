import logo from "assets/logo.svg";
import { useGetContractContext } from "context/ContractProvider/ContractProvider";
import { useGetNearContext } from "context/NearProvider/NearProvider";
import useGetTxResults from "components/hooks/useGetTxResults";

import "./App.css";
import * as Style from "./styled";

const App = () => {
  const { signIn, signOut, user } = useGetNearContext();
  const { mintNFT, loading: mintLoading } = useGetContractContext();

  const txResults = useGetTxResults(user);
  console.log("txResults: ", txResults);

  const handleMint = () => {
    if (mintLoading) return;
    mintNFT();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        {user && (
          <Style.MintButton onClick={handleMint}>Mint NFT</Style.MintButton>
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
