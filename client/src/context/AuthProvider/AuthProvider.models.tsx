export interface UserInfo {
  email?: string;
  name?: string;
  profileImage?: React.ReactNode;
}

/**
 * The Auth state representation
 */
export interface AuthState extends UserInfo {
  isAuthenticated: boolean;
  isLoading: boolean;
  rememberMe: boolean;
  token?: string;
}

export interface AuthActions {
  loggedIn: (payload: LoggedInPayload) => void;
  loggedOut: () => void;
}

/**
 * Auth action types to be used by the authReducer
 */
export enum AuthActionType {
  LOGGED_IN = "LOGGED_IN",
  LOGGED_OUT = "LOGGED_OUT",
  SET_IS_LOADING = "SET_IS_LOADING"
}

/**
 * Auth Action definition
 */
export interface AuthAction {
  type: AuthActionType;
  payload?: LoggedInPayload | boolean;
}

export interface LoggedInPayload {
  email: string;
  name: string;
  token: string;
  rememberMe: boolean;
}

/**
 * The AuthProvider properties definition
 */
export interface AuthProviderProps {
  children?: React.ReactNode;
}
