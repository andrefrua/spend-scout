import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";

import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { useUIContext } from "context/UIProvider";

import StyledCustomSnackbar from "./StyledCustomSnackbar";
import { CustomSnackbarProps } from "./CustomSnackbar.models";

const CustomSnackbar = ({
  color = "info",
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite = false
}: CustomSnackbarProps): JSX.Element => {
  const {
    state: { isDarkMode }
  } = useUIContext();

  let titleColor: string;
  let dateTimeColor: string;
  let dividerColor: boolean;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = isDarkMode ? "inherit" : "dark";
    dateTimeColor = isDarkMode ? "inherit" : "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <CustomBox
      variant={bgWhite ? "contained" : "gradient"}
      bgColor={bgWhite ? "white" : color}
      minWidth="21.875rem"
      maxWidth="100%"
      shadow="md"
      borderRadius="md"
      p={1}
      sx={{
        backgroundColor: ({ palette }: { palette: any }) =>
          isDarkMode
            ? palette.background.card
            : palette[color] || palette.white.main
      }}>
      <CustomBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        color="dark"
        p={1.5}>
        <CustomBox display="flex" alignItems="center" lineHeight={0}>
          <StyledCustomSnackbar
            fontSize="small"
            $ownerState={{ color, bgWhite }}>
            {icon}
          </StyledCustomSnackbar>
          <CustomTypography
            variant="button"
            fontWeight="medium"
            color={titleColor}>
            {title}
          </CustomTypography>
        </CustomBox>
        <CustomBox display="flex" alignItems="center" lineHeight={0}>
          <CustomTypography variant="caption" color={dateTimeColor}>
            {dateTime}
          </CustomTypography>
          <Icon
            sx={{
              color: ({ palette: { dark, white } }) =>
                (bgWhite && !isDarkMode) || color === "light"
                  ? dark.main
                  : white.main,
              fontWeight: ({ typography: { fontWeightBold } }) =>
                fontWeightBold,
              cursor: "pointer",
              marginLeft: 2,
              transform: "translateY(-1px)"
            }}
            onClick={close}>
            close
          </Icon>
        </CustomBox>
      </CustomBox>
      <Divider sx={{ margin: 0 }} light={dividerColor} />
      <CustomBox
        p={1.5}
        sx={{
          fontSize: ({ typography: { size } }: Theme) => size.sm,
          color: ({ palette }: Theme) => {
            let colorValue =
              bgWhite || color === "light"
                ? palette.text.primary
                : palette.white.main;

            if (isDarkMode) {
              colorValue = color === "light" ? "inherit" : palette.white.main;
            }

            return colorValue;
          }
        }}>
        {content}
      </CustomBox>
    </CustomBox>
  );
};

export default CustomSnackbar;
