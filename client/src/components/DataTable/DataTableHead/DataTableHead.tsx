import { HeaderGroup } from "react-table";

import TableRow from "@mui/material/TableRow";

import CustomBox from "components/mui/CustomBox";

import DataTableHeadCell from "../DataTableHeadCell";
import { DataTableHeadCellSorted } from "../DataTableHeadCell/DataTableHeadCell.models";

// Extend the HeaderGroup type to include the custom 'align' property
interface CustomHeaderGroup<T extends object> extends HeaderGroup<T> {
  align?: "left" | "center" | "right";
}

interface DataTableHeadProps<T extends object> {
  headerGroups: CustomHeaderGroup<T>[];
  isSorted: boolean;
}

const DataTableHead = <T extends object>({
  headerGroups,
  isSorted
}: DataTableHeadProps<T>) => {
  // A function that sets the sorted value for the table
  const setSortedValue = (
    column: CustomHeaderGroup<T>
  ): DataTableHeadCellSorted => {
    let sortedValue: DataTableHeadCellSorted;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  return (
    <CustomBox component="thead">
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: CustomHeaderGroup<T>) => {
            const headerProps = isSorted
              ? column.getHeaderProps(column.getSortByToggleProps())
              : undefined;

            return (
              <DataTableHeadCell
                {...headerProps}
                width={column.width ? column.width : "auto"}
                align={column.align ? column.align : "left"}
                sorted={setSortedValue(column)}>
                {column.render("Header")}
              </DataTableHeadCell>
            );
          })}
        </TableRow>
      ))}
    </CustomBox>
  );
};

export default DataTableHead;
