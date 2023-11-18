/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { PROFILE_API } from '../consts/api.consts';
import axiosInstance from '../config/axios';

// TODO Change type
const fetch = async (): Promise<any> => {
  return (await axiosInstance({ ...PROFILE_API })).data;
};

export const useProfileQuery = () => {
  return useQuery({ queryKey: ['profile'], queryFn: () => fetch() });
};
