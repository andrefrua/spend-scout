import { HTMLAttributes } from "react";
import { ListItemProps } from "@mui/material/ListItem";

import { VerticalNavItemColor } from "generated/models/userPreferences";

type VerticalNavItemActive = boolean | string;

export type VerticalNavItemProps = HTMLAttributes<HTMLDivElement> &
  ListItemProps & {
    color?: VerticalNavItemColor;
    name: string;
    active?: VerticalNavItemActive;
    children?: React.ReactNode;
    open?: boolean;
  };
