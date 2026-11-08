"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Large image viewer with thumbnails, arrows and keyboard navigation. */
const ProjectShowcase = ({ images, title }: { images: string[]; title: string }) => {
  const [index, setIndex] = useState(0);
  const count = images.length;
  if (!count) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <div
      className="space-y-4 outline-none"
      tabIndex={0}
      aria-label={`${title} gallery`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted/40">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* contain: app screenshots come in all shapes, never crop them */}
            <Image
              src={images[index]}
              alt={`${title} – image ${index + 1} of ${count}`}
              fill
              priority={index === 0}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            {[
              { dir: -1, Icon: ChevronLeft, side: "left-3", label: "Previous image" },
              { dir: 1, Icon: ChevronRight, side: "right-3", label: "Next image" },
            ].map(({ dir, Icon, side, label }) => (
              <button
                key={label}
                onClick={() => go(index + dir)}
                aria-label={label}
                className={cn(
                  "absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground opacity-0 backdrop-blur transition hover:bg-background focus-visible:opacity-100 group-hover:opacity-100",
                  side
                )}
              >
                <Icon size={20} />
              </button>
            ))}
            <span className="absolute bottom-3 right-3 rounded-full bg-background/80 px-3 py-1 text-xs tabular-nums backdrop-blur">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src + i} className="shrink-0">
              <button
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative block h-16 w-24 overflow-hidden rounded-md border transition",
                  i === index ? "border-foreground" : "border-border opacity-60 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectShowcase;
