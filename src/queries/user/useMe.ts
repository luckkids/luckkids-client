import { useQuery } from '@tanstack/react-query';
import getUserQueryKey from './getUserQueryKey';
import { userApis } from '@apis/user';

export const useMe = () => {
  return useQuery(
    getUserQueryKey('ME'),
    async () => {
      const res = await userApis.getMe();
      return res;
    },
    {
      select: (response) => response,
    },
  );
};
