import { useTranslation } from "react-i18next";

import { Theme } from "@mui/material/styles";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import { useUIContext } from "context/UIProvider";

import { dataTableEmptyContainer } from "./DataTableEmpty.styles";

const DataTableEmpty = () => {
  const { t } = useTranslation();
  const {
    state: { isDarkMode }
  } = useUIContext();

  return (
    <CustomBox
      m={2}
      textAlign="center"
      sx={(theme: Theme) => dataTableEmptyContainer(theme, isDarkMode)}>
      <CustomTypography variant="h5" mt={1}>
        {t("common.noRecordsFound")}
      </CustomTypography>
    </CustomBox>
  );
};
export default DataTableEmpty;
