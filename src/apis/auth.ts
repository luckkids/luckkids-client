import { SettingStatus, SocialType } from '@types-index';
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

export type RefreshTokenRequest = {
  email: string;
  deviceId: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

const refreshToken = async (refreshTokenInfo: RefreshTokenRequest) => {
  const res = await API.post<RefreshTokenResponse>(
    '/auth/refresh',
    refreshTokenInfo,
  );
  return res.data;
};

export type OauthLoginRequest = {
  snsType: SocialType;
  deviceId: string;
  pushKey: string | null;
  token: string;
};

export type OauthLoginResponse = {
  accessToken: string;
  refreshToken: string;
  email: string;
  settingStatus: SettingStatus;
};

const oauthLogin = async (request: OauthLoginRequest) => {
  const res = await API.post<OauthLoginResponse>('/auth/oauth/login', request);
  return res;
};

export type ConfirmEmailRequest = {
  email: string;
  authKey: string;
};

export type ConfirmEmailResponse = {
  email: string;
};

const confirmEmail = async (request: ConfirmEmailRequest) => {
  const res = await API.post<ConfirmEmailResponse>(
    '/confirmEmail/check',
    request,
  );
  return res.data;
};

export type SignUpRequest = {
  email: string;
  password: string;
};

const signUp = async (request: SignUpRequest) => {
  const res = await API.post<ConfirmEmailResponse>('/join/user', request);
  return res.data;
};

const checkEmail = async (email: string) => {
  const res = await API.post('/join/checkEmail', {
    email,
  });
  return res.data;
};

export const authApis = {
  login,
  sendEmail,
  refreshToken,
  oauthLogin,
  confirmEmail,
  signUp,
  checkEmail,
};
