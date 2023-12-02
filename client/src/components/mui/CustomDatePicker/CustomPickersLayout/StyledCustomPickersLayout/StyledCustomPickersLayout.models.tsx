import { Theme } from "@mui/material/styles";
import { DateView } from "@mui/x-date-pickers";
import { PickersLayoutProps } from "@mui/x-date-pickers/PickersLayout";

import { VerticalNavItemColor } from "generated/models/userPreferences";

export type StyledCustomPickersLayoutProps = {
  theme?: Theme | any;
  $ownerState: PickersLayoutProps<unknown, unknown, DateView> & {
    color: VerticalNavItemColor;
  };
};
