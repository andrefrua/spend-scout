import { Theme } from "@mui/material/styles";

export const verticalNavColorButtonsStyles = (
  {
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth }
  }: Theme,
  isDarkMode: boolean
) => ({
  height: pxToRem(39),
  background: isDarkMode ? background.default : white.main,
  color: isDarkMode ? white.main : dark.main,
  border: `${borderWidth[1]} solid ${isDarkMode ? white.main : dark.main}`,

  "&:hover, &:focus, &:focus:not(:hover)": {
    background: isDarkMode ? background.default : white.main,
    color: isDarkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${isDarkMode ? white.main : dark.main}`
  }
});

export const verticalNavColorActiveButtonsStyles = (
  {
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background }
  }: Theme,
  isDarkMode: boolean
) => ({
  height: pxToRem(39),
  background: isDarkMode
    ? white.main
    : linearGradient(gradients.dark.main, gradients.dark.state),
  color: isDarkMode ? background.default : white.main,

  "&:hover, &:focus, &:focus:not(:hover)": {
    background: isDarkMode
      ? white.main
      : linearGradient(gradients.dark.main, gradients.dark.state),
    color: isDarkMode ? background.default : white.main
  }
});
