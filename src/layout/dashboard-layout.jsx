import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row min-h-[1000px] bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-2 md:p-6">
        <Header charityName="Sadaqah Online" />
        <slot />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
