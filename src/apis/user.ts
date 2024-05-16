import { SettingStatus, SocialType } from '@types-index';
import API from './API';

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

export const userApis = {
  getMe,
};
