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
              ? "bg-black text-white dark:bg-white dark:text-black font-semibold shadow-xs"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
