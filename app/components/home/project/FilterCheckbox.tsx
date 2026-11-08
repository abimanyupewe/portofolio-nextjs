import React from "react";
import TextFilter from "./TextFilter";

interface FilterCheckboxProps {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

const statusOptions = ["Kolaborasi", "Progres", "Selesai"];

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({ filters, setFilters }) => (
  <TextFilter title="Status" options={statusOptions} selected={filters} setSelected={setFilters} />
);

export default FilterCheckbox;
