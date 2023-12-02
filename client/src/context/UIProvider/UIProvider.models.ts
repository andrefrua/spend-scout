import {
  UserPreferences,
  VerticalNavColor,
  VerticalNavItemColor
} from "generated/models/userPreferences";

/**
 * The UI state representation
 */
export interface UIState {
  isUISettingsPanelOpen: boolean;
  isVerticalNavCollapsed: boolean;
  isDarkMode: boolean;
  isNavBarFixed: boolean;
  isNavBarTransparent: boolean;
  verticalNavColor: VerticalNavColor;
  verticalNavItemColor: VerticalNavItemColor;
}

export interface UIActions {
  setUISettingsPanelOpen: (value: boolean) => void;
  setIsVerticalNavCollapsed: (value: boolean) => void;
  setIsDarkMode: (value: boolean) => void;
  setIsNavBarFixed: (value: boolean) => void;
  setIsNavBarTransparent: (value: boolean) => void;
  setVerticalNavColor: (value: VerticalNavColor) => void;
  setVerticalNavItemColor: (value: VerticalNavItemColor) => void;
}

/**
 * UI action types to be used by the uiReducer
 */
export enum UIActionType {
  SET_INITIAL_STATE = "SET_INITIAL_STATE",
  SET_UI_SETTINGS_PANEL_OPEN = "SET_UI_SETTINGS_PANEL_OPEN",
  SET_VERTICAL_NAVIGATION_COLLAPSED = "SET_VERTICAL_NAVIGATION_COLLAPSED",
  SET_DARK_MODE = "SET_DARK_MODE",
  SET_NAVIGATION_BAR_FIXED = "SET_NAVIGATION_BAR_FIXED",
  SET_NAVIGATION_BAR_TRANSPARENT = "SET_NAVIGATION_BAR_TRANSPARENT",
  SET_VERTICAL_NAVIGATION_COLOR = "SET_VERTICAL_NAVIGATION_COLOR",
  SET_VERTICAL_NAVIGATION_ITEM_COLOR = "SET_VERTICAL_NAVIGATION_ITEM_COLOR"
}

/**
 * UI Action definition
 */
export interface UIAction {
  type: UIActionType;
  value:
    | boolean
    | string
    | UserPreferences
    | VerticalNavColor
    | VerticalNavItemColor;
}

/**
 * The UIProvider properties definition
 */
export interface UIProviderProps {
  children?: React.ReactNode;
}
