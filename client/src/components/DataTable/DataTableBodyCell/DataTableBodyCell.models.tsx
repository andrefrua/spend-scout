type DataTableBodyCellAlign = "left" | "right" | "center";

export type DataTableBodyCellProps = {
  children: React.ReactNode;
  noBorder?: boolean;
  align?: DataTableBodyCellAlign;
  width?: string;
};
