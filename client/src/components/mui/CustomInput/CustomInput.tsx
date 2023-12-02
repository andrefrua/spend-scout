import { forwardRef } from "react";

import { useUIContext } from "context/UIProvider";

import StyledCustomInput from "./StyledCustomInput";
import { CustomInputProps } from "./CustomInput.models";

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      error = false,
      success = false,
      disabled = false,
      children,
      ...others
    }: CustomInputProps = props;
    const {
      state: { isDarkMode }
    } = useUIContext();

    return (
      <StyledCustomInput
        {...others}
        ref={ref}
        $ownerState={{ error, success, disabled, isDarkMode }}>
        {children}
      </StyledCustomInput>
    );
  }
);

export default CustomInput;
