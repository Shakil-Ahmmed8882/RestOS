import { Tabs, Tab } from "@nextui-org/react";
import React, { useState } from "react";

export default function TabsWrapper({ tabs, size, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.id); 

  const handleTabChange = (key) => {
    setSelectedTab(key);
    onTabChange(key); 
  };

  return (
    <Tabs
      size={size}
      aria-label="Tabs with  custom active tab color"
      selectedKey={selectedTab} 
      onSelectionChange={handleTabChange} 
      className="my-4 mb-10"
      
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          title={tab.label}
          className={`py-2 px-4 text-sm font-medium transition-all ${
            selectedTab === tab.id
              ? "text-[white] !bg-primaryColor"
              : "bg-" 
          }`}
        >
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
}
