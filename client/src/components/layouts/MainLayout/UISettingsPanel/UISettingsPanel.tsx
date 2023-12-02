import { useState, useEffect, forwardRef, ForwardedRef } from "react";
import { useTranslation } from "react-i18next";

import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomButton from "components/mui/CustomButton";

import {
  VerticalNavColor,
  VerticalNavItemColor
} from "generated/models/userPreferences";
import { useUIContext } from "context/UIProvider";

import StyledUISettingsPanel from "./StyledUISettingsPanel";

import {
  verticalNavColorButtonsStyles,
  verticalNavColorActiveButtonsStyles
} from "./UISettingsPanel.styles";

const UISettingsPanel = forwardRef(
  (_, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const { t } = useTranslation();

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
        setUISettingsPanelOpen,
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

    const closeUISettingsPanelHandler = () => setUISettingsPanelOpen(false);

    const changeVerticalNavColorHandler =
      (newColor: VerticalNavColor) => () => {
        setVerticalNavColor(newColor);
      };

    const toggleIsVerticalNavCollapsedHandler = () =>
      setIsVerticalNavCollapsed(!isVerticalNavCollapsed);

    const toggleIsNavBarFixedHandler = () => setIsNavBarFixed(!isNavBarFixed);

    const toggleIsDarkModeHandler = () => setIsDarkMode(!isDarkMode);

    return (
      <StyledUISettingsPanel
        variant="permanent"
        $ownerState={{ isOpen: isUISettingsPanelOpen }}
        ref={ref}>
        <CustomBox
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          pt={4}
          pb={0.5}
          px={3}>
          <CustomBox>
            <CustomTypography variant="h5">
              {t("userPreferences.uiConfigurator")}
            </CustomTypography>
            <CustomTypography variant="body2" color="text">
              {t("userPreferences.customizeTheApplicationUI")}
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
            <CustomTypography variant="h6">
              {t("userPreferences.mainColor")}
            </CustomTypography>

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
            <CustomTypography variant="h6">
              {t("userPreferences.verticalPanelColor")}
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
                {t("userPreferences.dark")}
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
                  {t("userPreferences.transparent")}
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
                {t("userPreferences.white")}
              </CustomButton>
            </CustomBox>
          </CustomBox>
          <CustomBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
            lineHeight={1}>
            <CustomTypography variant="h6">
              {t("userPreferences.fixedTopBar")}
            </CustomTypography>

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
            <CustomTypography variant="h6">
              {t("userPreferences.verticalPanelCollapsed")}
            </CustomTypography>

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
            <CustomTypography variant="h6">
              {t("userPreferences.darkMode")}
            </CustomTypography>

            <Switch checked={isDarkMode} onChange={toggleIsDarkModeHandler} />
          </CustomBox>
          <Divider />
        </CustomBox>
      </StyledUISettingsPanel>
    );
  }
);

export default UISettingsPanel;
