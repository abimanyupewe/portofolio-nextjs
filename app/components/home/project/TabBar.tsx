import React from "react";

const TabBar = ({ activeTab, setActiveTab }) => {
  const tabs = ["All Project", "Website", "App", "UI/UX Design", "Fullstack"];

  return (
    <div className="flex flex-col space-y-2 bg-gray-100 border">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`p-2 text-left ${
            activeTab === tab
              ? "bg-purple-300 text-white border-l-4 border-purple-500"
              : "text-gray-700 hover:bg-purple-200 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;