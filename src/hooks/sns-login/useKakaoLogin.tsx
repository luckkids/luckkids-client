import { useCallback } from 'react';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

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
