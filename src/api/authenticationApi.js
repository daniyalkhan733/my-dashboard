import { useMutation } from '@tanstack/react-query';
import createAxiosInstance from './axiosInstance';
import axios from 'axios';


const handleLogin = async (data) => {
    const axiosInstance = createAxiosInstance();
    console.log(data,"djlsnc");
    
    const res = await axiosInstance.post("dashboard/login",data);
    console.log(res,"ilusbvlibufviludfbvliduhbliu");
    
    console.log("this is eugjb", data);
    return res.data;
};

const handleForgotPassword = async (data) => {
    const axiosInstance = createAxiosInstance();
    
    try {
        // Sending data as search parameters
        const res = await axiosInstance.get("dashboard/forget-password", {
            params: data,
        });
        
        console.log("Response:", res);
        return res.data;
    } catch (error) {
        console.error("Error in forgot password request:", error);
        throw error; // Rethrow the error for further handling
    }
};

const handleResetPassword = async (data) => {
    const axiosInstance = createAxiosInstance();
    
    try {
        // Sending data as search parameters
        const res = await axiosInstance.get("dashboard/reset-password", {
            params: data,
        });
        
        console.log("Response:", res);
        return res.data;
    } catch (error) {
        console.error("Error in forgot password request:", error);
        throw error; // Rethrow the error for further handling
    }
};

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: handleLogin
    })
};

export const useForgotPasswordMutation = () => {
    return useMutation({    
        mutationFn: handleForgotPassword
    })
};



export const useResetPasswordMutation = () => {
    return useMutation({    
        mutationFn: handleResetPassword
    })
};