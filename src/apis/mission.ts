import { Mission } from '@types-index';
import API from './API';
import { IMissionData, IMissionDataItem } from '@types-common/page.types';

export type GetMissionsResponse = {
  userMissions: IMissionData;
  luckkidsMissions: IMissionData;
};

const getMissions = async () => {
  const res = await API.get<GetMissionsResponse>(`/missions`);
  return res;
};

export type EditMissionRequest = Partial<{
  missionType: string;
  missionDescription: string;
  missionActive: 'TRUE' | 'FALSE';
  alertStatus: 'CHECKED' | 'UNCHECKED';
  alertTime: string;
}>;

export type EditMissionResponse = EditMissionRequest & {
  id: number;
  luckkidsMissionId: number;
};

const editMission = async ({
  missionId,
  data,
}: {
  missionId: number;
  data: EditMissionRequest;
}) => {
  const res = await API.patch<EditMissionResponse>(`/missions/${missionId}`, {
    data,
  });
  return res;
};

export type CreateMissionRequest = {
  luckkidsMissionId: number | null; // 개인 미션일때는 null
} & Omit<EditMissionRequest, 'missionActive'>;

export type CreateMissionResponse = {
  id: number;
} & CreateMissionRequest;

const createMission = async (data: CreateMissionRequest) => {
  const res = await API.post<CreateMissionResponse>(`/missions/new`, data);
  return res;
};

export const missionApis = {
  getMissions,
  editMission,
  createMission,
};
