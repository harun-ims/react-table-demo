import React from "react";
import classNames from "classnames";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between space-x-2">
      <button
        className={classNames(
          "px-3 py-1 rounded-md text-sm font-medium",
          currentPage === 1
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        )}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={classNames(
          "px-3 py-1 rounded-md text-sm font-medium",
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-300 text-gray-500"
            : "bg-blue-500 text-white hover:bg-blue-600"
        )}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
