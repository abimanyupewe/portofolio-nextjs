import React from "react";

interface FilterCheckboxProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  filters,
  setFilters,
}) => {
  const statusOptions = ["Kolaborasi", "Progres", "Selesai"];

  // Handle select all/none
  const allSelected = statusOptions.every((option) => filters.includes(option));
  const toggleSelectAll = () => {
    if (allSelected) {
      setFilters([]);
    } else {
      setFilters([...statusOptions]);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header with select all toggle */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 text-sm">Filter Status</h3>
        <button
          onClick={toggleSelectAll}
          className="text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
        >
          {allSelected ? "Clear All" : "Select All"}
        </button>
      </div>

      {/* Status options */}
      <div className="space-y-2">
        {statusOptions.map((status) => {
          const isChecked = filters.includes(status);
          return (
            <label
              key={status}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                isChecked
                  ? "bg-purple-50 border border-purple-200"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setFilters((prev: string[]) =>
                      isChecked
                        ? prev.filter((item) => item !== status)
                        : [...prev, status]
                    );
                  }}
                  className="h-4 w-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2 transition-colors duration-200"
                />
                {isChecked && (
                  <svg
                    className="absolute inset-0 w-4 h-4 text-purple-600 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`ml-3 text-sm transition-colors duration-200 ${
                  isChecked
                    ? "text-purple-800 font-medium"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}
              >
                {status}
              </span>
            </label>
          );
        })}
      </div>

      {/* Selected count */}
      {filters.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-100">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {filters.length} selected
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;
