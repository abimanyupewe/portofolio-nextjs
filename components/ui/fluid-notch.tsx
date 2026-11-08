"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotchItem {
  id: string;
  name: string;
  industry: string;
  description?: string;
  period?: string;
  website?: string;
  logo_url?: string;
}

const spring = { type: "spring" as const, duration: 0.6, bounce: 0.2 };

const Logo = ({ item, size }: { item: NotchItem; size: number }) =>
  item.logo_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.logo_url} alt="" width={size} height={size} className="rounded-full object-cover" style={{ width: size, height: size }} />
  ) : (
    <span
      className="flex items-center justify-center rounded-full bg-background/15 font-heading text-sm font-semibold"
      style={{ width: size, height: size }}
    >
      {item.name.charAt(0).toUpperCase()}
    </span>
  );

/**
 * A notch that hangs from the top of its area and morphs (one shared layout animation)
 * between a compact pill of companies and a detail card for the selected one.
 */
export const FluidNotch = ({ items, className }: { items: NotchItem[]; className?: string }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = items.find((i) => i.id === openId) ?? null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!items.length) return null;

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("flex justify-center", className)}>
        <motion.div
          layout
          transition={spring}
          style={{ borderRadius: 32, transformOrigin: "top center" }}
          className={cn(
            "overflow-hidden bg-foreground text-background shadow-xl",
            open ? "w-full max-w-xl" : "w-full max-w-3xl"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {open ? (
              <motion.div
                key="detail"
                layout="position"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-5 p-6 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Logo item={open} size={52} />
                    <div>
                      <h3 className="font-heading text-xl font-semibold leading-tight">{open.name}</h3>
                      <p className="text-xs uppercase tracking-[0.2em] opacity-60">
                        {open.industry}
                        {open.period && ` · ${open.period}`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpenId(null)}
                    aria-label="Close"
                    className="rounded-full p-2 opacity-60 transition hover:bg-background/10 hover:opacity-100"
                  >
                    <X size={18} />
                  </button>
                </div>
                {open.description && <p className="text-sm leading-relaxed opacity-80">{open.description}</p>}
                {open.website && (
                  <a
                    href={open.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                  >
                    Visit website <ArrowUpRight size={16} />
                  </a>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 p-5 sm:p-6"
              >
                <p className="text-center text-xs uppercase tracking-[0.25em] opacity-60">
                  Worked with {items.length} {items.length === 1 ? "company" : "companies"}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setOpenId(item.id)}
                      aria-expanded={false}
                      className="flex items-center gap-2 rounded-full bg-background/10 py-1.5 pl-1.5 pr-4 text-sm transition hover:bg-background/20 active:scale-[0.98]"
                    >
                      <Logo item={item} size={28} />
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </MotionConfig>
  );
};
