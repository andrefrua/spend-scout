import { useTranslation } from "react-i18next";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

const DataTableEmpty = () => {
  const { t } = useTranslation();

  return (
    <CustomBox position="relative">
      <CustomBox variant="gradient" m={2} textAlign="center">
        <CustomTypography variant="h5" mt={1}>
          {t("common.noRecordsFound")}
        </CustomTypography>
      </CustomBox>
    </CustomBox>
  );
};
export default DataTableEmpty;
