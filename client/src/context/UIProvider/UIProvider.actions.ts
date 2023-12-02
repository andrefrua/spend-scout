import { Dispatch } from "react";

import {
  UserPreferences,
  VerticalNavColor,
  VerticalNavItemColor
} from "generated/models/userPreferences";

import { UIAction, UIActionType } from "./UIProvider.models";

const setInitialState = (
  dispatch: Dispatch<UIAction>,
  value: UserPreferences
) => dispatch({ type: UIActionType.SET_INITIAL_STATE, value });

const setUISettingsPanelOpen = (
  dispatch: Dispatch<UIAction>,
  value: boolean
) => dispatch({ type: UIActionType.SET_UI_SETTINGS_PANEL_OPEN, value });

const setIsNavBarTransparent = (dispatch: Dispatch<UIAction>, value: boolean) =>
  dispatch({ type: UIActionType.SET_NAVIGATION_BAR_TRANSPARENT, value });

const setIsVerticalNavCollapsed = async (
  dispatch: Dispatch<UIAction>,
  value: boolean,
  updateUserPreferencesHandler: (
    updatedPreferences: UserPreferences
  ) => Promise<void>
) => {
  try {
    dispatch({
      type: UIActionType.SET_VERTICAL_NAVIGATION_COLLAPSED,
      value
    });

    await updateUserPreferencesHandler?.({ isVerticalNavCollapsed: value });
  } catch (error) {
    console.error("Error updating isVerticalNavCollapsed:", error);
  }
};

const setIsDarkMode = async (
  dispatch: Dispatch<UIAction>,
  value: boolean,
  updateUserPreferencesHandler: (
    updatedPreferences: UserPreferences
  ) => Promise<void>
) => {
  try {
    dispatch({ type: UIActionType.SET_DARK_MODE, value });

    await updateUserPreferencesHandler?.({ isDarkMode: value });
  } catch (error) {
    console.error("Error updating isDarkMode:", error);
  }
};

const setIsNavBarFixed = async (
  dispatch: Dispatch<UIAction>,
  value: boolean,
  updateUserPreferencesHandler: (
    updatedPreferences: UserPreferences
  ) => Promise<void>
) => {
  try {
    dispatch({ type: UIActionType.SET_NAVIGATION_BAR_FIXED, value });

    await updateUserPreferencesHandler?.({ isNavBarFixed: value });
  } catch (error) {
    console.error("Error updating isNavBarFixed:", error);
  }
};

const setVerticalNavColor = async (
  dispatch: Dispatch<UIAction>,
  value: VerticalNavColor,
  updateUserPreferencesHandler: (
    updatedPreferences: UserPreferences
  ) => Promise<void>
) => {
  try {
    dispatch({ type: UIActionType.SET_VERTICAL_NAVIGATION_COLOR, value });

    await updateUserPreferencesHandler?.({ verticalNavColor: value });
  } catch (error) {
    console.error("Error updating verticalNavColor:", error);
  }
};

/**
 * Set the vertical navigation item color
 *
 * @param dispatch - The UIProvider dispatch
 * @param value - The new vertical navigation item color
 * @param updateUserPreferencesHandler - The updateUserPreferences mutation handler, this function will update the value in the database
 */
const setVerticalNavItemColor = async (
  dispatch: Dispatch<UIAction>,
  value: VerticalNavItemColor,
  updateUserPreferencesHandler: (
    updatedPreferences: UserPreferences
  ) => Promise<void>
) => {
  try {
    dispatch({
      type: UIActionType.SET_VERTICAL_NAVIGATION_ITEM_COLOR,
      value
    });

    await updateUserPreferencesHandler?.({ verticalNavItemColor: value });
  } catch (error) {
    console.error("Error updating verticalNavItemColor:", error);
  }
};

export {
  setInitialState,
  setUISettingsPanelOpen,
  setIsVerticalNavCollapsed,
  setIsDarkMode,
  setIsNavBarFixed,
  setIsNavBarTransparent,
  setVerticalNavColor,
  setVerticalNavItemColor
};
