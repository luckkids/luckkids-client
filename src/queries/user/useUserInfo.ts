import { useQuery } from '@tanstack/react-query';
import getUserQueryKey from './getUserQueryKey';
import { GetUserResponse, userApis } from '@apis/user';

export const useUserInfo = (userId: number) => {
  return useQuery<GetUserResponse | null>(
    getUserQueryKey('USER_INFO', { userId }),
    async () => {
      const res = await userApis.getUserInfo(userId);
      return res;
    },
    {
      select: (response) => response,
      enabled: !!userId,
    },
  );
};
