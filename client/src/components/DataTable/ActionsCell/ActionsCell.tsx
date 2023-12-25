import { useTranslation } from "react-i18next";

import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import CustomButton from "components/mui/CustomButton";

import { ActionsCellProps } from "./ActionCell.models";

const ActionsCell = <T extends object>({
  row,
  onEdit,
  onDelete,
  onSelect,
  customRowActions
}: ActionsCellProps<T>) => {
  const { t } = useTranslation();

  return (
    <>
      {onSelect && (
        <Tooltip title={t("common.select")} placement="top-start">
          <CustomButton
            sx={{ ml: 0.5 }}
            variant="outlined"
            color="success"
            iconOnly
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              onSelect?.(row);
            }}>
            <Icon>check</Icon>
          </CustomButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title={t("common.edit")} placement="top-start">
          <CustomButton
            variant="outlined"
            color="info"
            iconOnly
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              onEdit?.(row);
            }}>
            <Icon>edit</Icon>
          </CustomButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={t("common.delete")} placement="top-start">
          <CustomButton
            sx={{ ml: 0.5 }}
            variant="outlined"
            color="error"
            iconOnly
            onClick={(event: MouseEvent) => {
              event.stopPropagation();
              onDelete?.(row);
            }}>
            <Icon>delete</Icon>
          </CustomButton>
        </Tooltip>
      )}
      {customRowActions && customRowActions(row)}
    </>
  );
};

export default ActionsCell;
