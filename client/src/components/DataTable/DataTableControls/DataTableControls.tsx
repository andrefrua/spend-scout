import { useTranslation } from "react-i18next";

import Autocomplete from "@mui/material/Autocomplete";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";
import CustomInput from "components/mui/CustomInput";

interface DataTableControlsProps {
  entriesPerPage: {
    defaultValue: string;
    entries: string[];
    canChange: boolean;
  };
  pageSize: number;
  entries: string[];
  setEntriesPerPage: (value: number) => void;
  canSearch: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const DataTableControls = ({
  entriesPerPage,
  pageSize,
  entries,
  setEntriesPerPage,
  canSearch,
  search,
  setSearch,
  onSearchChange
}: DataTableControlsProps) => {
  const { t } = useTranslation();

  return (
    <CustomBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}>
      {entriesPerPage && entriesPerPage.canChange && (
        <CustomBox display="flex" alignItems="center">
          <Autocomplete
            disableClearable
            value={pageSize.toString()}
            options={entries}
            onChange={(event, newValue) => {
              setEntriesPerPage(parseInt(newValue, 10));
            }}
            size="small"
            sx={{ width: "5rem" }}
            renderInput={params => <CustomInput {...params} />}
          />
          <CustomTypography
            variant="caption"
            color="secondary"
            sx={{ ml: "5px" }}>
            {t("common.entriesPerPage") || ""}
          </CustomTypography>
        </CustomBox>
      )}
      {canSearch && (
        <CustomBox width="12rem" ml="auto">
          <CustomInput
            placeholder={t("common.search") || ""}
            value={search}
            size="small"
            fullWidth
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { currentTarget } = event;
              setSearch(search);
              onSearchChange(currentTarget.value);
            }}
          />
        </CustomBox>
      )}
    </CustomBox>
  );
};

export default DataTableControls;
