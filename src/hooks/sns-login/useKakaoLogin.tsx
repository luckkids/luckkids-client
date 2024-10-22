import { useCallback } from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

export const checkKakaoTokenValidity = async () => {
  try {
    const tokenInfo = await KakaoLogin.getAccessToken();
    if (tokenInfo) {
      console.log('AccessToken is still valid:', tokenInfo.accessToken);
      return tokenInfo.accessToken;
    } else {
      console.log('Token is expired, re-login required.');
      // Kakao 재로그인 시도
      const result = await KakaoLogin.loginWithKakaoAccount();
      return result.accessToken;
    }
  } catch (error) {
    console.error('Error checking token validity:', error);
    // 재로그인 시도
    const result = await KakaoLogin.loginWithKakaoAccount();
    return result ? result.accessToken : null;
  }
};

export function useKakaoLogin() {
  const handleKakaoLogin = useCallback(async () => {
    try {
      // Kakao 로그인 시도
      const result = await KakaoLogin.loginWithKakaoAccount();
      const { accessToken } = result;
      console.log('Kakao Login Success:', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Login Failed:', error);
    }
  }, []);

  const handleKakaoLogout = useCallback(async () => {
    try {
      // 로그아웃 실행
      await KakaoLogin.logout();
      console.log('Kakao Logout Success');
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  }, []);

  return {
    handleKakaoLogin,
    handleKakaoLogout,
  };
}
