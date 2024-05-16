import { useQuery } from '@tanstack/react-query';
import getHomeQueryKey from './getHomeQueryKey';
import { GetHomeInfoResponse, homeApis } from '@apis/home';

export const useHomeInfo = () => {
  return useQuery<GetHomeInfoResponse>(
    getHomeQueryKey('HOME_INFO'),
    async () => {
      const res = await homeApis.getHomeInfo();
      return res.data;
    },
    {
      refetchOnMount: 'always',
      select: (response) => response,
    },
  );
};
