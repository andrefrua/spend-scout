import { forwardRef } from "react";

import StyledCustomSocialButton from "./StyledCustomSocialButton";
import { CustomSocialButtonProps } from "./CustomSocialButton.models";

const CustomSocialButton = forwardRef<
  HTMLButtonElement,
  CustomSocialButtonProps
>((props, ref) => {
  const {
    color = "facebook",
    size = "medium",
    iconOnly = false,
    circular = false,
    children,
    ...others
  }: CustomSocialButtonProps = props;

  return (
    <StyledCustomSocialButton
      {...others}
      ref={ref}
      variant="contained"
      color="primary"
      size={size}
      $ownerState={{
        color,
        size,
        iconOnly,
        circular
      }}>
      {children}
    </StyledCustomSocialButton>
  );
});

export default CustomSocialButton;
