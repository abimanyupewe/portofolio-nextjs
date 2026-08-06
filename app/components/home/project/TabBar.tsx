import React from "react";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Project", "Website", "App", "UI/UX Design", "Fullstack"];

  return (
    <div className="flex flex-col space-y-2 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg p-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`p-3 rounded-md text-left transition-all duration-200 ${activeTab === tab
              ? "bg-emerald-500 text-white shadow-xs dark:bg-emerald-600 font-medium"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
