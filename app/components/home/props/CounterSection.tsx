"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CounterProps {
  end: number;
  label: string;
}

interface CounterData {
  end: number;
  label: string;
}

interface CounterSectionProps {
  counters: CounterData[];
}

const Counter: React.FC<CounterProps> = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const intervalTime = 20;
    const step = end / (duration / intervalTime);

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, intervalTime);
    return () => clearInterval(counter);
  }, [end]);

  return (
    <div className="flex items-center justify-center p-4 space-x-3">
      <motion.h2
        className="text-5xl md:text-7xl font-black text-emerald-500 dark:text-emerald-400 tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {count}+
      </motion.h2>
      <p className="text-sm font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-2">
        {label}
      </p>
    </div>
  );
};

const CounterSection: React.FC<CounterSectionProps> = ({ counters }) => {
  return (
    <div className="w-full py-20 dark:bg-black bg-white transition-colors border-y border-gray-100 dark:border-zinc-800/50">
      <div className="flex flex-wrap justify-center gap-12 md:gap-32 max-w-7xl mx-auto px-4">
        {counters.map((counter: CounterData, index: number) => (
          <Counter key={index} end={counter.end} label={counter.label} />
        ))}
      </div>
    </div>
  );
};

export { Counter, CounterSection };
