import { useState, useEffect } from "react";

import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";
import CustomSocialButton from "components/mui/CustomSocialButton";

import { VerticalNavItemColor } from "components/layouts/MainLayout/VerticalNav/VerticalNavItem/VerticalNavItem.models";

import { useUIContext } from "context/UIProvider";

import StyledUISettingsPanel from "./StyledUISettingsPanel";
import { VerticalNavColor } from "../VerticalNav/VerticalNav.models";
import {
  verticalNavColorButtonsStyles,
  verticalNavColorActiveButtonsStyles
} from "./UISettingsPanel.styles";

// TODO: Translate this component
const UISettingsPanel = (): JSX.Element => {
  const {
    state: {
      isUISettingsPanelOpen,
      isVerticalNavCollapsed,
      isDarkMode,
      isNavBarFixed,
      verticalNavColor,
      verticalNavItemColor
    },
    actions: {
      toggleUISettingsPanelOpen,
      setVerticalNavColor,
      setIsVerticalNavCollapsed,
      setIsNavBarFixed,
      setIsDarkMode,
      setVerticalNavItemColor
    }
  } = useUIContext();

  const [isVerticalNavVisible, setIsVerticalNavVisible] =
    useState<boolean>(false);

  // We want to disable the button to change the VerticalNav color when is is no longer visible
  useEffect(() => {
    const verticalNavVisibleHandler = () =>
      window.innerWidth > 1200
        ? setIsVerticalNavVisible(true)
        : setIsVerticalNavVisible(false);

    // The event listener that's calling the verticalNavVisibleHandler function when resizing the window.
    window.addEventListener("resize", verticalNavVisibleHandler);

    // Call the verticalNavVisibleHandler function to set the state with the initial value.
    verticalNavVisibleHandler();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener("resize", verticalNavVisibleHandler);
  }, []);

  const closeUISettingsPanelHandler = () => toggleUISettingsPanelOpen(false);

  const changeVerticalNavColorHandler = (newColor: VerticalNavColor) => () => {
    setVerticalNavColor(newColor);
  };

  const toggleIsVerticalNavCollapsedHandler = () =>
    setIsVerticalNavCollapsed(!isVerticalNavCollapsed);

  const toggleIsNavBarFixedHandler = () => setIsNavBarFixed(!isNavBarFixed);

  const toggleIsDarkModeHandler = () => setIsDarkMode(!isDarkMode);

  return (
    <StyledUISettingsPanel
      variant="permanent"
      $ownerState={{ isOpen: isUISettingsPanelOpen }}>
      <CustomBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}>
        <CustomBox>
          <CustomTypography variant="h5">UI Configurator</CustomTypography>
          <CustomTypography variant="body2" color="text">
            See our dashboard options.
          </CustomTypography>
        </CustomBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: isDarkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)"
          })}
          onClick={closeUISettingsPanelHandler}>
          close
        </Icon>
      </CustomBox>

      <Divider />

      <CustomBox pt={0.5} pb={3} px={3}>
        <CustomBox>
          <CustomTypography variant="h6">Sidenav Colors</CustomTypography>

          <CustomBox mb={0.5}>
            {Object.values(VerticalNavItemColor).map(color => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions
                }: Theme) => ({
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  border: `${borderWidth[1]} solid ${
                    isDarkMode ? background.default : white.main
                  }`,
                  borderColor: () => {
                    let borderColorValue =
                      verticalNavItemColor === color && dark.main;

                    if (isDarkMode && verticalNavItemColor === color) {
                      borderColorValue = white.main;
                    }

                    return borderColorValue;
                  },
                  transition: transitions.create("border-color", {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter
                  }),
                  backgroundImage: ({
                    functions: { linearGradient },
                    palette: { gradients }
                  }) =>
                    linearGradient(
                      gradients[color].main,
                      gradients[color].state
                    ),

                  "&:not(:last-child)": {
                    mr: 1
                  },

                  "&:hover, &:focus, &:active": {
                    borderColor: isDarkMode ? white.main : dark.main
                  }
                })}
                onClick={() => setVerticalNavItemColor(color)}
              />
            ))}
          </CustomBox>
        </CustomBox>

        <CustomBox mt={3} lineHeight={1}>
          <CustomTypography variant="h6">Sidenav Type</CustomTypography>
          <CustomTypography variant="button" color="text">
            Choose between different sidenav types.
          </CustomTypography>

          <CustomBox
            sx={{
              display: "flex",
              mt: 2,
              mr: 1
            }}>
            <CustomButton
              color="dark"
              variant="gradient"
              onClick={changeVerticalNavColorHandler(VerticalNavColor.DARK)}
              disabled={!isVerticalNavVisible}
              fullWidth
              sx={(theme: Theme) =>
                verticalNavColor === "dark"
                  ? verticalNavColorActiveButtonsStyles(theme, isDarkMode)
                  : verticalNavColorButtonsStyles(theme, isDarkMode)
              }>
              Dark
            </CustomButton>
            <CustomBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
              <CustomButton
                color="dark"
                variant="gradient"
                onClick={changeVerticalNavColorHandler(
                  VerticalNavColor.TRANSPARENT
                )}
                disabled={!isVerticalNavVisible}
                fullWidth
                sx={(theme: Theme) =>
                  verticalNavColor === "transparent"
                    ? verticalNavColorActiveButtonsStyles(theme, isDarkMode)
                    : verticalNavColorButtonsStyles(theme, isDarkMode)
                }>
                Transparent
              </CustomButton>
            </CustomBox>
            <CustomButton
              color="dark"
              variant="gradient"
              onClick={changeVerticalNavColorHandler(VerticalNavColor.WHITE)}
              disabled={!isVerticalNavVisible}
              fullWidth
              sx={(theme: Theme) =>
                verticalNavColor === "white"
                  ? verticalNavColorActiveButtonsStyles(theme, isDarkMode)
                  : verticalNavColorButtonsStyles(theme, isDarkMode)
              }>
              White
            </CustomButton>
          </CustomBox>
        </CustomBox>
        <CustomBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}>
          <CustomTypography variant="h6">Navbar Fixed</CustomTypography>

          <Switch
            checked={isNavBarFixed}
            onChange={toggleIsNavBarFixedHandler}
          />
        </CustomBox>
        <Divider />
        <CustomBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}>
          <CustomTypography variant="h6">Sidenav Mini</CustomTypography>

          <Switch
            checked={isVerticalNavCollapsed}
            onChange={toggleIsVerticalNavCollapsedHandler}
          />
        </CustomBox>
        <Divider />
        <CustomBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}>
          <CustomTypography variant="h6">Light / Dark</CustomTypography>

          <Switch checked={isDarkMode} onChange={toggleIsDarkModeHandler} />
        </CustomBox>
        <Divider />
        <CustomBox mt={3} mb={2}>
          <CustomButton
            component={Link}
            href="#"
            target="_blank"
            rel="noreferrer"
            color={isDarkMode ? "light" : "dark"}
            variant="outlined"
            fullWidth>
            view documentation
          </CustomButton>
        </CustomBox>

        <CustomBox mt={2} textAlign="center">
          <CustomBox display="flex" justifyContent="center">
            <CustomBox mr={1.5}>
              <CustomSocialButton
                color="twitter"
                component={Link}
                href="#"
                target="_blank"
                rel="noreferrer">
                <TwitterIcon />
                &nbsp; Tweet
              </CustomSocialButton>
            </CustomBox>

            <CustomSocialButton
              color="facebook"
              component={Link}
              href="#"
              target="_blank"
              rel="noreferrer">
              <FacebookIcon />
              &nbsp; Share
            </CustomSocialButton>
          </CustomBox>
        </CustomBox>
      </CustomBox>
    </StyledUISettingsPanel>
  );
};

export default UISettingsPanel;
