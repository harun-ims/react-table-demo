import React, { useEffect, useState } from "react";
import { Table, Row, Column } from "@tanstack/react-table";
import { TableData } from "./data";

interface EditTableCellProps {
  row: Row<TableData>;
  column: Column<TableData>;
  getValue: () => string;
  table: Table<TableData>;
}

const EditTableCell: React.FC<EditTableCellProps> = ({
  row,
  column,
  getValue,
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      className="w-full py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm"
    />
  );
};

export default EditTableCell;
