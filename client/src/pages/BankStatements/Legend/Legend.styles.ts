import { Theme } from "@mui/material/styles";

export const customBadgeStyles = (theme: Theme, bgColor: string) => {
  const { palette } = theme;

  return {
    "& .MuiBadge-badge": {
      color: palette.dark.main,
      backgroundColor: bgColor
    }
  };
};
