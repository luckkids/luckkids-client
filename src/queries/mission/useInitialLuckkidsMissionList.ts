import { useQuery } from '@tanstack/react-query';
import getMissionQueryKey from './getMissionQueryKey';
import { GetInitialLuckkidsMissionsResponse, userApis } from '@apis/user';

export const useInitialLuckkidsMissionList = () => {
  return useQuery<GetInitialLuckkidsMissionsResponse>(
    getMissionQueryKey('INITIAL_LUCKKIDS_MISSION_LIST'),
    async () => {
      const res = await userApis.getInitialLuckkidsMissions();
      return res.data;
    },
    {
      select: (response) => response,
    },
  );
};
