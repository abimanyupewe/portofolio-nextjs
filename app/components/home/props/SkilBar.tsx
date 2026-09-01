"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkilBarProps {
  name: string;
  percentage: number;
}

const SkilBar: React.FC<SkilBarProps> = ({ name, percentage }) => {
  return (
    <div className="mb-4 font-ubuntu">
      <p className="text-sm font-semibold mb-2 text-gray-500">{name}</p>
      <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-md h-3 relative overflow-hidden">
        {/* Animasi Progress Bar */}
        <motion.div
          className="bg-black dark:bg-white h-3 rounded-md flex items-center justify-end pr-2"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Persentase di dalam progress bar */}
          <span className="text-white dark:text-black text-xs font-semibold">
            {percentage}%
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default SkilBar;
