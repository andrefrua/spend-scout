import { useTranslation } from "react-i18next";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CustomBox from "components/mui/CustomBox";
import CustomButton from "components/mui/CustomButton";
import CustomTypography from "components/mui/CustomTypography";

interface ActionBarProps {
  title?: string;
  description?: string;
  showSubmit?: boolean;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionBar = ({
  title = "",
  description = "",
  showSubmit = true,
  onCancel
}: ActionBarProps) => {
  const { t } = useTranslation();

  return (
    <Grid item xs={12}>
      <Card>
        <CustomBox
          pr={3}
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}>
          <CustomBox p={3} lineHeight={1}>
            <CustomBox mb={1}>
              <CustomTypography variant="h5" fontWeight="medium">
                {title}
              </CustomTypography>
            </CustomBox>
            <CustomTypography variant="button" color="text">
              {description}
            </CustomTypography>
          </CustomBox>
          <CustomBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
            {showSubmit && (
              <CustomBox ml={{ xs: 2, sm: 1 }}>
                <CustomButton
                  type="submit"
                  variant="outlined"
                  color="secondary">
                  {t("common.save")}
                </CustomButton>
              </CustomBox>
            )}
            <CustomBox
              ml={{ xs: 2, sm: 1 }}
              mt={{ xs: 1, sm: 0 }}
              mb={{ xs: 1, sm: 0 }}>
              <CustomButton
                variant="gradient"
                color="error"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => onCancel?.(event)}>
                {t("common.cancel")}
              </CustomButton>
            </CustomBox>
          </CustomBox>
        </CustomBox>
      </Card>
    </Grid>
  );
};

export default ActionBar;
