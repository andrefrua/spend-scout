import { useTranslation } from "react-i18next";

import CustomBox from "components/mui/CustomBox";
import CustomTypography from "components/mui/CustomTypography";

import ActionBarButton from "./ActionBarButton";

interface ActionBarProps {
  title?: string;
  description?: string;
  showSubmit?: boolean;
  onAdd?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onEdit?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  customAction?: React.ReactNode;
}

const ActionBar = ({
  title = "",
  description = "",
  showSubmit = true,
  onAdd,
  onEdit,
  onDelete,
  onCancel,
  customAction
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
        <CustomTypography variant="button" color="text">
          {description}
        </CustomTypography>
      </CustomBox>
      <CustomBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
        {customAction && customAction}
        {showSubmit && !onEdit && (
          <ActionBarButton type="submit" icon="save" color="success">
            {t("common.save")}
          </ActionBarButton>
        )}
        {onAdd && (
          <ActionBarButton
            icon="add"
            color="success"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onAdd?.(event)
            }>
            {t("common.new")}
          </ActionBarButton>
        )}
        {onEdit && (
          <ActionBarButton
            icon="edit"
            color="info"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onEdit?.(event)
            }>
            {t("common.edit")}
          </ActionBarButton>
        )}
        {onDelete && (
          <ActionBarButton
            icon="delete"
            color="error"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onDelete?.(event)
            }>
            {t("common.delete")}
          </ActionBarButton>
        )}
        {onCancel && (
          <ActionBarButton
            icon="cancel"
            color="secondary"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              onCancel?.(event)
            }>
            {t("common.cancel")}
          </ActionBarButton>
        )}
      </CustomBox>
    </CustomBox>
  );
};

export default ActionBar;
