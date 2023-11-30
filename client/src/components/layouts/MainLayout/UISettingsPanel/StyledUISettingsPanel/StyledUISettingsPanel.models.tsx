import { Theme } from "@mui/material/styles";

export type StyledUISettingsPanelProps = {
  theme?: Theme | any;
  $ownerState: {
    isOpen: boolean;
  };
};
