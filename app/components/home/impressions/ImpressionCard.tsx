"use client";

import React, { useEffect, useState } from "react";
import PulseHeart from "@/components/PulseHeart";
import { toggleLike, type ImpressionItem } from "@/app/actions/impressions";

const KEY = "liked-impressions";

const readLiked = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

const ImpressionCard = ({ item }: { item: ImpressionItem }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(item.likes);

  useEffect(() => setLiked(readLiked().includes(item.id)), [item.id]);

  const onChange = async (next: boolean, nextCount: number) => {
    setLiked(next);
    setCount(nextCount); // optimistic
    try {
      const all = readLiked().filter((id) => id !== item.id);
      localStorage.setItem(KEY, JSON.stringify(next ? [...all, item.id] : all));
    } catch {}
    try {
      setCount(await toggleLike(item.id, next)); // reconcile with the server total
    } catch {
      setLiked(!next);
      setCount(item.likes);
    }
  };

  const meta = [item.company, item.division].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full flex-col justify-between gap-6 rounded-xl border border-border bg-card p-6">
      <p className="text-base leading-relaxed text-foreground/90">&ldquo;{item.message}&rdquo;</p>
      <footer className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-heading text-lg font-semibold">{item.name}</p>
          {meta && <p className="truncate text-xs uppercase tracking-[0.15em] text-muted-foreground">{meta}</p>}
        </div>
        <PulseHeart
          liked={liked}
          count={count}
          onChange={onChange}
          size={16}
          corner={999}
          likedColor="var(--foreground)"
          idleColor="var(--muted-foreground)"
          pillColor="transparent"
          textColor="var(--foreground)"
          label={`Like impression from ${item.name}`}
        />
      </footer>
    </article>
  );
};

export default ImpressionCard;
