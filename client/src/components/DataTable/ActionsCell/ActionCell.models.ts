import { Row } from "react-table";

export interface ActionsCellProps<T extends object> {
  row: Row<T>;
  onEdit?: (row: Row<T>) => void;
  onDelete?: (row: Row<T>) => void;
  onSelect?: (row: Row<T>) => void;
  customRowActions?: (row: Row<T>) => React.ReactNode;
}
