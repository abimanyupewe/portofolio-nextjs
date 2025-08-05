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
    Website: { bg: "bg-blue-100", text: "text-blue-800" },
    App: { bg: "bg-green-100", text: "text-green-800" },
    "UI/UX Design": { bg: "bg-purple-100", text: "text-purple-800" },
    Fullstack: { bg: "bg-yellow-100", text: "text-yellow-800" },
  },
  language: {
    JavaScript: { bg: "bg-yellow-100", text: "text-yellow-800" },
    Python: { bg: "bg-blue-100", text: "text-blue-800" },
    Dart: { bg: "bg-red-100", text: "text-red-800" },
    TypeScript: { bg: "bg-purple-100", text: "text-purple-800" },
    "Php Native": { bg: "bg-green-100", text: "text-green-800" },
  },
  status: {
    Selesai: { bg: "bg-green-100", text: "text-green-800" },
    Progres: { bg: "bg-yellow-100", text: "text-yellow-800" },
    Kolaborasi: { bg: "bg-purple-100", text: "text-purple-800" },
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
          bg: "bg-gray-100",
          text: "text-gray-800",
        };

        return (
          <span
            key={index}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${colors.bg} ${colors.text}`}
          >
            {val}
          </span>
        );
      })}
    </div>
  );
};

export default Badge;
