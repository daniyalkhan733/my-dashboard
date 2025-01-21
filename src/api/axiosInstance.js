import axios from 'axios';

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

export default createAxiosInstance;
