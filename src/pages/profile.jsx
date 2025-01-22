import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import CharityProfile from "../components/CharityProfile";
const Invoice = () => {
  return (
    <>
      <>
        <Breadcrumb title="Profile" />
        <CharityProfile />
      </>
    </>
  );
};

export default Invoice;
