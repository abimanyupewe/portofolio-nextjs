import React from "react";

interface LanguageFilterProps {
  filtersLanguage: string[];
  setFiltersLanguage: React.Dispatch<React.SetStateAction<string[]>>;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({
  filtersLanguage,
  setFiltersLanguage,
}) => {
  const languageOptions = ["JavaScript", "Dart", "TypeScript", "Php Native"];

  // Handle select all/none for languages
  const allLanguagesSelected = languageOptions.every((lang) =>
    filtersLanguage.includes(lang)
  );
  const toggleSelectAllLanguages = () => {
    if (allLanguagesSelected) {
      setFiltersLanguage([]);
    } else {
      setFiltersLanguage([...languageOptions]);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
      {/* Header with select all toggle */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Filter Language</h3>
        <button
          onClick={toggleSelectAllLanguages}
          className="text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
        >
          {allLanguagesSelected ? "Clear All" : "Select All"}
        </button>
      </div>

      {/* Language options */}
      <div className="space-y-2">
        {languageOptions.map((language) => {
          const isChecked = filtersLanguage.includes(language);
          return (
            <label
              key={language}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                isChecked
                  ? "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                  : "hover:bg-gray-50 dark:hover:bg-zinc-800/50 border border-transparent"
              }`}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setFiltersLanguage((prev: string[]) =>
                      isChecked
                        ? prev.filter((item) => item !== language)
                        : [...prev, language]
                    );
                  }}
                  className="h-4 w-4 text-purple-600 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 rounded focus:ring-purple-500 focus:ring-2 transition-colors duration-200"
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
                    ? "text-purple-800 dark:text-purple-300 font-medium"
                    : "text-gray-700 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                }`}
              >
                {language}
              </span>
            </label>
          );
        })}
      </div>

      {/* Selected count */}
      {filtersLanguage.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-zinc-800">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
            {filtersLanguage.length} selected
          </span>
        </div>
      )}
    </div>
  );
};

export default LanguageFilter;
