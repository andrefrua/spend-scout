import { Theme } from "@mui/material/styles";

export type StyledCustomEditorProps = {
  theme?: Theme | any;
  $ownerState: {
    isDarkMode: boolean;
  };
};
