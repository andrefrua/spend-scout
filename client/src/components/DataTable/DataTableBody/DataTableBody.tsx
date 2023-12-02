import { useState } from "react";
import { ColumnInstance, Row, TableBodyProps } from "react-table";

import { Theme } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";

import { useUIContext } from "context/UIProvider";

import DataTableBodyCell from "../DataTableBodyCell";
import { tableRow } from "./DataTableBody.styles";

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
  onRowClick?: (row: Row<T>) => void;
}

const DataTableBody = <T extends object>({
  page,
  prepareRow,
  noEndBorder,
  tableBodyProps,
  rowsLength,
  getRowProps,
  onRowClick
}: DataTableBodyProps<T>) => {
  const [hoveredRow, setHoveredRow] = useState<Row<T> | null>(null);

  const {
    state: { isDarkMode }
  } = useUIContext();

  const mouseEnterHandler = (
    event: React.MouseEvent<HTMLTableRowElement>,
    row: Row<T>
  ) => {
    setHoveredRow(row);
  };

  const mouseLeaveHandler = () => {
    setHoveredRow(null);
  };

  return (
    <TableBody {...tableBodyProps}>
      {page.map(row => {
        prepareRow(row);
        return (
          <TableRow
            {...row.getRowProps(getRowProps?.(row))}
            onClick={() => onRowClick?.(row)}
            onMouseEnter={(event: React.MouseEvent<HTMLTableRowElement>) =>
              mouseEnterHandler?.(event, row)
            }
            onMouseLeave={() => mouseLeaveHandler?.()}
            sx={(theme: Theme) =>
              tableRow(theme, isDarkMode, row === hoveredRow, !!onRowClick)
            }>
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
};

export default DataTableBody;
