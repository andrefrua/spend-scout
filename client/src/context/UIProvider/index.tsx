import UIProvider from "./UIProvider";

export default UIProvider;

export { default as useUIContext } from "./useUIContext";
export {
  toggleUISettingsPanelOpen,
  setIsVerticalNavCollapsed,
  setIsDarkMode,
  setIsNavBarFixed,
  setIsNavBarTransparent,
  setVerticalNavColor,
  setVerticalNavItemColor
} from "./UIProvider.actions";
