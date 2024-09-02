import { useState, useEffect, useCallback } from 'react';
import {
  appleAuth,
  AppleCredentialState,
} from '@invertase/react-native-apple-authentication';

export function useAppleLogin() {
  const [credentialState, setCredentialState] = useState<
    AppleCredentialState | 'N/A'
  >('N/A');
  const [user, setUser] = useState<string | null>(null);

  const fetchAndUpdateCredentialState = useCallback(async () => {
    if (user === null) {
      setCredentialState('N/A');
    } else {
      const newCredentialState =
        await appleAuth.getCredentialStateForUser(user);
      setCredentialState(
        newCredentialState === appleAuth.State.AUTHORIZED
          ? appleAuth.State.AUTHORIZED
          : newCredentialState,
      );
    }
  }, [user]);

  const handleAppleLogin = useCallback(async () => {
    console.warn('Beginning Apple Authentication');

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {
        user: newUser,
        identityToken,
        nonce,
        realUserStatus,
        authorizationCode,
      } = appleAuthRequestResponse;

      setUser(newUser); // Update the user state

      await fetchAndUpdateCredentialState();

      if (identityToken) {
        console.log(nonce, identityToken);
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${newUser}`);

      return identityToken;
    } catch (error) {
      console.error(error);
    }
  }, [fetchAndUpdateCredentialState]);

  useEffect(() => {
    if (!appleAuth.isSupported) return;

    fetchAndUpdateCredentialState();

    return appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');
      await fetchAndUpdateCredentialState();
    });
  }, [fetchAndUpdateCredentialState]);

  const handleAppleLogout = useCallback(() => {
    setUser(null);
    setCredentialState('N/A');
    console.warn('Apple Logout Completed');
  }, []);

  return {
    credentialState,
    handleAppleLogin,
    handleAppleLogout,
  };
}
