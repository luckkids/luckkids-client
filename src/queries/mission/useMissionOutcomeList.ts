import { useQuery } from '@tanstack/react-query';
import getMissionQueryKey from './getMissionQueryKey';
import { GetMissionOutcomesResponse, missionApis } from '@apis/mission';

export const useMissionOutcomeList = () => {
  return useQuery<GetMissionOutcomesResponse>(
    getMissionQueryKey('MISSION_OUTCOME_LIST'),
    async () => {
      const res = await missionApis.getMissionOutcomes();
      return res.data;
    },
    {
      select: (response) => response,
      refetchOnMount: 'always',
    },
  );
};
