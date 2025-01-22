import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import InvoiceTable from "../components/Invoice";
const Invoice = () => {
  return (
    <>
      <>
        <Breadcrumb title="Invoice" />
        <InvoiceTable />
      </>
    </>
  );
};

export default Invoice;
