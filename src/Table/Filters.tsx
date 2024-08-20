import React from "react";
import FilterPopover from "./FilterPopover";

interface ColumnFilter {
  id: string;
  value: string;
}

interface FiltersProps {
  columnFilters: ColumnFilter[];
  setColumnFilters: (update: (prev: ColumnFilter[]) => ColumnFilter[]) => void;
}

const Filters: React.FC<FiltersProps> = ({
  columnFilters,
  setColumnFilters,
}) => {
  const value = columnFilters.find((filter) => filter.id === "task")?.value;

  const onFilterChange = (id: string, value: string) => {
    setColumnFilters((prev: ColumnFilter[]) => {
      const newFilters = prev.filter((f) => f.id !== id);
      if (value) {
        newFilters.push({ id, value });
      }
      return newFilters;
    });
  };

  return (
    <div className="inline-flex items-center gap-8 w-full py-2 px-1 bg-white">
      <input
        value={value}
        onChange={(e) => onFilterChange("task", e.target.value)}
        type="text"
        placeholder="Search here..."
        className="py-2 px-2 text-sm ring-1 focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm"
      />

      <FilterPopover setColumnFilters={setColumnFilters} />
    </div>
  );
};

export default Filters;
