import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { BreadcrumbsProps } from "./Breadcrumbs.models";

const Breadcrumbs = ({
  icon,
  light = false
}: BreadcrumbsProps): JSX.Element => {
  const { t, i18n } = useTranslation();

  const activeRoutes = useLocation()
    .pathname.split("/")
    .filter(x => x);

  const getRouteName = (routeKey: string): string => {
    if (i18n.exists(`routes.${routeKey}`)) {
      return t(`routes.${routeKey}`);
    }
    return routeKey;
  };

  return (
    <CustomBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) =>
              light ? white.main : grey["600"]
          }
        }}>
        <Link to="/">
          <CustomTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}>
            <Icon>{icon}</Icon>
          </CustomTypography>
        </Link>
        {activeRoutes.map((el: string) => {
          const isLast = activeRoutes.indexOf(el) === activeRoutes.length - 1;
          const isSpecificRoute =
            el.includes("create") || el.includes("edit") || Number(el);
          const currentRouteName = getRouteName(el);

          if (isLast || isSpecificRoute) {
            return (
              <CustomTypography
                key={el}
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color={light ? "white" : "dark"}
                sx={{ lineHeight: 0 }}>
                {currentRouteName}
              </CustomTypography>
            );
          }

          return (
            <Link to={`/${el}`} key={el}>
              <CustomTypography
                component="span"
                variant="button"
                fontWeight="regular"
                textTransform="capitalize"
                color={light ? "white" : "dark"}
                opacity={light ? 0.8 : 0.5}
                sx={{ lineHeight: 0 }}>
                {currentRouteName}
              </CustomTypography>
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </CustomBox>
  );
};

export default Breadcrumbs;
