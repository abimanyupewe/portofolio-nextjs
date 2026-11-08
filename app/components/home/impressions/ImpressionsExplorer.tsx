"use client";

import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import TextFilter from "@/app/components/home/project/TextFilter";
import ImpressionCard from "./ImpressionCard";
import type { ImpressionItem } from "@/app/actions/impressions";

const sorts = ["Newest", "Most liked"];

const ImpressionsExplorer = ({ items }: { items: ImpressionItem[] }) => {
  const [query, setQuery] = useState("");
  const [divisions, setDivisions] = useState<string[]>([]);
  const [sort, setSort] = useState<string[]>(["Newest"]);

  const divisionOptions = useMemo(
    () => Array.from(new Set(items.map((i) => i.division).filter(Boolean) as string[])).sort(),
    [items]
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = items.filter((i) => {
      if (divisions.length && !(i.division && divisions.includes(i.division))) return false;
      if (!q) return true;
      return [i.name, i.company, i.division, i.message].some((v) => v?.toLowerCase().includes(q));
    });
    if (sort[0] === "Most liked") list.sort((a, b) => b.likes - a.likes || b.created_at.localeCompare(a.created_at));
    return list;
  }, [items, query, divisions, sort]);

  return (
    <div className="space-y-10">
      <div className="space-y-8">
        <label className="flex items-center gap-3 border-b border-border pb-3 focus-within:border-foreground">
          <Search size={18} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, company, division or words…"
            aria-label="Search impressions"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="grid gap-8 sm:grid-cols-2">
          {divisionOptions.length > 0 && (
            <TextFilter title="Division" options={divisionOptions} selected={divisions} setSelected={setDivisions} />
          )}
          {/* single-choice: picking one replaces the other */}
          <TextFilter
            title="Sort"
            options={sorts}
            selected={sort}
            setSelected={(next) => {
              const v = typeof next === "function" ? next(sort) : next;
              setSort(v.length ? [v[v.length - 1]] : sort);
            }}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-bold text-foreground">{shown.length}</span> of {items.length} impressions
      </p>

      {shown.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {shown.map((item) => (
            <ImpressionCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-muted-foreground">Nothing matches your search.</p>
      )}
    </div>
  );
};

export default ImpressionsExplorer;
