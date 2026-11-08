import React from "react";
import { cn } from "@/lib/utils";

interface TextFilterProps {
  title: string;
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

// Minimal multi-select: plain text, active = brighter + thin underline. No boxes/borders.
const TextFilter: React.FC<TextFilterProps> = ({ title, options, selected, setSelected }) => {
  const toggle = (option: string) =>
    setSelected((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{title}</h3>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggle(option)}
              aria-pressed={active}
              className={cn(
                "relative text-sm transition-colors duration-200 hover:text-foreground",
                "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-foreground after:transition-transform after:duration-200",
                active ? "text-foreground after:scale-x-100" : "text-muted-foreground after:scale-x-0"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TextFilter;
