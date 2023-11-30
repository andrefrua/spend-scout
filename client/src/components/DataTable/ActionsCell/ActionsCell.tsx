import { Row } from "react-table";

import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

export interface ActionsCellProps<T extends object> {
  row: Row<T>;
  onEdit?: (row: Row<T>) => void;
  onDelete?: (row: Row<T>) => void;
  onSelect?: (row: Row<T>) => void;
}

// TODO: Missing ActionsCellProps type
const ActionsCell = <T extends object>({
  row,
  onEdit,
  onDelete,
  onSelect
}: ActionsCellProps<T>) => (
  <>
    {onSelect && (
      <IconButton
        size="small"
        disableRipple
        color="success"
        onClick={() => onSelect?.(row)}>
        <Icon>check</Icon>
      </IconButton>
    )}
    {onEdit && (
      <IconButton
        size="small"
        disableRipple
        color="info"
        onClick={() => onEdit?.(row)}>
        <Icon>edit</Icon>
      </IconButton>
    )}
    {onDelete && (
      <IconButton
        size="small"
        disableRipple
        color="error"
        onClick={() => onDelete?.(row)}>
        <Icon>delete</Icon>
      </IconButton>
    )}
  </>
);

export default ActionsCell;
