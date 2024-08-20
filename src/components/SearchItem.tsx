import React from "react";
import { ColumnFilterState } from "./UserTable";

interface SearchItemProps {
  filterBy: string;
  columnFilters: ColumnFilterState[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilterState[]>>;
  placeholder?: string;
}

const SearchItem: React.FC<SearchItemProps> = ({
  filterBy,
  columnFilters,
  setColumnFilters,
  ...rest
}) => {
  const value = columnFilters.find((filter) => filter.id === filterBy)?.value;

  const onFilterChange = (id: string, value: string) => {
    setColumnFilters((prev: ColumnFilterState[]) => {
      // Filter out any existing filter for the given column ID.
      const newFilters = prev.filter((f) => f.id !== id);

      // If a value is provided, add the new filter for the column.
      if (value) {
        newFilters.push({ id, value });
      }

      // Update the state with the new filters.
      return newFilters;
    });
  };

  return (
    <input
      type="text"
      className="py-2 px-2 text-sm ring-1 focus:outline-none focus:ring-1 focus:ring-blue-300 rounded-sm"
      value={value}
      onChange={(e) => onFilterChange(filterBy, e.target.value)}
      {...rest}
    />
  );
};

export default SearchItem;
