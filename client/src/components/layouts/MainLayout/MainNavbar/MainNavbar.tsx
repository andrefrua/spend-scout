import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";

import { useUIContext } from "context/UIProvider";
import { useAuthContext } from "context/AuthProvider";

import Breadcrumbs from "./Breadcrumbs";

import { MainNavbarProps } from "./MainNavbar.models";

import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
  iconsStyle
} from "./MainNavbar.styles";

const MainNavbar = ({
  absolute = false,
  light = false,
  isMini = false
}: MainNavbarProps): JSX.Element => {
  const {
    actions: { loggedOut }
  } = useAuthContext();
  const [navbarType, setNavbarType] = useState<
    "fixed" | "absolute" | "relative" | "static" | "sticky"
  >();

  const {
    state: {
      isVerticalNavCollapsed,
      isNavBarTransparent,
      isNavBarFixed,
      isUISettingsPanelOpen,
      isDarkMode
    },
    actions: {
      toggleUISettingsPanelOpen,
      setIsNavBarTransparent,
      setIsVerticalNavCollapsed
    }
  } = useUIContext();

  useEffect(() => {
    // Setting the navbar type
    if (isNavBarFixed) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setIsNavBarTransparent(
        (isNavBarFixed && window.scrollY === 0) || !isNavBarFixed
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [isNavBarFixed, setIsNavBarTransparent]);

  const handleMiniSidenav = () =>
    setIsVerticalNavCollapsed(!isVerticalNavCollapsed);
  const handleConfiguratorOpen = () => {
    toggleUISettingsPanelOpen(!isUISettingsPanelOpen);
  };

  const logoutHandler = () => loggedOut();

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="transparent"
      sx={theme =>
        navbar(theme, {
          transparentNavbar: isNavBarTransparent,
          absolute,
          light,
          isDarkMode
        })
      }>
      <Toolbar sx={navbarContainer}>
        <CustomBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme: Theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" light={light} />
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple>
            <Icon
              fontSize="medium"
              sx={(theme: Theme) =>
                iconsStyle(theme, light, isDarkMode, isNavBarTransparent)
              }>
              {isVerticalNavCollapsed ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </CustomBox>
        {isMini ? null : (
          <CustomBox sx={(theme: Theme) => navbarRow(theme, { isMini })}>
            <CustomBox color={light ? "white" : "inherit"}>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}>
                <Icon
                  sx={(theme: Theme) =>
                    iconsStyle(theme, light, isDarkMode, isNavBarTransparent)
                  }
                  fontSize="medium">
                  {isVerticalNavCollapsed ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}>
                <Icon
                  sx={(theme: Theme) =>
                    iconsStyle(theme, light, isDarkMode, isNavBarTransparent)
                  }>
                  settings
                </Icon>
              </IconButton> */}
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={logoutHandler}>
                <Icon
                  sx={(theme: Theme) =>
                    iconsStyle(theme, light, isDarkMode, isNavBarTransparent)
                  }>
                  logout
                </Icon>
              </IconButton>
            </CustomBox>
          </CustomBox>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
