import { forwardRef } from "react";

import StyledCustomAvatar from "./StyledCustomAvatar";
import { CustomAvatarProps } from "./CustomAvatar.models";

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>(
  (props, ref) => {
    const {
      bgColor = "transparent",
      size = "md",
      shadow = "none",
      ...others
    }: CustomAvatarProps = props;

    return (
      <StyledCustomAvatar
        {...others}
        ref={ref}
        $ownerState={{
          shadow,
          bgColor,
          size
        }}
      />
    );
  }
);

export default CustomAvatar;
