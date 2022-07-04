interface State {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

export const initialNearState: State = {
  user: null,
  isLoading: true,
  error: null,
};

export type Error = string;

export interface User {
  accountId: any;
  balance: string;
}

export enum ActionTypes {
  SET_USER = "SET_USER",
  LOADING_START = "LOADING_START",
  LOADING_SUCCESS = "LOADING_SUCCESS",
  LOADING_ERROR = "LOADING_ERROR",
  CLEAR_STATE = "CLEAR_STATE",
}

export type Action =
  | { type: ActionTypes.SET_USER; user: User }
  | { type: ActionTypes.LOADING_START }
  | { type: ActionTypes.LOADING_SUCCESS }
  | { type: ActionTypes.LOADING_ERROR; error: Error }
  | { type: ActionTypes.CLEAR_STATE };

export type Dispatch = (action: Action) => void;

export const nearReducer = (currentState: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...currentState,
        user: action.user,
      };

    case ActionTypes.LOADING_START:
      return {
        ...currentState,
        isLoading: true,
        error: null,
      };

    case ActionTypes.LOADING_SUCCESS:
      return {
        ...currentState,
        isLoading: false,
        error: null,
      };

    case ActionTypes.LOADING_ERROR:
      return {
        ...currentState,
        isLoading: false,
        error: action.error,
      };

    case ActionTypes.CLEAR_STATE:
      return initialNearState;

    default:
      throw new Error("Unexpected action...");
  }
};
