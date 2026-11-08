"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Title from "@/app/components/home/props/Title";
import ImpressionCard from "./ImpressionCard";
import ImpressionModal from "./ImpressionModal";
import type { ImpressionItem } from "@/app/actions/impressions";

const PREVIEW = 6;

const ImpressionsSection = ({ initialItems, total }: { initialItems: ImpressionItem[]; total: number }) => {
  const [items, setItems] = useState(initialItems);
  const [added, setAdded] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <section id="impressions" className="py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Title text1="Working" text2="With Me" />
            <p className="max-w-xl text-sm text-muted-foreground">
              Impressions from people I&apos;ve worked with. Worked with me? Leave yours.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center self-start rounded-full bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-background transition hover:opacity-85 active:scale-[0.98]"
          >
            Leave an impression
          </button>
        </div>

        {items.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {items.slice(0, PREVIEW).map((item) => (
              <ImpressionCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">No impressions yet. Be the first!</p>
        )}

        {total + added > PREVIEW && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/impressions"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all {total + added} impressions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      <ImpressionModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={(item) => {
          setItems((prev) => [item, ...prev]);
          setAdded((n) => n + 1);
        }}
      />
    </section>
  );
};

export default ImpressionsSection;
