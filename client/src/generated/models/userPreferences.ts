export enum VerticalNavColor {
  TRANSPARENT = "transparent",
  WHITE = "white",
  DARK = "dark"
}

export enum VerticalNavItemColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  DARK = "dark",
  LIGHT = "light"
}

export interface UserPreferences {
  id?: number;
  userId?: string; // Assuming userId is a UUID
  isVerticalNavCollapsed?: boolean;
  isDarkMode?: boolean;
  isNavBarFixed?: boolean;
  verticalNavColor?: VerticalNavColor;
  verticalNavItemColor?: VerticalNavItemColor;
}
