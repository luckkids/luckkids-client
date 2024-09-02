import { useCallback, useEffect, useState } from 'react';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';

export function useGoogleLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '564720223619-9hvi10q37ad5a68gcco8mdcbo3l4dbs1.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      console.log('Starting Google login process');
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      console.log('Has Play Services:', hasPlayServices);

      const userInfo = await GoogleSignin.signIn();
      console.log('User info:', userInfo);

      setUser(userInfo);
      setError(null);

      return userInfo.idToken;
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
