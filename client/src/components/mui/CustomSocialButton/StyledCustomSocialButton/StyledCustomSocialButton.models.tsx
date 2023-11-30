import { Theme } from "@mui/material/styles";

import { CustomSocialButtonBaseProps } from "../CustomSocialButton.models";

export type StyledCustomSocialButtonProps = {
  theme?: Theme | any;
  $ownerState: CustomSocialButtonBaseProps & {
    color: NonNullable<CustomSocialButtonBaseProps["color"]>;
  };
};
