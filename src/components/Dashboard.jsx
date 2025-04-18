import React from 'react';
import { useDashboardData, useDonationData, useProgramData , useTopDonor} from '../api/donationApi';
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
    data: topDonor,
    isLoading: isDonorLoading,
    isError: isDonorError,
    error: donorError,
  } = useTopDonor();

  const {
    data: donationData,
    isLoading: isDonationLoading,
    isError: isDonationError,
    error: donationError,
  } = useDonationData();

  

  const isLoading = isDashboardLoading || isDonorLoading ;
  const isError = isDashboardError || isDonorError ;

  const cardOneData = [
    {
      title: 'Daily Donation',
      value: `£ ${dashboardData?.today || '0'}`,
      description: `${dashboardData?.dailyGrowth || '+20'}% From Yesterday`,
      src: "url('/assets/images/card1-one.png')",
      textColor: 'white',
    },
    {
      title: 'Weekly Donation',
      value: `£ ${dashboardData?.weekly || '0'}`,
      description: `${dashboardData?.weeklyGrowth || '+10'}% From Last Month`,
      src: "url('/assets/images/card1-two.png')",
      textColor: 'black',
    },
    {
      title: 'Monthly Donation',
      value: `£ ${dashboardData?.monthly || '0'}`,
      description: `${dashboardData?.monthlyGrowth || '+30'}% From Last Month`,
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
        <div className="p-2 rounded-lg w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
            <CardTwo
              title="Total Donation"
              value={`£ ${dashboardData?.total_donations || '0'}`}
              description={`+  £ ${dashboardData?.new_donation || '+0'} From Last Month`}
            />
            <CardTwo
              title="Total Donors"
              value={dashboardData?.total_donors || '0'}
              description={`+${dashboardData?.new_donor || '0'} New Donors`}
            />
            <CardTwo
              title="Active Campaign"
              value={dashboardData?.total_programs || '0'}
              description={`+${dashboardData?.new_program || '0'} New Campaign`}
            />
          </div>
          <TransactionData transactions={donationData || []} />
        </div>

        {/* Donor Table */}
        <DonorTable donors={topDonor || []} />
      </div>
    </div>
  );
};

export default DashboardDetails;
