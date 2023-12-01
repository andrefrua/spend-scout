import { Theme } from "@mui/material/styles";

import { CustomBadgeBaseProps } from "../CustomBadge.models";

export type StyledCustomBadgeProps = {
  theme?: Theme | any;
  $ownerState: CustomBadgeBaseProps & {
    color: CustomBadgeBaseProps["color"];
    size: NonNullable<CustomBadgeBaseProps["size"]>;
    children: React.ReactNode;
  };
};
