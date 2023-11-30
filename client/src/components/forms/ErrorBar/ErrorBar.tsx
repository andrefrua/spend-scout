import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

interface ErrorBarProps {
  error: string;
}

const ErrorBar = ({ error }: ErrorBarProps) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Card>
        <CustomBox bgColor="error" variant="gradient" borderRadius="xl">
          <CustomBox p={2}>
            <CustomTypography color="white" fontSize={14}>
              {t(error)}
            </CustomTypography>
          </CustomBox>
        </CustomBox>

        {/* <CustomBox bgColor="error" variant="gradient" borderRadius="xl">
        <CustomBox pt={3} px={3}>
          <CustomTypography variant="h6" color="white">
            {t("common.somethingWentWrong")}
          </CustomTypography>
        </CustomBox>
        <CustomBox p={2}>PLIM</CustomBox>
      </CustomBox> */}
      </Card>
    </Grid>
  );
};

export default ErrorBar;
