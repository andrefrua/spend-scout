import { styled } from "@mui/material/styles";

import { transientOptions } from "models/utils";

import { StyledCustomEditorProps } from "./StyledCustomEditor.models";

const StyledCustomEditor = styled(
  "div",
  transientOptions
)(({ theme, $ownerState }: StyledCustomEditorProps) => {
  const { palette, borders, typography } = theme;
  const { isDarkMode } = $ownerState;

  const { borderRadius } = borders;
  const { size } = typography;
  const { text, white, dark } = palette;

  return {
    "& .ql-toolbar": {
      borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,

      "& .ql-picker, & .ql-stroke": {
        stroke: `${isDarkMode ? white.main : dark.main} !important`,
        color: `${isDarkMode ? white.main : dark.main} !important`
      }
    },

    "& .ql-container": {
      borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`
    },

    "& .ql-editor": {
      color: isDarkMode ? white.main : text.main,

      "& p": {
        fontSize: size.md,
        color: isDarkMode ? white.main : text.main
      },

      "& ul li": {
        color: isDarkMode ? white.main : text.main
      }
    }
  };
});

export default StyledCustomEditor;
