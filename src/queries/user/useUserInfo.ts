import { useQuery } from '@tanstack/react-query';
import getUserQueryKey from './getUserQueryKey';
import { GetUserResponse, userApis } from '@apis/user';

export const useUserInfo = (userId: number) => {
  return useQuery<GetUserResponse>(
    getUserQueryKey('USER_INFO', { userId }),
    async () => {
      const res = await userApis.getUserInfo(userId);
      return res.data;
    },
    {
      select: (response) => response,
      enabled: !!userId,
    },
  );
};
