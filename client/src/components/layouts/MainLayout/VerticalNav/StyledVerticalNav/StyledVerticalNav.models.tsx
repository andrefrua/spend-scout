import { Theme } from "@mui/material/styles";

import { VerticalNavColor } from "../VerticalNav.models";

export type StyledVerticalNavProps = {
  theme?: Theme | any;
  $ownerState: {
    navColor: VerticalNavColor;
    isCollapsed: boolean;
    isDarkMode: boolean;
  };
};
