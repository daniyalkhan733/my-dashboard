import React from "react";
import CardOne from "./dashboard/CardOne";
import CardTwo from "./dashboard/CardTwo";
import DonorTable from "./dashboard/DonorTable";
import TransactionData from "./dashboard/TransactionData";

const DashboardDetails = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <CardOne
          title="Daily Donation"
          value="£ 100"
          description="+30% From Last Month"
          src="url('/assets/images/card1-one.png')"
          textColor="white"
        />
        <CardOne
          title="Weekly Donation"
          value="£ 1000"
          description="+30% From Last Month"
          src="url('/assets/images/card1-two.png')"
          textColor="black"
        />
        <CardOne
          title="Monthly Donation"
          value="£ 10,000"
          description="+30% From Last Month"
          src="url('/assets/images/card1-three.png')"
          textColor="white"
        />
      </div>

      <div className="flex flex-col md:flex-row py-6 space-y-6 md:space-y-0 md:space-x-6">
        <div className="p-4 md:p-6 rounded-lg w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 m-[-15px]">
            <CardTwo
              title="Total Donation"
              value="£ 1,50,000"
              description="+30% From Last Month"
            />
            <CardTwo
              title="Total Donors"
              value="600"
              description="+30 New Donors"
            />
            <CardTwo
              title="Active Campaign"
              value="6"
              description="+3 New Campaign"
            />
          </div>
          <TransactionData />
        </div>

        <DonorTable />
      </div>
    </div>
  );
};

export default DashboardDetails;
