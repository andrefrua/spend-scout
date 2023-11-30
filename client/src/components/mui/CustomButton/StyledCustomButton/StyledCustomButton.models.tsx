import { Theme } from "@mui/material/styles";

import { CustomButtonBaseProps } from "../CustomButton.models";

export type StyledCustomButtonProps = {
  theme?: Theme | any;
  $ownerState: CustomButtonBaseProps & {
    color: NonNullable<CustomButtonBaseProps["color"]>;
    isDarkMode: boolean;
  };
};
