import { ColumnInstance, Row, TableBodyProps } from "react-table";

import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import DataTableBodyCell from "../DataTableBodyCell";

// Extend the ColumnInstance type to include the custom 'align' property
interface CustomColumnInstance<T extends object> extends ColumnInstance<T> {
  align?: "left" | "center" | "right";
}

interface DataTableBodyProps<T extends object> {
  page: Row<T>[];
  prepareRow: (row: Row<T>) => void;
  noEndBorder?: boolean;
  tableBodyProps: TableBodyProps;
  rowsLength: number;
  getRowProps?: (row: Row<T>) => object;
}

const DataTableBody = <T extends object>({
  page,
  prepareRow,
  noEndBorder,
  tableBodyProps,
  rowsLength,
  getRowProps
}: DataTableBodyProps<T>) => (
  <TableBody {...tableBodyProps}>
    {page.map(row => {
      prepareRow(row);

      return (
        <TableRow {...row.getRowProps(getRowProps?.(row))}>
          {row.cells.map((cell, index) => {
            const cellColumn = cell.column as CustomColumnInstance<T>;
            return (
              <DataTableBodyCell
                noBorder={noEndBorder && rowsLength - 1 === index}
                align={cellColumn.align ? cellColumn.align : "left"}
                {...cell.getCellProps()}>
                {cell.render("Cell")}
              </DataTableBodyCell>
            );
          })}
        </TableRow>
      );
    })}
  </TableBody>
);

export default DataTableBody;
