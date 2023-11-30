import { Theme } from "@mui/material/styles";

export const verticalNavLogoLabelStyles = (theme: Theme, ownerState: any) => {
  const { functions, transitions, typography, breakpoints } = theme;
  const { isVerticalNavCollapsed } = ownerState;

  const { pxToRem } = functions;
  const { fontWeightMedium } = typography;

  return {
    ml: 1,
    fontWeight: fontWeightMedium,
    fontSize: "30pt",
    wordSpacing: pxToRem(-1),
    transition: transitions.create("opacity", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard
    }),

    [breakpoints.up("xl")]: {
      opacity: isVerticalNavCollapsed ? 0 : 1
    }
  };
};
