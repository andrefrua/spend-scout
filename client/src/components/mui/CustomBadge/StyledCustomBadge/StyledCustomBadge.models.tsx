import { Theme } from "@mui/material/styles";

import { CustomBadgeBaseProps } from "../CustomBadge.models";

export type StyledCustomBadgeProps = {
  theme?: Theme | any;
  $ownerState: CustomBadgeBaseProps & {
    color: NonNullable<CustomBadgeBaseProps["color"]>;
    size: NonNullable<CustomBadgeBaseProps["size"]>;
    children: React.ReactNode;
  };
};
