import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import InvoiceTable from "../components/InvoiceDetails";
const Invoice = () => {

  return (
    <>
    <DashboardLayout>
      <Breadcrumb title="Invoice" />
      <InvoiceTable />
    </DashboardLayout>
    </>
  );
};

export default Invoice;
