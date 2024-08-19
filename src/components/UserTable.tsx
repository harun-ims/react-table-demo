/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "./Table";
import EditTableCell from "./EditTableCell";

type TableData = {
  id: string;
  name: string;
  address: string;
  role: string;
};

const columnHelper = createColumnHelper<TableData>();

interface CustomRollCellProps {
  row: {
    original: {
      role: string;
    };
  };
  getValue: () => string;
}

const CustomRollCell: React.FC<CustomRollCellProps> = ({ getValue }) => {
  const value = getValue();
  return (
    <span
      className={`px-2 py-1 text-sm font-medium rounded-md ${
        value === "admin"
          ? "bg-red-100 text-red-800"
          : "bg-green-100 text-green-800"
      }`}
    >
      {value}
    </span>
  );
};

const columns: ColumnDef<TableData, any>[] = [
  columnHelper.accessor("id", {
    header: "ID",
  }),

  columnHelper.accessor("name", {
    header: "Name",
    cell: (props) => <EditTableCell {...props} name="name" />,
  }),

  columnHelper.accessor("address", {
    header: "Address",
    cell: (props) => <EditTableCell {...props} name="address" />,
  }),

  columnHelper.accessor("role", {
    header: "Role",
    cell: CustomRollCell,
  }),
];

const data: TableData[] = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main St",
    role: "user",
  },
  {
    id: "2",
    name: "Jane Doe",
    address: "456 Elm St",
    role: "admin",
  },
];

const UserTable: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-medium">User Table</h4>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md
          hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Add new user
        </button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default UserTable;
