import { Mission } from '@types-index';
import API from './API';
import {
  IMissionData,
  IMissionDataItem,
  IMissionListData,
} from '@types-common/page.types';
import { CharacterType } from '@types-common/character.types';

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

export type EditMissionResponse = {
  id: number;
  luckkidsMissionId: number;
  missionType: string;
  missionDescription: string;
  missionActive: 'TRUE' | 'FALSE';
  alertStatus: 'CHECKED' | 'UNCHECKED';
  alertTime: string;
};

const editMission = async ({
  missionId,
  data,
}: {
  missionId: number;
  data: EditMissionRequest;
}) => {
  const res = await API.patch<EditMissionResponse>(
    `/missions/${missionId}`,
    data,
  );
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

export type GetMissionOutcomesResponse = IMissionListData[];

const getMissionOutcomes = async () => {
  const res = await API.get<GetMissionOutcomesResponse>(`/missionOutcomes`);
  return res;
};

export type PatchMissionOutcomeRequest = {
  missionStatus: 'SUCCEED' | 'FAILED';
};

export type PatchMissionOutcomeResponse = {
  levelUpResult: boolean;
  characterType: CharacterType;
  level: number;
};

const patchMissionOutcome = async (
  missionId: number,
  data: PatchMissionOutcomeRequest,
) => {
  const res = await API.patch<PatchMissionOutcomeResponse>(
    `/missionOutcomes/${missionId}`,
    data,
  );
  return res;
};

export type GetMissionOutcomeCountResponse = {
  count: number;
};

const getMissionOutcomeCount = async () => {
  const res = await API.get<GetMissionOutcomeCountResponse>(
    `/missionOutcomes/count`,
  );
  return res;
};

const deleteMission = async (missionId: number) => {
  const res = await API.delete(`/missions/${missionId}`);
  return res;
};

export const missionApis = {
  getMissions,
  editMission,
  createMission,
  getMissionOutcomes,
  patchMissionOutcome,
  getMissionOutcomeCount,
  deleteMission,
};
