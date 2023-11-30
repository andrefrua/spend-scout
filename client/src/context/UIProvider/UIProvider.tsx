import { createContext, useReducer, useMemo } from "react";

import { VerticalNavColor } from "components/layouts/MainLayout/VerticalNav/VerticalNav.models";
import { VerticalNavItemColor } from "components/layouts/MainLayout/VerticalNav/VerticalNavItem/VerticalNavItem.models";

import {
  UIState,
  UIAction,
  UIProviderProps,
  UIActionType,
  UIActions
} from "./UIProvider.models";
import {
  toggleUISettingsPanelOpen,
  setIsVerticalNavCollapsed,
  setIsDarkMode,
  setIsNavBarFixed,
  setIsNavBarTransparent,
  setVerticalNavColor,
  setVerticalNavItemColor
} from "./UIProvider.actions";

/**
 * The initial / default UI state.
 */
const initialUIState: UIState = {
  isUISettingsPanelOpen: false,
  isVerticalNavCollapsed: false,
  isDarkMode: false,
  isNavBarFixed: true,
  isNavBarTransparent: true,
  verticalNavColor: VerticalNavColor.DARK,
  verticalNavItemColor: VerticalNavItemColor.WARNING
};

/**
 * The initial / default Auth actions.
 */
const initialUIActions: UIActions = {
  toggleUISettingsPanelOpen: () => undefined,
  setIsVerticalNavCollapsed: () => undefined,
  setIsDarkMode: () => undefined,
  setIsNavBarFixed: () => undefined,
  setIsNavBarTransparent: () => undefined,
  setVerticalNavColor: () => undefined,
  setVerticalNavItemColor: () => undefined
};

/**
 * The UI Reducer function.
 *
 * @param state - The current UI state.
 * @param action - The action that will be used to update the state.
 * @returns The updated state.
 */
const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case UIActionType.TOGGLE_UI_SETTINGS_PANEL_OPEN:
      return { ...state, isUISettingsPanelOpen: action.value as boolean };
    case UIActionType.TOGGLE_VERTICAL_NAVIGATION_COLLAPSED:
      return {
        ...state,
        isVerticalNavCollapsed: action.value as boolean
      };
    case UIActionType.TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: action.value as boolean };
    case UIActionType.TOGGLE_NAVIGATION_BAR_FIXED:
      return { ...state, isNavBarFixed: action.value as boolean };
    case UIActionType.TOGGLE_NAVIGATION_BAR_TRANSPARENT:
      return { ...state, isNavBarTransparent: action.value as boolean };
    case UIActionType.CHANGE_VERTICAL_NAVIGATION_COLOR:
      return {
        ...state,
        verticalNavColor: action.value as VerticalNavColor
      };
    case UIActionType.CHANGE_VERTICAL_NAVIGATION_ITEM_COLOR:
      return {
        ...state,
        verticalNavItemColor: action.value as VerticalNavItemColor
      };
    default: {
      throw new Error(`Unhandled UI action type: ${action.type}`);
    }
  }
};

export const UIContext = createContext<{
  state: UIState;
  actions: UIActions;
}>({
  state: initialUIState,
  actions: initialUIActions
});

UIContext.displayName = "UIContext";

const UIProvider = ({ children }: UIProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  const actions = useMemo(
    () => ({
      toggleUISettingsPanelOpen: (value: boolean) =>
        toggleUISettingsPanelOpen(dispatch, value),
      setIsVerticalNavCollapsed: (value: boolean) =>
        setIsVerticalNavCollapsed(dispatch, value),
      setIsDarkMode: (value: boolean) => setIsDarkMode(dispatch, value),
      setIsNavBarFixed: (value: boolean) => setIsNavBarFixed(dispatch, value),
      setIsNavBarTransparent: (value: boolean) =>
        setIsNavBarTransparent(dispatch, value),
      setVerticalNavColor: (value: string) =>
        setVerticalNavColor(dispatch, value),
      setVerticalNavItemColor: (value: string) =>
        setVerticalNavItemColor(dispatch, value)
    }),
    [dispatch]
  );

  const value = useMemo(() => ({ state, actions }), [state, actions]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;
