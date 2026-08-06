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
    <div className="space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-xs border border-gray-100 dark:border-zinc-800">
      {/* Header with select all toggle */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Filter Status</h3>
        <button
          onClick={toggleSelectAll}
          className="text-xs text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200"
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
              className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 group ${isChecked
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                  : "hover:bg-gray-50 dark:hover:bg-zinc-800/50 border border-transparent"
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
                  className="h-4 w-4 text-emerald-600 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 rounded focus:ring-emerald-500 focus:ring-2 transition-colors duration-200"
                />
                {isChecked && (
                  <svg
                    className="absolute inset-0 w-4 h-4 text-emerald-600 pointer-events-none"
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
                className={`ml-3 text-sm transition-colors duration-200 ${isChecked
                    ? "text-emerald-800 dark:text-emerald-300 font-medium"
                    : "text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
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
        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
            {filters.length} selected
          </span>
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;
