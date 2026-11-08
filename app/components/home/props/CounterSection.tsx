"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface CounterData {
  end: number;
  label: string;
}

const Counter: React.FC<CounterData> = ({ end, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  // Count up only once the stat is actually on screen.
  useEffect(() => {
    if (!inView) return;
    if (reduce) return setCount(end);
    const controls = animate(0, end, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, end, reduce]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 px-6 py-2 text-center">
      <span
        aria-label={`${end}+`}
        className="font-heading text-6xl font-light tabular-nums tracking-tight text-foreground md:text-7xl"
      >
        {count}
        <span className="text-muted-foreground">+</span>
      </span>
      <span className="font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
    </div>
  );
};

const CounterSection: React.FC<{ counters: CounterData[] }> = ({ counters }) => (
  <section aria-label="Stats" className="w-full border-y border-border bg-background py-16 md:py-20">
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-y-10 px-6 md:divide-x md:divide-border">
      {counters.map((c) => (
        <div key={c.label} className="flex-1 basis-1/2 md:basis-0">
          <Counter {...c} />
        </div>
      ))}
    </div>
  </section>
);

export { Counter, CounterSection };
