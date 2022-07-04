import React, { useReducer, useCallback, useContext } from "react";

import { ActionTypes, contractReducer, initialContractState } from "./reducer";

export const ContractContext = React.createContext(initialContractState);

interface MintProps {
  receiverId: string;
  tokenId: string;
  metadata: any;
}

interface Props {
  Contract: {
    nft_token: () => void;
    nft_mint: (props: MintProps, fee: string) => Promise<any>;
  };
  mintFee: string;
  children: React.ReactNode;
}

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

  // TODO: receiver, id, metadata can be passed here. Right now they are hardcoded
  const mintNFT = useCallback(() => {
    dispatchContract({ type: ActionTypes.ACTION_START });
    Contract.nft_mint({ receiverId: "", tokenId: "", metadata: {} }, "")
      .then(() => dispatchContract({ type: ActionTypes.ACTION_SUCCESS }))
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
