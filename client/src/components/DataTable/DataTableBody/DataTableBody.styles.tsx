import { Theme } from "@mui/material/styles";

export const tableRow = (
  { palette: { dark, light } }: Theme,
  isDarkMode: boolean,
  isHovered: boolean,
  isClickable: boolean
) => {
  const backgroundColor = isDarkMode ? dark.secondary : light.secondary;
  const hoverBackgroundColor = isDarkMode ? dark.main : light.main;

  return {
    background: isHovered ? hoverBackgroundColor : backgroundColor,
    cursor: isClickable ? "pointer" : "default"
  };
};
