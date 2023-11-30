import { Theme } from "@mui/material/styles";

import { CustomTypographyBaseProps } from "../CustomTypography.models";

export type StyledCustomTypographyProps = {
  theme?: Theme | any;
  $ownerState: CustomTypographyBaseProps & {
    color: NonNullable<CustomTypographyBaseProps["color"]>;
    fontWeight: NonNullable<CustomTypographyBaseProps["fontWeight"]>;
    isDarkMode: boolean;
  };
};
