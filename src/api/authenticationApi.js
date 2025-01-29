import { useMutation } from '@tanstack/react-query';
import createAxiosInstance from './axiosInstance';
import axios from 'axios';


const handleLogin = async (data) => {
    const axiosInstance = createAxiosInstance();
    
    const res = await axiosInstance.post("dashboard/login",data);
    
    return res.data;
};

const handleForgotPassword = async (data) => {
    const axiosInstance = createAxiosInstance();
    
    try {
        // Sending data as search parameters
        const res = await axiosInstance.get("dashboard/forget-password", {
            params: data,
        });
        
        return res.data;
    } catch (error) {
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
        
        return res.data;
    } catch (error) {
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