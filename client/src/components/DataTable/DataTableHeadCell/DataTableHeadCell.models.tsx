export type DataTableHeadCellSorted = false | "none" | "asce" | "desc";

type DataTableHeadCellAlign = "left" | "right" | "center";

export type DataTableHeadCellProps = {
  width?: string | number;
  children: React.ReactNode;
  sorted?: DataTableHeadCellSorted;
  align?: DataTableHeadCellAlign;
};
