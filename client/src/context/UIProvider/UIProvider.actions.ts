import { Dispatch } from "react";

import { UIAction, UIActionType } from "./UIProvider.models";

const toggleUISettingsPanelOpen = (
  dispatch: Dispatch<UIAction>,
  value: boolean
) => dispatch({ type: UIActionType.TOGGLE_UI_SETTINGS_PANEL_OPEN, value });

const setIsVerticalNavCollapsed = (
  dispatch: Dispatch<UIAction>,
  value: boolean
) =>
  dispatch({ type: UIActionType.TOGGLE_VERTICAL_NAVIGATION_COLLAPSED, value });

const setIsDarkMode = (dispatch: Dispatch<UIAction>, value: boolean) =>
  dispatch({ type: UIActionType.TOGGLE_DARK_MODE, value });

const setIsNavBarFixed = (dispatch: Dispatch<UIAction>, value: boolean) =>
  dispatch({ type: UIActionType.TOGGLE_NAVIGATION_BAR_FIXED, value });

const setIsNavBarTransparent = (dispatch: Dispatch<UIAction>, value: boolean) =>
  dispatch({ type: UIActionType.TOGGLE_NAVIGATION_BAR_TRANSPARENT, value });

const setVerticalNavColor = (dispatch: Dispatch<UIAction>, value: string) =>
  dispatch({ type: UIActionType.CHANGE_VERTICAL_NAVIGATION_COLOR, value });

const setVerticalNavItemColor = (dispatch: Dispatch<UIAction>, value: string) =>
  dispatch({ type: UIActionType.CHANGE_VERTICAL_NAVIGATION_ITEM_COLOR, value });

export {
  toggleUISettingsPanelOpen,
  setIsVerticalNavCollapsed,
  setIsDarkMode,
  setIsNavBarFixed,
  setIsNavBarTransparent,
  setVerticalNavColor,
  setVerticalNavItemColor
};
