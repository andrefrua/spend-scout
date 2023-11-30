import { Theme } from "@mui/material/styles";

function item(theme: Theme | any, ownerState: any) {
  const { palette, borders, functions, transitions } = theme;
  const { active, color, verticalNavColor, isDarkMode } = ownerState;

  const { transparent, white, grey } = palette;
  const { borderRadius } = borders;
  const { rgba } = functions;

  return {
    pl: 3,
    mt: 0.375,
    mb: 0.3,
    width: "100%",
    borderRadius: borderRadius.md,
    cursor: "pointer",
    backgroundColor: () => {
      let backgroundValue = transparent.main;

      if (
        (active === "isParent" &&
          verticalNavColor !== "transparent" &&
          verticalNavColor !== "white") ||
        (active === "isParent" &&
          verticalNavColor === "transparent" &&
          isDarkMode)
      ) {
        backgroundValue = rgba(white.main, 0.2);
      } else if (active === "isParent" && verticalNavColor === "transparent") {
        backgroundValue = grey["300"];
      } else if (active === "isParent" && verticalNavColor === "white") {
        backgroundValue = grey["200"];
      } else if (active) {
        backgroundValue = palette[color].main;
      }

      return backgroundValue;
    },
    transition: transitions.create("background-color", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter
    }),

    "&:hover, &:focus": {
      backgroundColor:
        !active &&
        rgba(
          (verticalNavColor === "transparent" && !isDarkMode) ||
            verticalNavColor === "white"
            ? grey[400]
            : white.main,
          0.2
        )
    }
  };
}

function itemContent(theme: Theme, ownerState: any) {
  const { palette, typography, transitions, functions } = theme;
  const { active, isVerticalNavCollapsed, name, verticalNavColor, isDarkMode } =
    ownerState;

  const { white, dark } = palette;
  const { size, fontWeightRegular, fontWeightLight } = typography;
  const { pxToRem } = functions;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: `${pxToRem(12)} ${pxToRem(16)}`,
    marginLeft: pxToRem(18),
    userSelect: "none",
    position: "relative",

    "& span": {
      color:
        ((verticalNavColor === "transparent" && !isDarkMode) ||
          verticalNavColor === "white") &&
        (active === "isParent" || !active)
          ? dark.main
          : white.main,
      fontWeight: active ? fontWeightRegular : fontWeightLight,
      fontSize: size.sm,
      opacity: isVerticalNavCollapsed ? 0 : 1,
      transition: transitions.create(["opacity", "color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard
      })
    },

    "&::before": {
      content: `"${name[0]}"`,
      color:
        ((verticalNavColor === "transparent" && !isDarkMode) ||
          verticalNavColor === "white") &&
        (active === "isParent" || !active)
          ? dark.main
          : white.main,
      fontWeight: fontWeightRegular,
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: pxToRem(-15),
      opacity: 1,
      borderRadius: "50%",
      fontSize: size.sm
    }
  };
}

function itemArrow(theme: Theme, ownerState: any) {
  const { palette, typography, transitions, breakpoints, functions } = theme;
  const {
    noCollapse,
    open,
    active,
    isVerticalNavCollapsed,
    verticalNavColor,
    isDarkMode
  } = ownerState;

  const { white, dark } = palette;
  const { size } = typography;
  const { pxToRem, rgba } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? "rotate(0)" : "rotate(-180deg)",
    color: () => {
      let colorValue;

      if (verticalNavColor === "transparent" && isDarkMode) {
        colorValue = open || active ? white.main : rgba(white.main, 0.25);
      } else if (
        verticalNavColor === "transparent" ||
        verticalNavColor === "white"
      ) {
        colorValue = open || active ? dark.main : rgba(dark.main, 0.25);
      } else {
        colorValue = open || active ? white.main : rgba(white.main, 0.5);
      }

      return colorValue;
    },
    transition: transitions.create(["color", "transform", "opacity"], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter
    }),

    [breakpoints.up("xl")]: {
      display:
        noCollapse ||
        (verticalNavColor === "transparent" && isVerticalNavCollapsed) ||
        isVerticalNavCollapsed
          ? "none !important"
          : "block !important"
    }
  };
}

export { item, itemContent, itemArrow };
