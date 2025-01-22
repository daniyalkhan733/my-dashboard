import React from "react";
import "../../index.css";
import Breadcrumb from "../../components/Breadcrumb";
import DonationReport from "../../components/reports/DonationReport";
const Dashboard = () => {
  return (
    <>
        <Breadcrumb title="Donation Report" />
        <DonationReport />
    </>
  );
};

export default Dashboard;
