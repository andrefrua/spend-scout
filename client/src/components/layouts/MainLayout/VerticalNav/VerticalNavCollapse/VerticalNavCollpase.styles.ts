import { Theme } from "@mui/material/styles";

function collapseItem(theme: Theme | any, ownerState: any) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } =
    theme;
  const {
    active,
    verticalNavItemColor,
    verticalNavColor,
    isDarkMode,
    noCollapse
  } = ownerState;

  const { white, transparent, dark, grey } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba } = functions;

  return {
    background: () => {
      let backgroundValue;

      if (verticalNavColor === "transparent" && isDarkMode) {
        backgroundValue = active ? rgba(white.main, 0.2) : transparent.main;
      } else if (verticalNavColor === "transparent" && !isDarkMode) {
        backgroundValue = active ? grey[300] : transparent.main;
      } else if (verticalNavColor === "white") {
        backgroundValue = active ? grey[200] : transparent.main;
      } else if (noCollapse && active) {
        backgroundValue = palette[verticalNavItemColor].main;
      } else {
        backgroundValue = active ? rgba(white.main, 0.2) : transparent.main;
      }

      return backgroundValue;
    },
    color:
      (verticalNavColor === "transparent" && !isDarkMode) ||
      verticalNavColor === "white"
        ? dark.main
        : white.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(8)} ${pxToRem(16)}`,
    margin: `${pxToRem(1.5)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow:
      active &&
      verticalNavColor !== "white" &&
      !isDarkMode &&
      verticalNavColor !== "transparent"
        ? md
        : "none",
    [breakpoints.up("xl")]: {
      transition: transitions.create(["box-shadow", "background-color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter
      })
    },

    "&:hover, &:focus": {
      backgroundColor:
        !active &&
        (verticalNavColor === "transparent" && !isDarkMode
          ? grey[300]
          : rgba(verticalNavColor === "white" ? grey[400] : white.main, 0.2))
    }
  };
}

function collapseIconBox(theme: Theme, ownerState: any) {
  const { palette, transitions, borders, functions } = theme;
  const { verticalNavColor, isDarkMode } = ownerState;

  const { white, dark } = palette;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    color:
      (verticalNavColor === "transparent" && !isDarkMode) ||
      verticalNavColor === "white"
        ? dark.main
        : white.main,
    borderRadius: borderRadius.md,
    display: "grid",
    placeItems: "center",
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard
    }),

    "& svg, svg g": {
      color:
        verticalNavColor === "transparent" || verticalNavColor === "white"
          ? dark.main
          : white.main
    }
  };
}

const collapseIcon = (
  { palette: { white, gradients } }: Theme,
  { active }: any
) => ({
  color: active ? white.main : gradients.dark.state
});

function collapseText(theme: any, ownerState: any) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { isVerticalNavCollapsed, verticalNavColor, active } = ownerState;

  const { size, fontWeightRegular, fontWeightLight } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(10),

    [breakpoints.up("xl")]: {
      opacity:
        isVerticalNavCollapsed ||
        (isVerticalNavCollapsed && verticalNavColor === "transparent")
          ? 0
          : 1,
      maxWidth:
        isVerticalNavCollapsed ||
        (isVerticalNavCollapsed && verticalNavColor === "transparent")
          ? 0
          : "100%",
      marginLeft:
        isVerticalNavCollapsed ||
        (isVerticalNavCollapsed && verticalNavColor === "transparent")
          ? 0
          : pxToRem(10),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard
      })
    },

    "& span": {
      fontWeight: active ? fontWeightRegular : fontWeightLight,
      fontSize: size.sm,
      lineHeight: 0
    }
  };
}

function collapseArrow(theme: Theme, ownerState: any) {
  const { palette, typography, transitions, breakpoints, functions } = theme;
  const {
    noCollapse,
    verticalNavColor,
    isVerticalNavCollapsed,
    open,
    active,
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

export {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow
};
