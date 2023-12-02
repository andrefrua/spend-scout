import { Theme } from "@mui/material/styles";

import { VerticalNavColor } from "generated/models/userPreferences";

export type StyledVerticalNavProps = {
  theme?: Theme | any;
  $ownerState: {
    navColor: VerticalNavColor;
    isCollapsed: boolean;
    isDarkMode: boolean;
  };
};
