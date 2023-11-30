import { LinearProgressProps } from "@mui/material";

type CustomProgressVariant = "contained" | "gradient";

type CustomProgressColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

export type CustomProgressBaseProps = {
  variant?: CustomProgressVariant;
  color?: CustomProgressColor;
  value: number;
  label?: boolean;
};

export type CustomProgressProps = Omit<LinearProgressProps, "variant"> &
  CustomProgressBaseProps & { [key: string]: any };
