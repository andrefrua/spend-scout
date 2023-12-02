import { styled } from "@mui/material/styles";
import { PickersLayout } from "@mui/x-date-pickers/PickersLayout";

import { transientOptions } from "models/utils";

import { StyledCustomPickersLayoutProps } from "./StyledCustomPickersLayout.models";

/**
 * Due to the structure of the DatePicker and the way the popper renders, the
 * `layout` slot will need to be replaced with a styled component
 */
const StyledCustomPickersLayout = styled(
  PickersLayout,
  transientOptions
)(({ theme, $ownerState }: StyledCustomPickersLayoutProps) => {
  const { palette } = theme;
  const { color } = $ownerState;

  const { white } = palette;

  const backgroundValue = palette[color] ? palette[color].main : white.main;
  const focusedBackgroundValue = palette[color]
    ? palette[color].focus
    : white.focus;

  // color value
  const colorValue = white.main;

  // color value when button is focused
  const focusedColorValue = white.main;

  return {
    // Days
    ".MuiPickersDay-root": {
      // backgroundColor: "pink",
      "&:hover": {
        backgroundColor: backgroundValue,
        color: colorValue
      },

      "&.Mui-selected": {
        backgroundColor: backgroundValue,
        color: colorValue,

        "&:hover": {
          backgroundColor: focusedBackgroundValue,
          color: focusedColorValue
        }
      }
    },
    // ".MuiPickersDay-today": {
    //   // backgroundColor: "blue",
    //   // "&:hover": {
    //   //   backgroundColor: "green"
    //   // }
    // },

    // Years
    ".MuiPickersYear-root": {
      button: {
        "&:hover": {
          backgroundColor: backgroundValue,
          color: colorValue
        },

        "&.Mui-selected": {
          backgroundColor: backgroundValue,
          color: colorValue,

          "&:hover": {
            backgroundColor: focusedBackgroundValue,
            color: focusedColorValue
          }
        }
      }
    },

    // Time
    ".MuiMultiSectionDigitalClock-root": {
      li: {
        justifyContent: "left",

        "&.Mui-selected": {
          backgroundColor: backgroundValue,
          color: colorValue,

          "&:hover": {
            backgroundColor: focusedBackgroundValue,
            color: focusedColorValue
          }
        }
      }
    }
  };
});

export default StyledCustomPickersLayout;
