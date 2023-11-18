/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import qs from 'qs';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params: Record<string, any>) => {
      return qs.stringify(params);
    },
  },
});

// If needed in the future
export const addAccessTokenInterceptor = (token: string) => {
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
};

export default axiosInstance;
