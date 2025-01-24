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

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: handleLogin
    })
};
