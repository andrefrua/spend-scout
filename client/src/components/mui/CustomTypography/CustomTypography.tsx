import { forwardRef } from "react";

import { useUIContext } from "context/UIProvider";

import StyledCustomTypography from "./StyledCustomTypography";
import { CustomTypographyProps } from "./CustomTypography.models";

const CustomTypography = forwardRef<HTMLElement, CustomTypographyProps>(
  (props, ref) => {
    const {
      color = "dark",
      fontWeight = "regular",
      textTransform = "none",
      verticalAlign = "unset",
      opacity = 1,
      children,
      ...others
    }: CustomTypographyProps = props;

    const {
      state: { isDarkMode }
    } = useUIContext();

    return (
      <StyledCustomTypography
        {...others}
        ref={ref}
        $ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          isDarkMode
        }}>
        {children}
      </StyledCustomTypography>
    );
  }
);

export default CustomTypography;
