import { useMemo, useEffect, useState, useCallback } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  Row,
  Column,
  CellProps,
  TableInstance
} from "react-table";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import CustomPagination from "components/mui/CustomPagination";

import { DataTableProps } from "./DataTable.models";
import ActionBar from "./ActionBar";
import ActionsCell from "./ActionsCell";
import DataTableHead from "./DataTableHead";
import DataTableBody from "./DataTableBody";
import DataTablePagination from "./DataTablePagination";
import DataTableControls from "./DataTableControls";
import DataTableLoading from "./DataTableLoading";
import DataTableEmpty from "./DataTableEmpty";

const actionsCellProps = {
  align: "right"
};

const actionsCellColumn = <T extends object>(
  onEdit?: (row: Row<T>) => void,
  onDelete?: (row: Row<T>) => void,
  onSelect?: (row: Row<T>) => void
): Column<T>[] => [
  {
    Header: "",
    id: "actions",
    width: "auto",
    disableSortBy: true,
    ...actionsCellProps,
    Cell: ({ row }: CellProps<T>) => (
      <ActionsCell
        row={row}
        onEdit={onEdit}
        onDelete={onDelete}
        onSelect={onSelect}
      />
    )
  }
];

const DataTable = <T extends object>({
  isLoading = false,
  title,
  subTitle,
  entriesPerPage = {
    defaultValue: "10",
    entries: ["5", "10", "15", "20", "25"],
    canChange: true
  },
  canSearch = false,
  showTotalEntries = true,
  table,
  pagination = { variant: "gradient", color: "info" },
  isSorted = true,
  noEndBorder = false, // TODO: I don't think this is doing anything
  onAdd,
  onEdit,
  onDelete,
  onSelect,
  labels,
  getRowProps,
  isAddButtonDisabled
}: DataTableProps<T>): JSX.Element => {
  const { defaultValue, entries } = entriesPerPage;

  const columns = useMemo(() => {
    const baseColumns = table.columns;

    if (onEdit || onDelete || onSelect) {
      return [...baseColumns, ...actionsCellColumn(onEdit, onDelete, onSelect)];
    }

    return baseColumns;
  }, [table, onEdit, onDelete, onSelect]);
  const data = useMemo<T[]>(() => table.rows, [table]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  }: TableInstance<T> = tableInstance;

  // Create a memoized version of setPageSize to avoid infinite rendering
  const memoizedSetPageSize = useCallback(
    (value: number) => {
      if (value !== pageSize) {
        setPageSize(value);
      }
    },
    [pageSize, setPageSize]
  );

  // Set the default value for the entries per page when component mounts
  useEffect(
    () => memoizedSetPageSize(Number(defaultValue)),
    [defaultValue, memoizedSetPageSize]
  );

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value: number) => memoizedSetPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option: number) => (
    <CustomPagination
      item
      key={option}
      onClick={() => gotoPage(option)}
      active={pageIndex === option}>
      {option + 1}
    </CustomPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Number(value);

    return parsedValue > pageOptions.length || parsedValue < 0
      ? gotoPage(0)
      : gotoPage(parsedValue);
  };

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option: number) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({
    target: value
  }: React.ChangeEvent<HTMLInputElement>) => gotoPage(Number(value.value) - 1);

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value: string) => {
    setGlobalFilter(value || undefined);
  }, 400);

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none", mb: 2, fontSize: "0.5em" }}>
      {title || subTitle || onAdd ? (
        <ActionBar
          title={title}
          subTitle={subTitle}
          onAdd={onAdd}
          labels={labels}
          isAddButtonDisabled={isAddButtonDisabled}
        />
      ) : null}

      {isLoading && <DataTableLoading />}

      {!isLoading && (
        <>
          {entriesPerPage || canSearch ? (
            <DataTableControls
              entriesPerPage={entriesPerPage}
              pageSize={pageSize}
              entries={entries}
              setEntriesPerPage={setEntriesPerPage}
              canSearch={canSearch}
              search={search}
              setSearch={setSearch}
              onSearchChange={onSearchChange}
            />
          ) : null}

          {rows.length === 0 && <DataTableEmpty />}

          {rows.length > 0 && (
            <>
              <Table {...getTableProps()}>
                <DataTableHead
                  headerGroups={headerGroups}
                  isSorted={isSorted}
                />
                <DataTableBody
                  page={page}
                  prepareRow={prepareRow}
                  noEndBorder={noEndBorder}
                  tableBodyProps={getTableBodyProps()}
                  rowsLength={rows.length}
                  getRowProps={getRowProps}
                />
              </Table>

              <DataTablePagination
                canPreviousPage={canPreviousPage}
                renderPagination={renderPagination}
                canNextPage={canNextPage}
                previousPage={previousPage}
                nextPage={nextPage}
                showTotalEntries={showTotalEntries}
                pageOptions={pageOptions}
                entriesStart={entriesStart}
                entriesEnd={entriesEnd}
                rowsLength={rows.length}
                pagination={pagination}
                customizedPageOptions={customizedPageOptions}
                pageIndex={pageIndex}
                handleInputPagination={handleInputPagination}
                handleInputPaginationValue={handleInputPaginationValue}
              />
            </>
          )}
        </>
      )}
    </TableContainer>
  );
};

export default DataTable;
