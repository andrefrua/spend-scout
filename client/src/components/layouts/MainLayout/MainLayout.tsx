import { useState, useEffect, useRef } from "react";
import { Theme } from "@mui/material/styles";

import { useUIContext } from "context/UIProvider";

import CustomBox from "components/mui/CustomBox";

import MainNavbar from "./MainNavbar";
import VerticalNav from "./VerticalNav";
import MainFooter from "./MainFooter";

import { MainLayoutProps } from "./MainLayout.models";

import UISettingsPanel from "./UISettingsPanel";

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  const {
    state: { isVerticalNavCollapsed },
    actions: { setIsVerticalNavCollapsed, setUISettingsPanelOpen }
  } = useUIContext();

  const [onMouseEnter, setOnMouseEnter] = useState(false);

  // Expand VerticalNavigation when mouse enter on isVerticalNavCollapsed=true
  const handleOnMouseEnter = () => {
    if (isVerticalNavCollapsed && !onMouseEnter) {
      setIsVerticalNavCollapsed(false);
      setOnMouseEnter(true);
    }
  };

  // Collapse VerticalNavigation when mouse leave
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setIsVerticalNavCollapsed(true);
      setOnMouseEnter(false);
    }
  };

  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;

      const isUISettingsPanelToggle = targetElement.closest(
        "button[data-ui-settings-panel-toggle]"
      );

      if (
        panelRef.current &&
        !(panelRef.current as HTMLElement).contains(targetElement) &&
        !isUISettingsPanelToggle
      ) {
        setUISettingsPanelOpen(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setUISettingsPanelOpen]);

  return (
    <CustomBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }: Theme) => ({
        p: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",

        [breakpoints.up("xl")]: {
          marginLeft: isVerticalNavCollapsed ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard
          })
        }
      })}>
      <VerticalNav
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />

      <CustomBox sx={{ flex: 1 }}>
        <MainNavbar />

        <CustomBox>{children}</CustomBox>
      </CustomBox>

      <UISettingsPanel ref={panelRef} />

      <MainFooter />
    </CustomBox>
  );
};

export default MainLayout;
