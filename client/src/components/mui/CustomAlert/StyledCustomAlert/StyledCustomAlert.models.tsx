import { Theme } from "@mui/material/styles";

import { CustomAlertColor } from "../CustomAlert.models";

export type StyledCustomAlertProps = {
  theme?: Theme | any;
  $ownerState: {
    color: CustomAlertColor;
  };
};
