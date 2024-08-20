/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import DATA, { TableData } from "./data";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  TableMeta,
  getFilteredRowModel,
} from "@tanstack/react-table";
import "./style.css";
import EditTableCell from "./EditTableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import FilterPopover from "./FilterPopover";

export interface CustomTableMeta extends TableMeta<TableData> {
  updateData?: (rowIndex: number, column: string, value: string) => void;
}

const columns: ColumnDef<TableData, any>[] = [
  {
    accessorKey: "task",
    header: "Task",
    size: 325,
    cell: EditTableCell,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: StatusCell,
  },
  {
    accessorKey: "due",
    header: "Due",
    size: 150,
    cell: DateCell,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 325,
    cell: EditTableCell,
  },
];

const TaskTable: React.FC = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex: number, column: string, value: string) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...row, [column]: value } : row
          )
        ),
    } as CustomTableMeta,
  });

  console.log(data);

  return (
    <div className="overflow-x-auto">
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <PerfectScrollbar>
        <table
          width={table.getTotalSize()}
          className="divide-y divide-gray-200"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <thead key={headerGroup.id} className="bg-gray-50">
              <tr>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    />
                  </th>
                ))}
              </tr>
            </thead>
          ))}

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
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
};

export default TaskTable;
