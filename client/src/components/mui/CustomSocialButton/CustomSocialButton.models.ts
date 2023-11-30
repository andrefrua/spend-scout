import { ButtonProps } from "@mui/material";

type CustomSocialButtonColor =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "pinterest"
  | "youtube"
  | "github"
  | "vimeo"
  | "slack"
  | "dribbble"
  | "reddit"
  | "tumblr";

type CustomSocialButtonSize = "small" | "medium" | "large";

export type CustomSocialButtonBaseProps = {
  color?: CustomSocialButtonColor;
  size?: CustomSocialButtonSize;
  circular?: boolean;
  iconOnly?: boolean;
};

export type CustomSocialButtonProps = Omit<ButtonProps, "color"> &
  CustomSocialButtonBaseProps & { [key: string]: any };
