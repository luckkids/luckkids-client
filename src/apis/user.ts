import {
  InitialSetting,
  MissionType,
  SettingStatus,
  SocialType,
} from '@types-index';
import API from './API';
import { CharacterType } from '@types-common/character.types';

export type GetMeResponse = {
  email: string;
  luckPhrase: string | null;
  missionCount: number;
  nickname: string;
  role: 'USER' | 'ADMIN';
  settingStatus: SettingStatus;
  snsType: SocialType;
};

export const getMe = async () => {
  const res = await API.get<GetMeResponse>('/user/me');
  return res;
};

export type GetInitialCharacterResponse = {
  id: number;
  characterType: CharacterType;
  level: number;
  lottieFile: string;
};

const getInitialCharacter = async () => {
  const res = await API.get<GetInitialCharacterResponse>(
    '/initialSetting/character',
  );
  return res.data;
};

export type GetInitialLuckkidsMissionsResponse = {
  id: number;
  missionType: MissionType;
  missionDescription: string;
  alertTime: string;
}[];

const getInitialLuckkidsMissions = async () => {
  const res = await API.get<GetInitialLuckkidsMissionsResponse>(
    '/initialSetting/luckMission',
  );
  return res;
};

const setInitialSetting = async (initialSetting: InitialSetting) => {
  const res = await API.post('/initialSetting', initialSetting);
  return res;
};

export type GetUserResponse = GetMeResponse & {
  inProgressCharacter: {
    characterType: CharacterType;
    level: number;
  };
};

const getUserInfo = async (id: number) => {
  try {
    const res = await API.get<GetUserResponse>(`/user/${id}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const userApis = {
  getInitialCharacter,
  getMe,
  setInitialSetting,
  getUserInfo,
  getInitialLuckkidsMissions,
};
