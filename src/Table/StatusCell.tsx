import React from "react";
import { Table, Row, Column } from "@tanstack/react-table";
import { STATUSES, TableData } from "./data";

interface StatusCellProps {
  row: Row<TableData>;
  column: Column<TableData>;
  getValue: () => { id: number; name: string; color: string };
  table: Table<TableData>;
}

const StatusCell: React.FC<StatusCellProps> = ({
  row,
  column,
  getValue,
  table,
}) => {
  const currentStatus = getValue();
  const { color } = currentStatus || {};

  const { updateData } = table.options.meta || {};

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = STATUSES.find(
      (status) => status.id.toString() === e.target.value
    );
    if (selectedStatus) {
      updateData(row.index, column.id, selectedStatus);
    }
  };

  return (
    <select
      className={`p-2 rounded-md text-white ${color}`}
      value={currentStatus?.id.toString() || ""}
      onChange={handleChange}
    >
      <option value="">Select a status</option>
      {STATUSES.map((status) => (
        <option
          key={status.id}
          value={status.id.toString()}
          className={`p-2 rounded-md text-white ${status.color}`}
        >
          {status.name}
        </option>
      ))}
    </select>
  );
};

export default StatusCell;
