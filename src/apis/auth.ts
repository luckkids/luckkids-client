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
  termUserAgreement: 'AGREE' | 'DISAGREE';
  personalInfoAgreement: 'AGREE' | 'DISAGREE';
  marketingAgreement: 'AGREE' | 'DISAGREE';
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

// 비밀번호 재설정
export type ResetPasswordRequest = {
  email: string;
  password: string;
};

export type ResetPasswordResponse = {
  email: string;
};

const resetPassword = async (request: ResetPasswordRequest) => {
  const res = await API.patch<ResetPasswordResponse>('/user/password', request);
  return res.data;
};

// 이메일 존재하는지 확인 (존재 X --> error)
export type FindEmailRequest = {
  email: string;
};

export type FindEmailResponse = {
  snsType: SocialType;
};

const findEmail = async (request: FindEmailRequest) => {
  const res = await API.post<FindEmailResponse>('/user/findEmail', request);
  return res.data;
};

type DeleteUserResponse = {
  id: number;
};

const deleteUser = async () => {
  const res = await API.delete<DeleteUserResponse>(`/user/withdraw`);
  return res.data;
};

type RegisterWithdrawReasonResponse = {
  id: number;
};

const registerWithdrawReason = async (reason: string) => {
  const res = await API.post<RegisterWithdrawReasonResponse>(
    '/withdraw/reason',
    {
      reason,
    },
  );
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
  resetPassword,
  findEmail,
  deleteUser,
  registerWithdrawReason,
};
