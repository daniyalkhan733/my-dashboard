import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import DashboardDetails from "../components/DashboardDetails";
const Dashboard = () => {

  return (
    <>
    <DashboardLayout>
      <Breadcrumb title="Dashboard" />
<DashboardDetails />
    </DashboardLayout>
    </>
  );
};

export default Dashboard;
