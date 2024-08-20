import React from "react";
import { STATUSES } from "./data";

interface ColumnFilter {
  id: string;
  value: number[];
}

interface FilterPopoverProps {
  setColumnFilters: (state: ColumnFilter[]) => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ setColumnFilters }) => {
  return (
    <select
      className="p-2 rounded-md"
      onChange={(e) =>
        setColumnFilters([
          {
            id: "status",
            value: [1],
          },
        ])
      }
    >
      <option value="all">All</option>
      {STATUSES.map((status) => (
        <option key={status.id} value={status.id.toString()}>
          {status.name}
        </option>
      ))}
    </select>
  );
};

export default FilterPopover;
