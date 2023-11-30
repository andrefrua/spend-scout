import { VerticalNavColor } from "components/layouts/MainLayout/VerticalNav/VerticalNav.models";
import { VerticalNavItemColor } from "components/layouts/MainLayout/VerticalNav/VerticalNavItem/VerticalNavItem.models";

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
  toggleUISettingsPanelOpen: (value: boolean) => void;
  setIsVerticalNavCollapsed: (value: boolean) => void;
  setIsDarkMode: (value: boolean) => void;
  setIsNavBarFixed: (value: boolean) => void;
  setIsNavBarTransparent: (value: boolean) => void;
  setVerticalNavColor: (value: string) => void;
  setVerticalNavItemColor: (value: string) => void;
}

/**
 * UI action types to be used by the uiReducer
 */
export enum UIActionType {
  TOGGLE_UI_SETTINGS_PANEL_OPEN = "TOGGLE_UI_SETTINGS_PANEL_OPEN",
  TOGGLE_VERTICAL_NAVIGATION_COLLAPSED = "TOGGLE_VERTICAL_NAVIGATION_COLLAPSED",
  TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE",
  TOGGLE_NAVIGATION_BAR_FIXED = "TOGGLE_NAVIGATION_BAR_FIXED",
  TOGGLE_NAVIGATION_BAR_TRANSPARENT = "TOGGLE_NAVIGATION_BAR_TRANSPARENT",
  CHANGE_VERTICAL_NAVIGATION_COLOR = "CHANGE_VERTICAL_NAVIGATION_COLOR",
  CHANGE_VERTICAL_NAVIGATION_ITEM_COLOR = "CHANGE_VERTICAL_NAVIGATION_ITEM_COLOR"
}

/**
 * UI Action definition
 */
export interface UIAction {
  type: UIActionType;
  value: boolean | string;
}

/**
 * The UIProvider properties definition
 */
export interface UIProviderProps {
  children?: React.ReactNode;
}
