import React from "react";

const FilterCheckbox = ({ filters, setFilters }) => {
  const statusOptions = ["Kolaborasi", "Progres", "Selesai"];

  // Handle select all/none
  const allSelected = statusOptions.every(option => filters.includes(option));
  const toggleSelectAll = () => {
    if (allSelected) {
      setFilters([]);
    } else {
      setFilters([...statusOptions]);
    }
  };

  return (
    <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm border">
      {/* Header with select all toggle */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">Filter Status</h3>
        <button 
          onClick={toggleSelectAll}
          className="text-xs text-purple-600 hover:text-purple-800"
        >
          {allSelected ? "Hapus Semua" : "Pilih Semua"}
        </button>
      </div>

      {/* Status options */}
      <div className="space-y-2">
        {statusOptions.map((status) => {
          const isChecked = filters.includes(status);
          return (
            <label 
              key={status} 
              className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                isChecked ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  setFilters(prev => 
                    isChecked
                      ? prev.filter(item => item !== status)
                      : [...prev, status]
                  );
                }}
                className={`h-4 w-4 text-blue-600 rounded focus:ring-blue-500 ${
                  isChecked ? "border-blue-300" : "border-gray-300"
                }`}
              />
              <span className={`ml-2 text-sm ${
                isChecked ? "text-blue-800 font-medium" : "text-gray-700"
              }`}>
                {status}
              </span>
            </label>
          );
        })}
      </div>

      {/* Selected count */}
      {filters.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          {filters.length} terpilih
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;