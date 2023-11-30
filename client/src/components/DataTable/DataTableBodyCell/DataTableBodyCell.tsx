import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";

import { DataTableBodyCellProps } from "./DataTableBodyCell.models";

const DataTableBodyCell = ({
  noBorder = false,
  align = "left",
  children
}: DataTableBodyCellProps): JSX.Element => {
  return (
    <CustomBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({
        palette: { light },
        typography: { size },
        borders: { borderWidth }
      }: Theme) => ({
        fontSize: size.sm,
        borderBottom: noBorder
          ? "none"
          : `${borderWidth[1]} solid ${light.main}`
      })}>
      <CustomBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{ verticalAlign: "middle" }}>
        {children}
      </CustomBox>
    </CustomBox>
  );
};

export default DataTableBodyCell;
