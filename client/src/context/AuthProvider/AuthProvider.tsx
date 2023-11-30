import { createContext, useReducer, useMemo, useEffect } from "react";

// import profileImage from "assets/images/profileImage.jpg";

import useApi from "hooks/useApi";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "hooks/useLocalStorage";

import {
  AuthState,
  AuthAction,
  AuthActionType,
  AuthProviderProps,
  LoggedInPayload,
  AuthActions
} from "./AuthProvider.models";
import { loggedIn, loggedOut } from "./AuthProvider.actions";

/**
 * The initial / default Auth state.
 */
const initialAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  rememberMe: false
};

/**
 * The initial / default Auth actions.
 */
const initialAuthActions: AuthActions = {
  loggedIn: () => undefined,
  loggedOut: () => undefined
};

/**
 * The Auth Reducer function.
 *
 * @param state - The current auth state.
 * @param action - The action that will be used to update the state.
 * @returns The updated state.
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...(action.payload as LoggedInPayload)
      };
    case AuthActionType.LOGGED_OUT:
      return {
        isAuthenticated: false,
        isLoading: false,
        rememberMe: false
      };
    case AuthActionType.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean
      };
    default: {
      throw new Error(`Unhandled auth action type: ${action.type}`);
    }
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  actions: AuthActions;
}>({
  state: initialAuthState,
  actions: initialAuthActions
});

AuthContext.displayName = "AuthContext";

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const { setValue: setToken, clearValue: clearToken } = useLocalStorage(
    LOCAL_STORAGE_KEYS.TOKEN
  );
  const { get } = useApi({ token: localStorage.getItem("token") });

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // TODO: We should also set a remember me when registering the user
        const data = await get("/verify-token");

        loggedIn(dispatch, { ...data });
      } catch (catchedError) {
        loggedOut(dispatch);
      }
    };
    verifyToken();
  }, [get]);

  const actions = useMemo(
    () => ({
      loggedIn: (payload: LoggedInPayload) =>
        loggedIn(dispatch, payload, setToken),
      loggedOut: () => loggedOut(dispatch, clearToken)
    }),
    [dispatch, setToken, clearToken]
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
