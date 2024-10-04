import { useQuery } from '@tanstack/react-query';
import getMissionQueryKey from './getMissionQueryKey';
import { GetMissionsResponse, missionApis } from '@apis/mission';

export const useMissionList = () => {
  return useQuery<GetMissionsResponse>(
    getMissionQueryKey('MISSION_LIST'),
    async () => {
      const res = await missionApis.getMissions();
      return res.data;
    },
    {
      select: (response) => response,
    },
  );
};
