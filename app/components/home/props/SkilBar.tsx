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
      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
        {/* Animasi Progress Bar */}
        <motion.div
          className="bg-purple-500 h-3 rounded-full flex items-center justify-end pr-2"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          {/* Persentase di dalam progress bar */}
          <span className="text-white text-xs font-semibold">
            {percentage}%
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default SkilBar;
