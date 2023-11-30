import { Theme } from "@mui/material/styles";

import { CustomInputBaseProps } from "../CustomInput.models";

export type StyledCustomInputProps = {
  theme?: Theme | any;
  $ownerState: CustomInputBaseProps;
};
