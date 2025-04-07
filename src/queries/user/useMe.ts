import { useQuery } from '@tanstack/react-query';
import getUserQueryKey from './getUserQueryKey';
import { GetMeResponse, userApis } from '@apis/user';

export const useMe = () => {
  return useQuery<GetMeResponse>(
    getUserQueryKey('ME'),
    async () => {
      const res = await userApis.getMe();
      return res.data;
    },
    {
      select: (response) => response,
      refetchOnMount: true,
    },
  );
};
