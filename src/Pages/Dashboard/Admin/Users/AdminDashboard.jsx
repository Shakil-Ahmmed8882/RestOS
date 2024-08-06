import { useState } from "react";
import { ProjectTable } from "../../../../components/Dashboard/Sidebar/project-table/ProjectTable";
import { DashboardNavbar } from "../../../../components/Navbar/DashboardNavbar";
import Tabs from "../../../../components/Tabs/Tabs";
import { FilterTags } from "../../../../components/Shared/Filter/FilterTags";
import React from "react";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(false);

  const handleClick = (clickedItem) => {
    setActiveTab(!activeTab);
  };

  return (
    <div className="w-full relative">
      <DashboardNavbar />
      <Tabs handleClick={handleClick} />
      <ProjectTable />
      <FilterTags handleClick={handleClick} activeTab={activeTab} />
    </div>
  );
};
