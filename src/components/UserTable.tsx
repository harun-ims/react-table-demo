/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "./Table";
import EditTableCell from "./EditTableCell";
import SearchItem from "./SearchItem";
import Pagination from "./Pagination";

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
  { id: "1", name: "John Doe", address: "123 Main St", role: "user" },
  { id: "2", name: "Jane Doe", address: "456 Elm St", role: "admin" },
  { id: "3", name: "Alice Smith", address: "789 Oak St", role: "user" },
  { id: "4", name: "Bob Johnson", address: "321 Maple Ave", role: "user" },
  { id: "5", name: "Charlie Brown", address: "654 Pine St", role: "admin" },
  { id: "6", name: "David Wilson", address: "987 Cedar St", role: "user" },
  { id: "7", name: "Eva Davis", address: "741 Birch St", role: "user" },
  { id: "8", name: "Frank Miller", address: "852 Willow St", role: "admin" },
  { id: "9", name: "Grace Lee", address: "963 Redwood St", role: "user" },
  { id: "10", name: "Hank Green", address: "159 Spruce St", role: "admin" },
  { id: "11", name: "Ivy Baker", address: "753 Cherry St", role: "user" },
  { id: "12", name: "Jack White", address: "852 Elmwood Dr", role: "user" },
  { id: "13", name: "Karen Black", address: "951 Oakwood Dr", role: "admin" },
  { id: "14", name: "Leo Gray", address: "357 Cedarwood Dr", role: "user" },
  { id: "15", name: "Mia Harris", address: "456 Pinewood Dr", role: "admin" },
  {
    id: "16",
    name: "Nina Robinson",
    address: "789 Birchwood Dr",
    role: "user",
  },
  {
    id: "17",
    name: "Oscar Martinez",
    address: "321 Maplewood Dr",
    role: "admin",
  },
  { id: "18", name: "Paula Young", address: "654 Redwood Ln", role: "user" },
  { id: "19", name: "Quincy Allen", address: "987 Spruce Ln", role: "user" },
  { id: "20", name: "Rachel Adams", address: "741 Willow Ln", role: "admin" },
];

export interface ColumnFilterState {
  id: string;
  value: string;
}

const UserTable: React.FC = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFilterState[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the data for the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchItem
          filterBy="name"
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          placeholder="Search by name"
        />
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md
          hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Add new user
        </button>
      </div>
      <Table
        columns={columns}
        data={currentData}
        columnFilters={columnFilters}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserTable;
