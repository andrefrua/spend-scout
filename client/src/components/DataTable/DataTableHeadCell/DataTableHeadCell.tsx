import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";

import { useUIContext } from "context/UIProvider";

import { DataTableHeadCellProps } from "./DataTableHeadCell.models";

const DataTableHeadCell = ({
  width = "auto",
  children,
  sorted = "none",
  align = "left",
  ...others
}: DataTableHeadCellProps): JSX.Element => {
  const {
    state: { isDarkMode }
  } = useUIContext();

  return (
    <CustomBox
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }: Theme) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`
      })}>
      <CustomBox
        {...others}
        position="relative"
        textAlign={align}
        color={isDarkMode ? "white" : "secondary"}
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }: Theme) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none"
        })}>
        {children}
        {sorted && (
          <CustomBox
            position="absolute"
            top={0}
            right={align !== "right" ? "16px" : 0}
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }: Theme) => ({
              fontSize: size.lg
            })}>
            <CustomBox
              position="absolute"
              top={-6}
              color={sorted === "asce" ? "text" : "secondary"}
              opacity={sorted === "asce" ? 1 : 0.5}>
              <Icon>arrow_drop_up</Icon>
            </CustomBox>
            <CustomBox
              position="absolute"
              top={0}
              color={sorted === "desc" ? "text" : "secondary"}
              opacity={sorted === "desc" ? 1 : 0.5}>
              <Icon>arrow_drop_down</Icon>
            </CustomBox>
          </CustomBox>
        )}
      </CustomBox>
    </CustomBox>
  );
};

export default DataTableHeadCell;
