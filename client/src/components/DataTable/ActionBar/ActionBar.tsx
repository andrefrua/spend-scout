import { useTranslation } from "react-i18next";

import CustomBox from "components/mui/CustomBox";
import CustomButton from "components/mui/CustomButton";
import CustomTypography from "components/mui/CustomTypography";

export type ActionBarProps = {
  title?: string;
  subTitle?: string;
  onAdd?: (event: MouseEvent) => void;
  labels?: { addButton?: string };
  isAddButtonDisabled?: boolean;
};
const ActionBar = ({
  title,
  subTitle,
  onAdd,
  labels,
  isAddButtonDisabled
}: ActionBarProps) => {
  const { t } = useTranslation();

  return (
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
        {subTitle && (
          <CustomTypography variant="button" color="text">
            {subTitle}
          </CustomTypography>
        )}
      </CustomBox>
      {onAdd && (
        <CustomBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          px={{ xs: 2, sm: 0 }}>
          <CustomButton
            variant="gradient"
            color="success"
            onClick={onAdd}
            disabled={isAddButtonDisabled}>
            {labels?.addButton ? labels?.addButton : t("common.new")}
          </CustomButton>
        </CustomBox>
      )}
    </CustomBox>
  );
};

export default ActionBar;
