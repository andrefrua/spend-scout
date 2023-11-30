import { forwardRef } from "react";

import CustomTypography from "components/mui/CustomTypography";

import StyledCustomProgress from "./StyledCustomProgress";
import { CustomProgressProps } from "./CustomProgress.models";

const CustomProgress = forwardRef<HTMLElement, CustomProgressProps>(
  (props, ref) => {
    const {
      variant = "contained",
      color = "info",
      value = 0,
      label = false,
      children,
      ...others
    }: CustomProgressProps = props;

    return (
      <>
        {label && (
          <CustomTypography variant="button" fontWeight="medium" color="text">
            {value}%
          </CustomTypography>
        )}
        <StyledCustomProgress
          {...others}
          ref={ref}
          variant="determinate"
          value={value}
          $ownerState={{ color, value, variant }}
        />
      </>
    );
  }
);

export default CustomProgress;
