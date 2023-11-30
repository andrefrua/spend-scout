import { Theme } from "@mui/material/styles";

export type StyledCalendarProps = {
  theme?: Theme | any;
  $ownerState: {
    isDarkMode: boolean;
  };
};
