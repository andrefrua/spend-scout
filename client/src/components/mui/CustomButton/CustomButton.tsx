import { forwardRef } from "react";

import { useUIContext } from "context/UIProvider";

import StyledCustomButton from "./StyledCustomButton";
import { CustomButtonProps } from "./CustomButton.models";

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (props, ref) => {
    const {
      color = "primary",
      variant = "contained",
      size = "medium",
      circular = false,
      iconOnly = false,
      children,
      ...others
    }: CustomButtonProps = props;

    const {
      state: { isDarkMode }
    } = useUIContext();

    return (
      <StyledCustomButton
        {...others}
        ref={ref}
        $ownerState={{
          color,
          variant,
          size,
          circular,
          iconOnly,
          isDarkMode
        }}>
        {children}
      </StyledCustomButton>
    );
  }
);

export default CustomButton;
