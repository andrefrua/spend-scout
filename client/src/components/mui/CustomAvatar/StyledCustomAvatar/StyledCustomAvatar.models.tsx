import { Theme } from "@mui/material/styles";

import { CustomAvatarBaseProps } from "../CustomAvatar.models";

export type StyledCustomAvatarProps = {
  theme?: Theme | any;
  $ownerState: CustomAvatarBaseProps & {
    bgColor: NonNullable<CustomAvatarBaseProps["bgColor"]>;
    shadow: NonNullable<CustomAvatarBaseProps["shadow"]>;
  };
};
