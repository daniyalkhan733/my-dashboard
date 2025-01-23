import { useQuery } from '@tanstack/react-query';
import createAxiosInstance from './axiosInstance';



const fetchDashboardData = async () => {
    const axiosInstance = createAxiosInstance();
    const { data } = await axiosInstance.get("dashboard/dashboard-data");
    console.log("this is eugjb",data);
    return data;
};

const fetchTopDonor = async () => {
  const axiosInstance = createAxiosInstance();
  const { data } = await axiosInstance.get("dashboard/top-donors");
  console.log("this is top donor",data);
  return data;
};

const fetchDonationData = async () => {
  const axiosInstance = createAxiosInstance();
  const { data } = await axiosInstance.get("dashboard/donation-data");
  console.log("this is donation data",data);
  return data;
};

// const fetchLogin = async () => {
//   const axiosInstance = createAxiosInstance();
//   const { data } = await axiosInstance.post("dashboard/login");
//   return data;
// };
const useDonationData = () => {
  return useQuery({
    queryKey: ['donationData'],
    queryFn: fetchDonationData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

const useTopDonor = () => {
    return useQuery({
      queryKey: ['topDonorData'],
      queryFn: fetchTopDonor,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    });
  };

const useDashboardData = () => {
    return useQuery({
        queryKey: ['dashboardData'],
        queryFn: fetchDashboardData,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
        refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    });
};

export  {useDashboardData,useTopDonor ,useDonationData };
