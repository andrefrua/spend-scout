import React from "react";
import { Column, Row } from "react-table";

type DataTablePaginationVariant = "contained" | "gradient";

type DataTablePaginationColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "dark"
  | "light";

export interface DataTableProps<T extends object> {
  isLoading?: boolean;
  title?: string;
  subTitle?: string;
  entriesPerPage?: {
    defaultValue: string;
    entries: string[];
    canChange: boolean;
  };
  canSearch?: boolean;
  showTotalEntries?: boolean;
  table: {
    columns: Column<T>[];
    rows: T[];
  };
  pagination?: {
    variant: DataTablePaginationVariant;
    color: DataTablePaginationColor;
  };
  isSorted?: boolean;
  noEndBorder?: boolean;
  onAdd?: () => void;
  onEdit?: (row: Row<T>) => void;
  onDelete?: (row: Row<T>) => void;
  onSelect?: (row: Row<T>) => void;
  customActionBarButton?: React.ReactNode;
  getRowProps?: (row: Row<T>) => object;
}
