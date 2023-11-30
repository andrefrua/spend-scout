import { Theme } from "@mui/material/styles";

import { CustomBoxBaseProps } from "../CustomBox.models";

export type StyledCustomBoxProps = {
  theme?: Theme | any;
  $ownerState: CustomBoxBaseProps & {
    bgColor: NonNullable<CustomBoxBaseProps["bgColor"]>;
    color: NonNullable<CustomBoxBaseProps["color"]>;
    borderRadius: NonNullable<CustomBoxBaseProps["borderRadius"]>;
    shadow: NonNullable<CustomBoxBaseProps["shadow"]>;
  };
};
