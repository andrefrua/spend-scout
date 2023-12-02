import { Theme } from "@mui/material/styles";

export const dataTableEmptyContainer = (theme: Theme, isDarkMode: boolean) => {
  const {
    palette: { dark, light }
  } = theme;
  const backgroundColor = isDarkMode ? dark.secondary : light.secondary;
  return {
    backgroundColor
  };
};
