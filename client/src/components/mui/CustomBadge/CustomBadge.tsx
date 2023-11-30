import { forwardRef } from "react";

import StyledCustomBadge from "./StyledCustomBadge";
import { CustomBadgeProps } from "./CustomBadge.models";

const CustomBadge = forwardRef<HTMLElement, CustomBadgeProps>((props, ref) => {
  const {
    color = "info",
    variant = "gradient",
    size = "sm",
    circular = false,
    indicator = false,
    border = false,
    container = false,
    children,
    ...others
  }: CustomBadgeProps = props;

  return (
    <StyledCustomBadge
      {...others}
      ref={ref}
      $ownerState={{
        color,
        variant,
        size,
        circular,
        indicator,
        border,
        container,
        children
      }}
      color="default">
      {children}
    </StyledCustomBadge>
  );
});

export default CustomBadge;
