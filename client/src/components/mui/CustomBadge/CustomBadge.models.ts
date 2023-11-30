import { BadgeProps } from "@mui/material";

type CustomBadgeColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

type CustomBadgeVariant = "gradient" | "contained";

type CustomBadgeSize = "xs" | "sm" | "md" | "lg";

export type CustomBadgeBaseProps = {
  color?: CustomBadgeColor;
  variant?: CustomBadgeVariant;
  size?: CustomBadgeSize;
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  container?: boolean;
};

export type CustomBadgeProps = Omit<BadgeProps, "variant"> &
  CustomBadgeBaseProps & { [key: string]: any };
