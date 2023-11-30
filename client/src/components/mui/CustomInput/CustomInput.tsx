import { forwardRef } from "react";

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

    return (
      <StyledCustomInput
        {...others}
        ref={ref}
        $ownerState={{ error, success, disabled }}>
        {children}
      </StyledCustomInput>
    );
  }
);

export default CustomInput;
