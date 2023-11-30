import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { transientOptions } from "models/utils";

import { StyledCustomTypographyProps } from "./StyledCustomTypography.models";

const StyledCustomTypography = styled(
  Typography,
  transientOptions
)(({ theme, $ownerState }: StyledCustomTypographyProps) => {
  const { palette, typography } = theme;
  const {
    color,
    textTransform,
    verticalAlign,
    fontWeight,
    opacity,
    isDarkMode
  } = $ownerState;

  const { white } = palette;
  const {
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  } = typography;

  // fontWeight styles
  const fontWeights: { [key: string]: number } = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold
  };

  // color value
  let colorValue =
    color === "inherit" || !palette[color] ? "inherit" : palette[color].main;

  if (isDarkMode && (color === "inherit" || !palette[color])) {
    colorValue = "inherit";
  } else if (isDarkMode && color === "dark") colorValue = white.main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight]
  };
});

export default StyledCustomTypography;
