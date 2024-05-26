import { SettingStatus } from '@types-index';
import API from './API';

export type LoginResponse = {
  email: string;
  accessToken: string;
  refreshToken: string;
  settingStatus: SettingStatus;
};

export type LoginRequest = {
  email: string;
  password: string;
  deviceId: string;
  pushKey: string | null;
};

export const login = async (loginInfo: LoginRequest) => {
  const res = await API.post<LoginResponse>('/auth/login', loginInfo);
  return res;
};

export type SendEmailResponse = {
  authKey: string;
};

const sendEmail = async (email: string) => {
  const res = await API.post<SendEmailResponse>('/mail/authUrl', { email });
  return res.data;
};

export const authApis = {
  login,
  sendEmail,
};
