import { ButtonProps } from "@mui/material";

type CustomButtonColor =
  | "white"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark"
  | "default";

type CustomButtonVariant = "text" | "contained" | "outlined" | "gradient";

type CustomButtonSize = "small" | "medium" | "large";

export type CustomButtonBaseProps = {
  color?: CustomButtonColor;
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
  circular?: boolean;
  iconOnly?: boolean;
};

export type CustomButtonProps = ButtonProps &
  CustomButtonBaseProps & { [key: string]: any };
