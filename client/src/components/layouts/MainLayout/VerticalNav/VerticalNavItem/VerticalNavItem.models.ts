import { HTMLAttributes } from "react";
import { ListItemProps } from "@mui/material/ListItem";

export enum VerticalNavItemColor {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  DARK = "dark",
  LIGHT = "light"
}

type VerticalNavItemActive = boolean | string;

export type VerticalNavItemProps = HTMLAttributes<HTMLDivElement> &
  ListItemProps & {
    color?: VerticalNavItemColor;
    name: string;
    active?: VerticalNavItemActive;
    children?: React.ReactNode;
    open?: boolean;
  };
