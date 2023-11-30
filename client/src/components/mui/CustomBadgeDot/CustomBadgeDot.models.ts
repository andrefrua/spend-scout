type CustomBadgeDotVariant = "contained" | "gradient";

type CustomBadgeDotColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

type CustomBadgeDotSize = "xs" | "sm" | "md" | "lg";

export type CustomBadgeDotProps = {
  variant?: CustomBadgeDotVariant;
  color?: CustomBadgeDotColor;
  size?: CustomBadgeDotSize;
  badgeContent: string;
  font?:
    | {
        color: string;
        weight: string;
      }
    | any;
};
