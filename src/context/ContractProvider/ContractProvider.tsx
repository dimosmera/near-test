import React, { useReducer, useCallback, useContext } from "react";
import Big from "big.js";
import { v4 as uuidv4 } from "uuid";

import { ActionTypes, contractReducer, initialContractState } from "./reducer";

export const ContractContext = React.createContext({
  ...initialContractState,
  mintNFT: () => {},
  clearState: () => {},
});

interface MintProps {
  receiver_id: string;
  token_id: string;
  metadata: any;
}

interface Props {
  Contract: {
    nft_token: () => void;
    nft_mint: (props: MintProps, gas: string, deposit: string) => Promise<any>;
  };
  mintFee: string;
  children: React.ReactNode;
}

const ATTACHED_GAS = Big(1)
  .times(10 ** 14)
  .toFixed();

const DEPOSIT_TO_COVER_STORAGE = Big(1)
  .times(10 ** 24)
  .toFixed();

const ContractProvider = ({ Contract, mintFee, children }: Props) => {
  const [contractState, dispatchContract] = useReducer(
    contractReducer,
    initialContractState
  );

  // const getActiveCorgi = useCallback(
  //   (id) => {
  //     dispatchContract({ type: ACTION_START });
  //     Contract.get_corgi_by_id({ id })
  //       .then((corgi) => dispatchContract({ type: GET_CORGI_SUCCESS, payload: { corgi } }))
  //       .catch((error) => dispatchContract({ type: ACTION_ERROR, payload: { error } }));
  //   },
  //   [Contract],
  // );

  // receiver, id, metadata can be passed here. Right now they are hardcoded
  const mintNFT = useCallback(() => {
    dispatchContract({ type: ActionTypes.ACTION_START });
    Contract.nft_mint(
      {
        token_id: uuidv4(),
        receiver_id: "dimos.testnet",
        metadata: {
          title: "GO TEAM 3",
          description: "The Team Goes again",
          media:
            "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/",
          copies: 1,
        },
      },
      ATTACHED_GAS,
      DEPOSIT_TO_COVER_STORAGE
    )
      .then((result) => {
        dispatchContract({ type: ActionTypes.ACTION_SUCCESS });
      })
      .catch((error) =>
        dispatchContract({ type: ActionTypes.ACTION_ERROR, error })
      );
  }, [Contract]);

  const clearState = () => dispatchContract({ type: ActionTypes.CLEAR_STATE });

  const value = {
    loading: contractState.loading,
    error: contractState.error,
    mintFee,
    mintNFT,
    clearState,
  };

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;

/**
 * Use this function to retrieve the contract context
 */
export const useGetContractContext = () => {
  const result = useContext(ContractContext);
  return result;
};
