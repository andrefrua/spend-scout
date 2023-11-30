import { AvatarProps } from "@mui/material";

type CustomAvatarBgColor =
  | "transparent"
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "light"
  | "dark";

type CustomAvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type CustomAvatarShadow =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "inset";

export type CustomAvatarBaseProps = {
  bgColor?: CustomAvatarBgColor;
  size?: CustomAvatarSize;
  shadow?: CustomAvatarShadow;
};

export type CustomAvatarProps = AvatarProps &
  CustomAvatarBaseProps & { [key: string]: any };
