"use client";

import React, { useEffect, useRef, useState } from "react";
import OptionWheel from "@/components/OptionWheel";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = ["All Project", "Website", "App", "UI/UX Design", "Fullstack"];

// Category picker as a plain-text wheel (no boxes/outlines).
const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  const chosen = useRef(activeTab);
  const [wheelKey, setWheelKey] = useState(0);

  // The wheel is uncontrolled: remount it only when the category is changed from outside (e.g. "Clear Filters").
  useEffect(() => {
    if (activeTab !== chosen.current) {
      chosen.current = activeTab;
      setWheelKey((k) => k + 1);
    }
  }, [activeTab]);

  return (
    <div className="h-56 w-full">
      <OptionWheel
        key={wheelKey}
        items={tabs}
        defaultSelected={Math.max(tabs.indexOf(activeTab), 0)}
        onChange={(_, item) => {
          chosen.current = item;
          setActiveTab(item);
        }}
        textColor="var(--muted-foreground)"
        activeColor="var(--foreground)"
        fontSize={1.5}
        inset={0}
        blur={1}
        fade={0.12}
        minOpacity={0.2}
      />
    </div>
  );
};

export default TabBar;
