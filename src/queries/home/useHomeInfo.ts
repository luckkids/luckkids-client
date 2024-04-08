import { useQuery } from '@tanstack/react-query';
import getHomeQueryKey from './getHomeQueryKey';
import { homeApis } from '@apis/home';

export const useHomeInfo = () => {
  return useQuery(
    getHomeQueryKey('HOME_INFO'),
    async () => {
      const res = await homeApis.getHomeInfo();

      return res;
    },
    {
      refetchOnMount: 'always',
      select: (response) => response,
    },
  );
};
