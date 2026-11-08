import React from "react";
import TextFilter from "./TextFilter";

interface LanguageFilterProps {
  filtersLanguage: string[];
  setFiltersLanguage: React.Dispatch<React.SetStateAction<string[]>>;
}

const languageOptions = ["JavaScript", "Dart", "TypeScript", "Php Native"];

const LanguageFilter: React.FC<LanguageFilterProps> = ({ filtersLanguage, setFiltersLanguage }) => (
  <TextFilter title="Language" options={languageOptions} selected={filtersLanguage} setSelected={setFiltersLanguage} />
);

export default LanguageFilter;
