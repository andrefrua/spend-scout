import { createContext, useReducer, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "context/AuthProvider";
import { createRoutes } from "routes";

import {
  NavigationState,
  NavigationAction,
  NavigationProviderProps
} from "./NavigationProvider.models";
import { setRoutes } from "./NavigationProvider.actions";

/**
 * The initial / default Navigation state.
 */
const initialNavigationState: NavigationState = {
  routes: []
};

/**
 * The Navigation Reducer function.
 *
 * @param state - The current navigation state.
 * @param action - The action that will be used to update the state.
 * @returns The updated state.
 */
const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  switch (action.type) {
    case "SET_ROUTES": {
      return {
        ...state,
        routes: action.value
      };
    }
    default: {
      throw new Error(`Unhandled navigation action type: ${action.type}`);
    }
  }
};

export const NavigationContext = createContext<{
  state: NavigationState;
  dispatch: React.Dispatch<NavigationAction>;
}>({
  state: initialNavigationState,
  dispatch: () => null
});

NavigationContext.displayName = "NavigationContext";

const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const { state: userInfo } = useAuthContext();
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(navigationReducer, {
    routes: []
  });

  useEffect(() => {
    setRoutes(dispatch, createRoutes(userInfo, t));
  }, [userInfo, t]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
