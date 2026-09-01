import React from "react";

interface ColorConfig {
  bg: string;
  text: string;
}

interface ColorMapping {
  categoryProject: Record<string, ColorConfig>;
  language: Record<string, ColorConfig>;
  status: Record<string, ColorConfig>;
}

interface BadgeProps {
  type: keyof ColorMapping;
  value: string | string[];
}

const colorMapping: ColorMapping = {
  categoryProject: {
    Website: { bg: "bg-gray-100 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700", text: "text-gray-900 dark:text-gray-100 font-semibold" },
    App: { bg: "bg-gray-100 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700", text: "text-gray-900 dark:text-gray-100 font-semibold" },
    "UI/UX Design": { bg: "bg-gray-100 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700", text: "text-gray-900 dark:text-gray-100 font-semibold" },
    Fullstack: { bg: "bg-gray-100 dark:bg-zinc-800/80 border border-gray-200 dark:border-zinc-700", text: "text-gray-900 dark:text-gray-100 font-semibold" },
  },
  language: {
    JavaScript: { bg: "bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800", text: "text-gray-700 dark:text-gray-300" },
    Python: { bg: "bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800", text: "text-gray-700 dark:text-gray-300" },
    Dart: { bg: "bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800", text: "text-gray-700 dark:text-gray-300" },
    TypeScript: { bg: "bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800", text: "text-gray-700 dark:text-gray-300" },
    "Php Native": { bg: "bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800", text: "text-gray-700 dark:text-gray-300" },
  },
  status: {
    Selesai: { bg: "bg-black dark:bg-white", text: "text-white dark:text-black font-semibold" },
    Progres: { bg: "bg-gray-200 dark:bg-zinc-700", text: "text-gray-900 dark:text-gray-100" },
    Kolaborasi: { bg: "bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600", text: "text-gray-800 dark:text-gray-200" },
  },
};

const Badge: React.FC<BadgeProps> = ({ type, value }) => {
  // Handle both single value and array of values
  const values = Array.isArray(value) ? value : [value];

  return (
    <div className="flex flex-wrap gap-1">
      {values.map((val, index) => {
        // Get colors from colorMapping based on type and value
        const colors = colorMapping[type]?.[val] || {
          bg: "bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700",
          text: "text-gray-800 dark:text-gray-200",
        };

        return (
          <span
            key={index}
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${colors.bg} ${colors.text}`}
          >
            {val}
          </span>
        );
      })}
    </div>
  );
};

export default Badge;
