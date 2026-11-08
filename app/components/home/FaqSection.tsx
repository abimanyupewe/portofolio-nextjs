"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/app/actions/faqs";

const FaqSection = ({ faqs }: { faqs: FaqItem[] }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs.length) return null;

  return (
    <section id="faq" className="border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_3fr] md:gap-16 md:px-8">
        <div className="space-y-4 md:sticky md:top-28 md:self-start">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
          <h2 className="font-heading text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
            Common <span className="italic text-muted-foreground">questions</span>
          </h2>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {faqs.map((f) => {
            const open = openId === f.id;
            return (
              <li key={f.id}>
                <button
                  onClick={() => setOpenId(open ? null : f.id)}
                  aria-expanded={open}
                  aria-controls={`faq-${f.id}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-heading text-xl transition-colors group-hover:text-muted-foreground md:text-2xl">
                    {f.question}
                  </span>
                  <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0 text-muted-foreground">
                    <Plus size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`faq-${f.id}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl whitespace-pre-line pb-6 text-base leading-relaxed text-foreground/80">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqSection;
