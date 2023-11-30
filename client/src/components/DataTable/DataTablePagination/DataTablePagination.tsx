import { t } from "i18next";

import Icon from "@mui/material/Icon";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomPagination from "components/mui/CustomPagination";
import CustomInput from "components/mui/CustomInput";

interface DataTablePaginationProps {
  canPreviousPage: boolean;
  renderPagination: React.ReactNode[];
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  showTotalEntries: boolean;
  pageOptions: number[];
  entriesStart: number;
  entriesEnd: number;
  rowsLength: number;
  pagination: { variant: string; color: string };
  customizedPageOptions: number[];
  pageIndex: number;
  handleInputPagination: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputPaginationValue: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const DataTablePagination = ({
  canPreviousPage,
  renderPagination,
  canNextPage,
  previousPage,
  nextPage,
  showTotalEntries,
  pageOptions,
  entriesStart,
  entriesEnd,
  rowsLength,
  pagination,
  customizedPageOptions,
  pageIndex,
  handleInputPagination,
  handleInputPaginationValue
}: DataTablePaginationProps) => (
  <CustomBox
    display="flex"
    flexDirection={{ xs: "column", sm: "row" }}
    justifyContent="space-between"
    alignItems={{ xs: "flex-start", sm: "center" }}
    p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}>
    {showTotalEntries && (
      <CustomBox mb={{ xs: 3, sm: 0 }}>
        <CustomTypography
          variant="button"
          color="secondary"
          fontWeight="regular">
          {t("common.XToYInATotalOfZEntries", {
            entriesStart,
            entriesEnd,
            rowsLength
          })}
        </CustomTypography>
      </CustomBox>
    )}
    {pageOptions.length > 1 && (
      <CustomPagination
        variant={pagination.variant ? pagination.variant : "gradient"}
        color={pagination.color ? pagination.color : "info"}>
        {canPreviousPage && (
          <CustomPagination item onClick={() => previousPage()}>
            <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
          </CustomPagination>
        )}
        {renderPagination?.length > 6 ? (
          <CustomBox width="5rem" mx={1}>
            <CustomInput
              inputProps={{
                type: "number",
                min: 1,
                max: customizedPageOptions.length
              }}
              value={customizedPageOptions[pageIndex]}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInputPagination(event);
                handleInputPaginationValue(event);
              }}
            />
          </CustomBox>
        ) : (
          renderPagination
        )}
        {canNextPage && (
          <CustomPagination item onClick={() => nextPage()}>
            <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
          </CustomPagination>
        )}
      </CustomPagination>
    )}
  </CustomBox>
);

export default DataTablePagination;
