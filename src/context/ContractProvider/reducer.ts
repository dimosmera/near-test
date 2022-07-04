interface State {
  loading: boolean;
  error: any;
}

export const initialContractState: State = {
  loading: false,
  error: null,
};

export enum ActionTypes {
  ACTION_START = "ACTION_START",
  ACTION_ERROR = "ACTION_ERROR",
  ACTION_SUCCESS = "ACTION_SUCCESS",
  CLEAR_STATE = "CLEAR_STATE",
}

export type Action =
  | { type: ActionTypes.ACTION_START }
  | { type: ActionTypes.ACTION_SUCCESS }
  | { type: ActionTypes.ACTION_ERROR; error: any }
  | { type: ActionTypes.CLEAR_STATE };

export type Dispatch = (action: Action) => void;

export const contractReducer = (currentState: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.ACTION_START:
      return {
        ...currentState,
        loading: true,
      };

    case ActionTypes.ACTION_SUCCESS:
      return {
        ...currentState,
        loading: false,
      };

    case ActionTypes.ACTION_ERROR:
      return {
        ...currentState,
        loading: false,
        error: action.error,
      };

    case ActionTypes.CLEAR_STATE:
      return initialContractState;

    default:
      throw new Error("Unexpected action...");
  }
};
