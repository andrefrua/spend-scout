import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

import { transientOptions } from "models/utils";

import { StyledVerticalNavProps } from "./StyledVerticalNav.models";

const StyledVerticalNav = styled(
  Drawer,
  transientOptions
)(({ theme, $ownerState }: StyledVerticalNavProps) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { navColor, isCollapsed, isDarkMode } = $ownerState;

  const sidebarWidth = 250;
  const { transparent, gradients, white, background } = palette;
  const { xxl } = boxShadows;
  const { pxToRem, linearGradient } = functions;

  let backgroundValue = isDarkMode
    ? background.sidenav
    : linearGradient(gradients.dark.main, gradients.dark.state);

  if (navColor === "transparent") {
    backgroundValue = transparent.main;
  } else if (navColor === "white") {
    backgroundValue = white.main;
  }

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    background: backgroundValue,
    transform: "translateX(0)",
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),

    [breakpoints.up("xl")]: {
      boxShadow: navColor === "transparent" ? "none" : xxl,
      marginBottom: navColor === "transparent" ? 0 : "inherit",
      left: "0",
      width: sidebarWidth,
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    }
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    background: backgroundValue,
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),

    [breakpoints.up("xl")]: {
      boxShadow: navColor === "transparent" ? "none" : xxl,
      marginBottom: navColor === "transparent" ? 0 : "inherit",
      left: "0",
      width: pxToRem(96),
      overflowX: "hidden",
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter
      })
    }
  });

  return {
    "& .MuiDrawer-paper": {
      boxShadow: xxl,
      border: "none",

      ...(isCollapsed ? drawerCloseStyles() : drawerOpenStyles())
    }
  };
});

export default StyledVerticalNav;
