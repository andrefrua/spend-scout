import {
  createContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useState
} from "react";

import useUserPreferencesApi from "hooks/useUserPreferencesApi";
import {
  UserPreferences,
  VerticalNavColor,
  VerticalNavItemColor
} from "generated/models/userPreferences";

import {
  UIState,
  UIAction,
  UIProviderProps,
  UIActionType,
  UIActions
} from "./UIProvider.models";
import {
  setUISettingsPanelOpen,
  setIsVerticalNavCollapsed,
  setIsDarkMode,
  setIsNavBarFixed,
  setIsNavBarTransparent,
  setVerticalNavColor,
  setVerticalNavItemColor,
  setInitialState
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
  verticalNavItemColor: VerticalNavItemColor.INFO
};

/**
 * The initial / default Auth actions.
 */
const initialUIActions: UIActions = {
  setUISettingsPanelOpen: () => undefined,
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
    // TODO: Set this in the actions type
    case "SET_INITIAL_STATE":
      return { ...state, ...(action.value as UserPreferences) };
    case UIActionType.SET_UI_SETTINGS_PANEL_OPEN:
      return { ...state, isUISettingsPanelOpen: action.value as boolean };
    case UIActionType.SET_VERTICAL_NAVIGATION_COLLAPSED:
      return {
        ...state,
        isVerticalNavCollapsed: action.value as boolean
      };
    case UIActionType.SET_DARK_MODE:
      return { ...state, isDarkMode: action.value as boolean };
    case UIActionType.SET_NAVIGATION_BAR_FIXED:
      return { ...state, isNavBarFixed: action.value as boolean };
    case UIActionType.SET_NAVIGATION_BAR_TRANSPARENT:
      return { ...state, isNavBarTransparent: action.value as boolean };
    case UIActionType.SET_VERTICAL_NAVIGATION_COLOR:
      return {
        ...state,
        verticalNavColor: action.value as VerticalNavColor
      };
    case UIActionType.SET_VERTICAL_NAVIGATION_ITEM_COLOR:
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
  const { data: userPreferences, updateUserPreferences } =
    useUserPreferencesApi();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(uiReducer, {
    ...initialUIState,
    ...(userPreferences || {}) // Use userPreferences if available
  });

  // Use useEffect to update state after the initial render
  useEffect(() => {
    if (userPreferences) {
      setInitialState(dispatch, userPreferences);
      setLoading(false);
    }
  }, [userPreferences]);

  const updateUserPreferencesHandler = useCallback(
    async (updatedPreferences: UserPreferences): Promise<void> => {
      try {
        const newPreferences = {
          ...userPreferences,
          ...updatedPreferences
        };
        await updateUserPreferences(newPreferences);
      } catch (error) {
        console.error("Error updating user preferences:", error);
      }
    },
    [userPreferences, updateUserPreferences]
  );

  const actions = useMemo(
    () => ({
      setUISettingsPanelOpen: (value: boolean) =>
        setUISettingsPanelOpen(dispatch, value),
      setIsNavBarTransparent: (value: boolean) =>
        setIsNavBarTransparent(dispatch, value),

      setIsVerticalNavCollapsed: (value: boolean) => {
        setIsVerticalNavCollapsed(
          dispatch,
          value,
          updateUserPreferencesHandler
        );
      },
      setIsDarkMode: (value: boolean) =>
        setIsDarkMode(dispatch, value, updateUserPreferencesHandler),
      setIsNavBarFixed: (value: boolean) =>
        setIsNavBarFixed(dispatch, value, updateUserPreferencesHandler),
      setVerticalNavColor: (value: VerticalNavColor) =>
        setVerticalNavColor(dispatch, value, updateUserPreferencesHandler),
      setVerticalNavItemColor: (value: VerticalNavItemColor) =>
        setVerticalNavItemColor(dispatch, value, updateUserPreferencesHandler)
    }),
    [dispatch, updateUserPreferencesHandler]
  );

  const value = useMemo(
    () => ({
      state: {
        ...state
      },
      actions
    }),
    [state, actions]
  );

  if (loading) {
    return null;
  }

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;
