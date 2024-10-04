import { useQuery } from '@tanstack/react-query';
import getMissionQueryKey from './getMissionQueryKey';
import { GetMissionOutcomeCountResponse, missionApis } from '@apis/mission';

export const useMissionOutcomeCount = () => {
  return useQuery<GetMissionOutcomeCountResponse>(
    getMissionQueryKey('MISSION_OUTCOME_COUNT'),
    async () => {
      const res = await missionApis.getMissionOutcomeCount();
      return res.data;
    },
    {
      select: (response) => response,
    },
  );
};
