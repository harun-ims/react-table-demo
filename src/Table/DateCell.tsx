import React from "react";
import { Table, Row, Column } from "@tanstack/react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TableData } from "./data";

interface DateCellProps {
  row: Row<TableData>;
  column: Column<TableData>;
  getValue: () => Date;
  table: Table<TableData>;
}

const DateCell: React.FC<DateCellProps> = ({
  row,
  column,
  getValue,
  table,
}) => {
  const date = getValue();
  const { updateData } = table.options.meta || {};

  return (
    <DatePicker
      dateFormat="dd MMM yyyy"
      selected={date}
      onChange={(date) => updateData(row.index, column.id, date)}
      className="w-full py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm"
    />
  );
};

export default DateCell;
