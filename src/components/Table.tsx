/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

interface RowData {
  [key: string]: any;
}

interface IndeterminateCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate ? indeterminate : false;
    }
  }, [indeterminate]);

  return (
    <input
      className={classNames("form-checkbox", className)}
      type="checkbox"
      ref={ref}
      {...rest}
    />
  );
}

const columnHelper = createColumnHelper<RowData>();

const selectionColumn = columnHelper.accessor("", {
  id: "select",
  maxSize: 50,
  header: ({ table }) => (
    <IndeterminateCheckbox
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
    />
  ),
  cell: ({ row }) => (
    <IndeterminateCheckbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      indeterminate={row.getIsSomeSelected()}
      onChange={row.getToggleSelectedHandler()}
    />
  ),
});

interface TableProps {
  data: RowData[];
  columns: any[];
  disableMultiSelection?: boolean;
  disableColumnResize?: boolean;
  defaultSize?: number;
  minSize?: number;
  columnVisibility?: Record<string, boolean>;
  columnFilters?: any[] | null;
}

function Table({
  data = [],
  columns = [],
  disableMultiSelection = false,
  disableColumnResize = false,
  defaultSize = 300,
  minSize = 150,
  columnVisibility = {},
  columnFilters = null,
}: TableProps) {
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});
  const tableColumns = disableMultiSelection
    ? [...columns]
    : [selectionColumn, ...columns];

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      rowSelection,
      columnVisibility,
      ...(columnFilters && { columnFilters }),
    },
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn: {
      size: defaultSize,
      minSize,
    },
  });

  const [tbodyRef] = useAutoAnimate();

  return (
    <div>
      <PerfectScrollbar>
        <table
          className="min-w-full divide-y divide-gray-200"
          style={{ width: table.getTotalSize() }}
        >
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={classNames(
                      "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative",
                      {
                        "cursor-pointer": header.column.getCanSort(),
                      }
                    )}
                    style={{ width: header.getSize() }}
                  >
                    <div>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {!disableColumnResize && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className="col-resizer"
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" ref={tbodyRef}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </PerfectScrollbar>
    </div>
  );
}

export default Table;
