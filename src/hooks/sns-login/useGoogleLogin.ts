import { useCallback, useEffect, useState } from 'react';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';

// Google 토큰 유효성 검사 함수
export const checkGoogleTokenValidity = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const tokens = await GoogleSignin.getTokens();
      console.log('AccessToken is still valid:', tokens.accessToken);
      return tokens.accessToken;
    } else {
      console.log('User is not signed in, re-login required.');
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      return tokens.accessToken;
    }
  } catch (error) {
    console.error('Error checking Google token validity:', error);
    // 재로그인 시도
    const userInfo = await GoogleSignin.signInSilently();
    const tokens = await GoogleSignin.getTokens();
    return tokens ? tokens.accessToken : null;
  }
};

export function useGoogleLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = useCallback(async () => {
    try {
      console.log('Starting Google login process');
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('Has Play Services:', hasPlayServices);

      const userInfo = await GoogleSignin.signIn();
      console.log('User info:', userInfo);

      const tokens = await GoogleSignin.getTokens();

      return tokens.accessToken;
    } catch (error) {
      console.error('Google login error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, []);

  const handleGoogleLogout = useCallback(async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (err) {
      console.error(error);
    }
  }, []);

  return {
    handleGoogleLogin,
    handleGoogleLogout,
  };
}
