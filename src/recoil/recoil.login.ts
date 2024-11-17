import { atom } from 'recoil';
import { LoginRequest, OauthLoginRequest } from '@apis/auth';

// 설정에서 자동 로그인, 비밀번호 변경을 위한 용도의 로그인 정보
export const RecoilLoginInfo = atom<Pick<LoginRequest, 'email' | 'password'>>({
  key: 'recoil-login-info',
  default: {
    email: '',
    password: '',
  },
});

// 설정에서 자동 로그인, 비밀번호 변경을 위한 용도의 로그인 정보
export const RecoilOauthLoginInfo = atom<
  Pick<OauthLoginRequest, 'snsType' | 'token'>
>({
  key: 'recoil-oauth-login-info',
  default: {
    snsType: 'NORMAL',
    token: '',
  },
});
