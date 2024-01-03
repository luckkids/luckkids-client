import { useCallback, useEffect, useState } from 'react';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';

export function useGoogleLogin() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '564720223619-f0m9hug3t821piktg2an5rba8e3g0kqh.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(userInfo);
      setError(null);
    } catch (error) {
      console.error(error);
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
