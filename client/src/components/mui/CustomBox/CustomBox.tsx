import { forwardRef } from "react";

import StyledCustomBox from "./StyledCustomBox";
import { CustomBoxProps } from "./CustomBox.models";

const CustomBox = forwardRef<HTMLElement, CustomBoxProps>((props, ref) => {
  const {
    variant = "contained",
    bgColor = "transparent",
    color = "dark",
    opacity = 1,
    borderRadius = "none",
    shadow = "none",
    coloredShadow = "none",
    children,
    ...others
  }: CustomBoxProps = props;

  return (
    <StyledCustomBox
      {...others}
      ref={ref}
      $ownerState={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow
      }}>
      {children}
    </StyledCustomBox>
  );
});

export default CustomBox;
