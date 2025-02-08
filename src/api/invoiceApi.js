import { useQuery } from "@tanstack/react-query";
import createAxiosInstance from "./axiosInstance";

const fetchInvoiceData = async () => {
    const axiosInstance = createAxiosInstance();
    const { data } = await axiosInstance.get("dashboard/get-invoice");

    return data;
};


export const useInvoiceData = () => {
    return useQuery({
      queryKey: ['invoice'],
      queryFn: fetchInvoiceData,
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    });
  };