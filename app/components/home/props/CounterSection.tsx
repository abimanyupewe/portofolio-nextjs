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
    const duration = 2000; // Durasi animasi dalam ms
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
  }, [end]);

  return (
    <div className="flex flex-col items-center text-center p-4">
      <motion.h2
        className="text-xl sm:text-4xl font-semibold text-violet-500 font-ubuntu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {count}+
      </motion.h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 font-poppins">{label}</p>
    </div>
  );
};

const CounterSection: React.FC<CounterSectionProps> = ({ counters }) => {
  return (
    <div className="flex justify-center gap-10 bg-gray-100 dark:bg-zinc-900/50 py-12 w-full transition-colors">
      {counters.map((counter: CounterData, index: number) => (
        <Counter key={index} end={counter.end} label={counter.label} />
      ))}
    </div>
  );
};

export { Counter, CounterSection };
