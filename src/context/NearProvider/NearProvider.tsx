import React, { useReducer, useEffect, createContext, useContext } from "react";

import {
  initialNearState,
  nearReducer,
  User,
  Error,
  ActionTypes,
} from "./reducer";

import { Near, WalletConnection } from "near-api-js";

export const NearContext = createContext({
  ...initialNearState,
  nearContent: null,
  signIn: () => {},
  signOut: () => {},
  startLoading: () => {},
});

interface Props {
  nearConfig: any;
  near: Near;
  wallet: WalletConnection;
  currentUser?: User;
  children: React.ReactNode;
}

const NearProvider = ({
  currentUser,
  nearConfig,
  wallet,
  near,
  children,
}: Props) => {
  const [nearState, dispatchNear] = useReducer(nearReducer, initialNearState);

  const setUser = (user: User) => {
    dispatchNear({ type: ActionTypes.SET_USER, user });
  };

  const loadingStart = () => {
    dispatchNear({ type: ActionTypes.LOADING_START });
  };

  const loadingSuccess = () => {
    dispatchNear({ type: ActionTypes.LOADING_SUCCESS });
  };

  const loadingError = (error: Error) => {
    dispatchNear({ type: ActionTypes.LOADING_ERROR, error });
  };

  const clearState = () => {
    dispatchNear({ type: ActionTypes.CLEAR_STATE });
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName);
  };

  const signOut = () => {
    wallet.signOut();

    clearState();
  };

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      setUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!nearState.user && !nearState.isLoading && !nearState.error) {
      loadingStart();
    }
  }, [nearState]);

  useEffect(() => {
    if (nearState.user && nearState.isLoading) {
      loadingSuccess();
    }
  }, [nearState]);

  useEffect(() => {
    if (
      !nearState.user &&
      !localStorage.getItem("undefined_wallet_auth_key") &&
      !nearState.error
    ) {
      localStorage.clear();
      loadingError("wallet not found");
    }
  }, [nearState]);

  return (
    <NearContext.Provider
      value={{
        user: nearState.user,
        isLoading: nearState.isLoading,
        // @ts-ignore
        nearContent: near,
        signIn,
        signOut,
      }}
    >
      {children}
    </NearContext.Provider>
  );
};

export default NearProvider;

/**
 * Use this function to retrieve the NEAR context
 */
export const useGetNearContext = () => {
  const result = useContext(NearContext);
  return result;
};
