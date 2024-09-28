import API from './API';
import { IMissionData } from '@types-common/page.types';

export type GetMissionsResponse = {
  userMissions: IMissionData;
  luckkidsMissions: IMissionData;
};

const getMissions = async () => {
  const res = await API.get<GetMissionsResponse>(`/missions`);
  return res;
};

export const missionApis = {
  getMissions,
};
