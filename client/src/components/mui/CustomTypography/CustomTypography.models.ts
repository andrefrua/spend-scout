import { TypographyProps } from "@mui/material";

type CustomTypographyColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark"
  | "text"
  | "white";

type CustomTypographyFontWeight =
  | "light"
  | "regular"
  | "medium"
  | "bold"
  | undefined;

type CustomTypographyTextTransform =
  | "none"
  | "capitalize"
  | "uppercase"
  | "lowercase";

type CustomTypographyVerticalAlign =
  | "unset"
  | "baseline"
  | "sub"
  | "super"
  | "text-top"
  | "text-bottom"
  | "middle"
  | "top"
  | "bottom";

export type CustomTypographyBaseProps = {
  color?: CustomTypographyColor;
  fontWeight?: CustomTypographyFontWeight;
  textTransform?: CustomTypographyTextTransform;
  verticalAlign?: CustomTypographyVerticalAlign;
  opacity?: number;
};

export type CustomTypographyProps = TypographyProps &
  CustomTypographyBaseProps & { [key: string]: any };
