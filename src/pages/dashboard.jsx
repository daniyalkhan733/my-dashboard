import React from "react";
import "../index.css";
import DashboardLayout from "../layout/dashboard-layout";
import Breadcrumb from "../components/Breadcrumb";
import DashboardDetails from "../components/Dashboard";
const Dashboard = () => {

// if(!localStorage.getItem('token')){
//   window.location.href = '/login';
// }

  return (
    <>
      <>
        <Breadcrumb title="Dashboard" />
        <DashboardDetails />
      </>
    </>
  );
};

export default Dashboard;
