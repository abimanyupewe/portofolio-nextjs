import React from 'react';

const LanguageFilter = ({ filtersLanguage, setFiltersLanguage }) => {
    const languageOptions = ["JavaScript", "Dart", "TypeScript", "Php Native"];
    
    // Handle select all/none for languages
    const allLanguagesSelected = languageOptions.every(lang => filtersLanguage.includes(lang));
    const toggleSelectAllLanguages = () => {
        if (allLanguagesSelected) {
            setFiltersLanguage([]);
        } else {
            setFiltersLanguage([...languageOptions]);
        }
    };

    return (
        <div className="space-y-2 p-4 bg-white rounded-lg shadow-sm border">
            {/* Header with select all toggle */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Filter Bahasa</h3>
                <button 
                    onClick={toggleSelectAllLanguages}
                    className="text-xs text-purple-600 hover:text-purple-800"
                >
                    {allLanguagesSelected ? "Hapus Semua" : "Pilih Semua"}
                </button>
            </div>

            {/* Language options */}
            <div className="space-y-2">
                {languageOptions.map((language) => {
                    const isChecked = filtersLanguage.includes(language);
                    return (
                        <label 
                            key={language} 
                            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                                isChecked ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                    setFiltersLanguage(prev => 
                                        isChecked
                                            ? prev.filter(item => item !== language)
                                            : [...prev, language]
                                    );
                                }}
                                className={`h-4 w-4 text-blue-600 rounded focus:ring-blue-500 ${
                                    isChecked ? "border-blue-300" : "border-gray-300"
                                }`}
                            />
                            <span className={`ml-2 text-sm ${
                                isChecked ? "text-blue-800 font-medium" : "text-gray-700"
                            }`}>
                                {language}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* Selected count */}
            {filtersLanguage.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                    {filtersLanguage.length} terpilih
                </div>
            )}
        </div>
    );
};

export default LanguageFilter;