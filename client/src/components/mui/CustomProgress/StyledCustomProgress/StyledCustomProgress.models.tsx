import { Theme } from "@mui/material/styles";

import { CustomProgressBaseProps } from "../CustomProgress.models";

export type StyledCustomProgressProps = {
  theme?: Theme | any;
  $ownerState: Omit<CustomProgressBaseProps, "label"> & {
    color: NonNullable<CustomProgressBaseProps["color"]>;
  };
};
