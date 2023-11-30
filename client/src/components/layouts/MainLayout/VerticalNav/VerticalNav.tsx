import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { useUIContext } from "context/UIProvider";
import { useBrandingContext } from "context/BrandingProvider";
import { useNavigationContext } from "context/NavigationProvider";

import {
  CustomRoute,
  CustomRouteType
} from "context/NavigationProvider/NavigationProvider.models";

import VerticalNavCollpase from "./VerticalNavCollapse";
import VerticalNavList from "./VerticalNavList";
import VerticalNavItem from "./VerticalNavItem";
import StyledVerticalNav from "./StyledVerticalNav";

import { verticalNavLogoLabelStyles } from "./VerticalNav.styles";
import { VerticalNavProps } from "./VerticalNav.models";

const VerticalNav = ({ ...others }: VerticalNavProps): JSX.Element => {
  const {
    state: {
      verticalNavColor,
      verticalNavItemColor,
      isVerticalNavCollapsed,
      isDarkMode
    },
    actions: { setIsVerticalNavCollapsed, setVerticalNavColor }
  } = useUIContext();

  const {
    state: { brandName, brandLogo }
  } = useBrandingContext();

  const {
    state: { routes }
  } = useNavigationContext();

  const [openParentItem, setOpenParentItem] = useState<boolean | string>(false);
  const [openChildItem, setOpenChildItem] = useState<boolean | string>(false);

  const location = useLocation();
  const { pathname } = location;
  const rootParentName = pathname.split("/").slice(1)[0];
  const items = pathname.split("/").slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  let textColor:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "white"
    | "inherit"
    | "text"
    | "light" = "white";

  if (
    verticalNavColor === "transparent" ||
    (verticalNavColor === "white" && !isDarkMode)
  ) {
    textColor = "dark";
  } else if (verticalNavColor === "white" && isDarkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setIsVerticalNavCollapsed(true);

  useEffect(() => {
    setOpenParentItem(rootParentName);
    setOpenChildItem(itemParentName);
  }, [rootParentName, itemParentName]);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setIsVerticalNavCollapsed(window.innerWidth < 1200);

      // TODO : No ideia what this is for...
      setVerticalNavColor(window.innerWidth < 1200 ? "dark" : verticalNavColor);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [
    location,
    verticalNavColor,
    setVerticalNavColor,
    setIsVerticalNavCollapsed
  ]);

  /**
   * Renders all the child routes.
   */
  const renderChildRoutes = (childRoutes: CustomRoute[]) => {
    const template = childRoutes.map((childRoute: CustomRoute) => {
      if ("href" in childRoute) {
        return (
          <Link
            key={childRoute.key}
            href={childRoute.href}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}>
            <VerticalNavItem name={childRoute.name} />
          </Link>
        );
      }

      if ("route" in childRoute) {
        return (
          <NavLink
            to={childRoute.route || ""}
            key={childRoute.key}
            style={{ textDecoration: "none" }}>
            <VerticalNavItem
              name={childRoute.name}
              active={childRoute.route === pathname}
            />
          </NavLink>
        );
      }

      return null;
    });

    return template;
  };

  /**
   * Renders all the parent routes.
   */
  const renderParentRoutes = (childRoutes: CustomRoute[]) =>
    childRoutes.map((childRoute: CustomRoute) => {
      let returnValue;

      if ("subRoutes" in childRoute) {
        returnValue = (
          <VerticalNavItem
            key={childRoute.key}
            color={verticalNavItemColor}
            name={childRoute.name}
            active={childRoute.key === itemParentName ? "isParent" : false}
            open={openChildItem === childRoute.key}
            onClick={({
              currentTarget
            }: React.MouseEvent<HTMLDivElement | HTMLLIElement, MouseEvent>) =>
              openChildItem === childRoute.key &&
              currentTarget.classList.contains("MuiListItem-root")
                ? setOpenChildItem(false)
                : setOpenChildItem(childRoute.key)
            }>
            {renderChildRoutes(childRoute.subRoutes || [])}
          </VerticalNavItem>
        );
      } else if ("href" in childRoute) {
        returnValue = (
          <Link
            href={childRoute.href}
            key={childRoute.key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}>
            <VerticalNavItem
              color={verticalNavItemColor}
              name={childRoute.name}
              active={childRoute.key === itemName}
            />
          </Link>
        );
      } else if ("route" in childRoute) {
        returnValue = (
          <NavLink
            to={childRoute.route || ""}
            key={childRoute.key}
            style={{ textDecoration: "none" }}>
            <VerticalNavItem
              color={verticalNavItemColor}
              name={childRoute.name}
              active={childRoute.key === itemName}
            />
          </NavLink>
        );
      }

      return (
        <VerticalNavList key={childRoute.key}>{returnValue}</VerticalNavList>
      );
    });

  /**
   * Renders all the routes according to the definition set in the routes.tsx file
   */
  const renderRootRoutes = routes.map((route: CustomRoute) => {
    let returnValue;

    switch (route.type) {
      case CustomRouteType.PARENT: {
        const noCollapse = !route.subRoutes || route.subRoutes.length === 0;
        if (noCollapse && route.route) {
          returnValue = (
            <NavLink to={route.route} key={route.key}>
              <VerticalNavCollpase
                name={route.name}
                icon={route.icon}
                noCollapse={noCollapse}
                active={route.key === rootParentName}
              />
            </NavLink>
          );
        } else {
          returnValue = (
            <VerticalNavCollpase
              key={route.key}
              name={route.name}
              icon={route.icon}
              active={route.key === rootParentName}
              open={openParentItem === route.key}
              onClick={() =>
                openParentItem === route.key
                  ? setOpenParentItem(false)
                  : setOpenParentItem(route.key)
              }
              noCollapse={noCollapse}>
              {route.subRoutes ? renderParentRoutes(route.subRoutes) : null}
            </VerticalNavCollpase>
          );
        }

        break;
      }

      case CustomRouteType.HREF:
        returnValue = (
          <Link
            href={route.href}
            key={route.key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}>
            <VerticalNavCollpase
              name={route.name}
              icon={route.icon}
              active={route.key === rootParentName}
              noCollapse
            />
          </Link>
        );
        break;
      case CustomRouteType.TITLE:
        returnValue = (
          <CustomTypography
            key={route.key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}>
            {route.title}
          </CustomTypography>
        );
        break;
      case CustomRouteType.DIVIDER:
        returnValue = (
          <Divider
            key={route.key}
            light={
              (!isDarkMode &&
                verticalNavColor !== "white" &&
                verticalNavColor !== "transparent") ||
              (isDarkMode &&
                verticalNavColor !== "transparent" &&
                verticalNavColor === "white")
            }
          />
        );
        break;
      default:
        throw new Error(`Invalid route type: ${route.type}`);
    }

    return returnValue;
  });

  return (
    <StyledVerticalNav
      {...others}
      variant="permanent"
      $ownerState={{
        navColor: verticalNavColor,
        isCollapsed: isVerticalNavCollapsed,
        isDarkMode
      }}>
      <CustomBox pt={3} pb={1} px={4} textAlign="center">
        <CustomBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}>
          <CustomTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </CustomTypography>
        </CustomBox>
        <CustomBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center">
          {brandLogo && (
            <CustomBox
              component="img"
              src={brandLogo}
              alt="logo"
              width="2rem"
            />
          )}
          <CustomBox
            width={brandName ? undefined : "100%"}
            sx={(theme: Theme) =>
              verticalNavLogoLabelStyles(theme, {
                isVerticalNavCollapsed
              })
            }>
            <CustomTypography
              component="h6"
              variant="button"
              fontWeight="medium"
              color={textColor}>
              {brandName}
            </CustomTypography>
          </CustomBox>
        </CustomBox>
      </CustomBox>
      <Divider
        light={
          (!isDarkMode &&
            verticalNavColor !== "white" &&
            verticalNavColor !== "transparent") ||
          (isDarkMode &&
            verticalNavColor !== "transparent" &&
            verticalNavColor === "white")
        }
      />
      <List>{renderRootRoutes}</List>
    </StyledVerticalNav>
  );
};

export default VerticalNav;
