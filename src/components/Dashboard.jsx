import React from 'react';
import { useDashboardData, useDonorData, useProgramData } from '../api/donationApi';
import CardOne from './dashboard/CardOne';
import CardTwo from './dashboard/CardTwo';
import DonorTable from './dashboard/DonorTable';
import TransactionData from './dashboard/TransactionData';

const DashboardDetails = () => {
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    error: dashboardError,
  } = useDashboardData();

  const {
    data: donorData,
    isLoading: isDonorLoading,
    isError: isDonorError,
    error: donorError,
  } = useDonorData();

  const {
    data: programData,
    isLoading: isProgramLoading,
    isError: isProgramError,
    error: programError,
  } = useProgramData();

  console.log(dashboardData);
  

  const isLoading = isDashboardLoading || isDonorLoading || isProgramLoading;
  const isError = isDashboardError || isDonorError || isProgramError;

  const cardOneData = [
    {
      title: 'Daily Donation',
      value: `£ ${dashboardData?.todays_donations || '0'}`,
      description: `${dashboardData?.dailyGrowth || '+0'}% From Last Month`,
      src: "url('/assets/images/card1-one.png')",
      textColor: 'white',
    },
    {
      title: 'Weekly Donation',
      value: `£ ${dashboardData?.weekly_donations || '0'}`,
      description: `${dashboardData?.weeklyGrowth || '+0'}% From Last Month`,
      src: "url('/assets/images/card1-two.png')",
      textColor: 'black',
    },
    {
      title: 'Monthly Donation',
      value: `£ ${dashboardData?.monthly_donations || '0'}`,
      description: `${dashboardData?.monthlyGrowth || '+0'}% From Last Month`,
      src: "url('/assets/images/card1-three.png')",
      textColor: 'white',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className=" h-52 w-full bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))}
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      dashboardError?.message || donorError?.message || programError?.message || 'Something went wrong!';
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Error: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {/* CardOne Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {cardOneData.map((card, index) => (
          <CardOne
            key={index}
            title={card.title}
            value={card.value}
            description={card.description}
            src={card.src}
            textColor={card.textColor}
          />
        ))}
      </div>

      {/* CardTwo and Data Section */}
      <div className="flex flex-col md:flex-row py-6 space-y-6 md:space-y-0 md:space-x-6">
        <div className="p-4 md:p-6 rounded-lg w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 m-[-15px]">
            <CardTwo
              title="Total Donation"
              value={`£ ${dashboardData?.total_donations || '0'}`}
              description={`+ £${dashboardData?.count_last_donation_data || '+0'} From Last Month`}
            />
            <CardTwo
              title="Total Donors"
              value={donorData?.total_donors || '0'}
              description={`+${dashboardData?.count_last_donor_data || '0'} New Donors`}
            />
            <CardTwo
              title="Active Campaign"
              value={programData?.total_programs || '0'}
              description={`+${dashboardData?.count_last_program_data || '0'} New Campaign`}
            />
          </div>
          <TransactionData transactions={dashboardData?.donation_detail || []} />
        </div>

        {/* Donor Table */}
        <DonorTable donors={donorData?.donors_dist?.data || []} />
      </div>
    </div>
  );
};

export default DashboardDetails;
