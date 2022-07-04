import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";

import "./index.css";
import App from "components/App";
import initNear from "utils/initNear";
import NearProvider from "context/NearProvider";
import ContractProvider from "context/ContractProvider";

// Current issue with near-api-js. Needs to be polyfilled https://github.com/near/near-api-js/issues/757#issuecomment-1002754955
global.Buffer = Buffer;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// @ts-ignore
window.nearInitPromise = initNear()
  .then(({ contract, currentUser, nearConfig, walletConnection, near }) => {
    root.render(
      <NearProvider
        currentUser={currentUser}
        nearConfig={nearConfig}
        wallet={walletConnection}
        near={near}
      >
        {/* @ts-ignore */}
        <ContractProvider Contract={contract}>
          <App />
        </ContractProvider>
      </NearProvider>
    );
  })
  .catch(console.error);
