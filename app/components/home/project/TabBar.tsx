import React from "react";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Project", "Website", "App", "UI/UX Design", "Fullstack"];

  return (
    <div className="flex flex-col space-y-2 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`p-3 rounded-lg text-left transition-all duration-200 ${
            activeTab === tab
              ? "bg-purple-500 text-white shadow-md dark:bg-purple-600"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-purple-600 dark:hover:text-purple-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
