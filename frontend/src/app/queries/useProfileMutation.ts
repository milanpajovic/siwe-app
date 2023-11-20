import { useMutation } from '@tanstack/react-query';
import { PROFILE_UPDATE_API } from '../consts/api.consts';
import axiosInstance from '../config/axios';
import { ProfileObject } from './UseProfileQuery';

const fetch = async (data: ProfileObject): Promise<ProfileObject> => {
  return (await axiosInstance({ ...PROFILE_UPDATE_API, data })).data;
};

export const useProfileMutation = () => {
  return useMutation({
    mutationFn: fetch,
  });
};
