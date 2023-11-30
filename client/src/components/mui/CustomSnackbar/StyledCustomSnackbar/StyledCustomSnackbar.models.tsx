import { Theme } from "@mui/material/styles";

import { CustomSnackbarColor } from "../CustomSnackbar.models";

export type StyledCustomSnackbarProps = {
  theme?: Theme | any;
  $ownerState: { color: CustomSnackbarColor; bgWhite: boolean };
};
