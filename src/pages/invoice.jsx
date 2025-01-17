import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
const Invoice = () => {

  return (
    <>
    <DashboardLayout>
      <Breadcrumb title="Invoice" />
   <h1>Invoice page</h1>
    </DashboardLayout>
    </>
  );
};

export default Invoice;
