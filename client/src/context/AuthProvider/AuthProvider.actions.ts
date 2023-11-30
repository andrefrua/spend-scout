import { Dispatch } from "react";

import {
  AuthAction,
  AuthActionType,
  LoggedInPayload
} from "./AuthProvider.models";

const loggedIn = (
  dispatch: Dispatch<AuthAction>,
  payload: LoggedInPayload,
  setToken?: (token: string) => void
) => {
  if (payload.rememberMe) {
    setToken?.(payload.token);
  }

  dispatch({
    type: AuthActionType.LOGGED_IN,
    payload
  });
};

const loggedOut = (dispatch: Dispatch<AuthAction>, clearToken?: () => void) => {
  clearToken?.();
  dispatch({ type: AuthActionType.LOGGED_OUT });
};

const setIsLoading = (dispatch: Dispatch<AuthAction>, payload: boolean) =>
  dispatch({ type: AuthActionType.SET_IS_LOADING, payload });

export { loggedIn, loggedOut, setIsLoading };
