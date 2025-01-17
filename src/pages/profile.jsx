import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import CharityProfile from "../components/CharityProfile";
const Invoice = () => {
  return (
    <>
      <DashboardLayout>
        <Breadcrumb title="Profile" />
        <CharityProfile />
      </DashboardLayout>
    </>
  );
};

export default Invoice;
