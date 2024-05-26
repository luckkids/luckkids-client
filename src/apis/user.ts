import { InitialSetting, SettingStatus, SocialType } from '@types-index';
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
  imageFile: string;
};

const getInitialCharacter = async () => {
  const res = await API.get<GetInitialCharacterResponse>(
    '/initialSetting/character',
  );
  return res.data;
};

const setInitialSetting = async (initialSetting: InitialSetting) => {
  const res = await API.post('/initialSetting', initialSetting);
  return res;
};

export const userApis = {
  getInitialCharacter,
  getMe,
  setInitialSetting,
};
