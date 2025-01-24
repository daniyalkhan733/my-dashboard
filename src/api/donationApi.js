import { useQuery } from '@tanstack/react-query';
import createAxiosInstance from './axiosInstance';



const fetchDashboardData = async () => {
    const axiosInstance = createAxiosInstance();
    const { data } = await axiosInstance.get("dashboard/dashboard-data");
    return data;
};

const fetchTopDonor = async () => {
  const axiosInstance = createAxiosInstance();
  const { data } = await axiosInstance.get("dashboard/top-donors");
  return data;
};

const fetchDonationData = async () => {
  const axiosInstance = createAxiosInstance();
  const { data } = await axiosInstance.get("dashboard/donation-data");
  return data;
};

const useDonationData = () => {
  return useQuery({
    queryKey: ['donationData'],
    queryFn: fetchDonationData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
};

const useProgramData = () => {
    return useQuery({
      queryKey: ['programData'],
      queryFn: fetchProgramData,
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

export  {useDashboardData,useProgramData ,useTopDonor ,useDonationData};
