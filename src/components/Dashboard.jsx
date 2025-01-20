import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import CardOne from "./dashboard/CardOne";
import CardTwo from "./dashboard/CardTwo";
import DonorTable from "./dashboard/DonorTable";
import TransactionData from "./dashboard/TransactionData";

// Create axios instance
const createAxiosInstance = () => {
  const apiUrl = import.meta.env.VITE_ICHARMS_URL;
  const apiToken = import.meta.env.VITE_ICHARMS_API_KEY;
  
  return axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
  });
};

// API function to fetch dashboard data
const fetchDashboardData = async () => {
  const axiosInstance = createAxiosInstance();
  const { data } = await axiosInstance.get("dashboard/dashboard-data");
  console.log(data);
  return data;
};

const DashboardDetails = () => {
  // Use React Query to fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Error loading dashboard data: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <CardOne
          title="Daily Donation"
          value={`£ ${data.totalDonations || '0'}`}
          description={`${data.dailyGrowth || '+0'}% From Last Month`}
          src="url('/assets/images/card1-one.png')"
          textColor="white"
        />
        <CardOne
          title="Weekly Donation"
          value={`£ ${data.weeklyDonation || '0'}`}
          description={`${data.weeklyGrowth || '+0'}% From Last Month`}
          src="url('/assets/images/card1-two.png')"
          textColor="black"
        />
        <CardOne
          title="Monthly Donation"
          value={`£ ${data.monthlyDonation || '0'}`}
          description={`${data.monthlyGrowth || '+0'}% From Last Month`}
          src="url('/assets/images/card1-three.png')"
          textColor="white"
        />
      </div>

      <div className="flex flex-col md:flex-row py-6 space-y-6 md:space-y-0 md:space-x-6">
        <div className="p-4 md:p-6 rounded-lg w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 m-[-15px]">
            <CardTwo
              title="Total Donation"
              value={`£ ${data.totalDonation || '0'}`}
              description={`${data.totalGrowth || '+0'}% From Last Month`}
            />
            <CardTwo
              title="Total Donors"
              value={data.totalDonors || '0'}
              description={`+${data.newDonors || '0'} New Donors`}
            />
            <CardTwo
              title="Active Campaign"
              value={data.activeCampaigns || '0'}
              description={`+${data.newCampaigns || '0'} New Campaign`}
            />
          </div>
          <TransactionData transactions={data.transactions} />
        </div>

        <DonorTable donors={data.donors} />
      </div>
    </div>
  );
};

export default DashboardDetails;