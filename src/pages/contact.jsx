import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import ContactForm from "../components/ContactForm";
const Dashboard = () => {
  return (
    <>
      <DashboardLayout>
        <Breadcrumb title="Contact" />
        <ContactForm />
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
