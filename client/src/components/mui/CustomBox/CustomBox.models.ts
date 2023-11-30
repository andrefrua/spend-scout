import { BoxProps } from "@mui/material";

type CustomBoxVariant = "contained" | "gradient";

type CustomBoxColoredShadow =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark"
  | "none";

export type CustomBoxBaseProps = {
  variant?: CustomBoxVariant;
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?: CustomBoxColoredShadow;
};

export type CustomBoxProps = BoxProps &
  CustomBoxBaseProps & { [key: string]: any };
