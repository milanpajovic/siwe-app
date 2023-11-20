import { useQuery } from '@tanstack/react-query';
import { PROFILE_API } from '../consts/api.consts';
import axiosInstance from '../config/axios';

interface Location {
  address: string;
  postalCode: string;
  city: string;
}

interface ProfileInterface {
  location: Location;
  email: string;
  contactPhone: string;
}

export interface ProfileObject {
  name: string;
  profile: ProfileInterface;
}

const fetch = async (): Promise<ProfileObject> => {
  return (await axiosInstance({ ...PROFILE_API })).data;
};

export const useProfileQuery = () => {
  return useQuery({ queryKey: ['profile'], queryFn: () => fetch() });
};
