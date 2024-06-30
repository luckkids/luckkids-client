import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  LoginRequest,
  LoginResponse,
  OauthLoginRequest,
  OauthLoginResponse,
  authApis,
} from '@apis/auth';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import { RecoilToken } from '@recoil/recoil.token';

const useAuth = () => {
  const {
    storedValue: accessToken,
    setValue: setAccessToken,
    removeValue: removeAccessToken,
  } = useAsyncStorage<StorageKeys.AccessToken>(StorageKeys.AccessToken);
  const [token, setToken] = useRecoilState(RecoilToken);

  const login = async (
    loginInfo: LoginRequest,
  ): Promise<LoginResponse | null> => {
    return await authApis
      .login({
        ...loginInfo,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        setAccessToken({ accessToken, refreshToken });
        setToken({ accessToken, refreshToken });
        return res.data;
      })
      .catch((error) => {
        console.error('Login Error', error);
        return null;
      });
  };

  const oauthLogin = async (
    loginInfo: OauthLoginRequest,
  ): Promise<OauthLoginResponse | null> => {
    return await authApis
      .oauthLogin({
        ...loginInfo,
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        setAccessToken({ accessToken, refreshToken });
        setToken({ accessToken, refreshToken });
        return res.data;
      })
      .catch((error) => {
        console.error('Oauth Login Error', error);
        return null;
      });
  };

  const logout = async () => {
    try {
      await removeAccessToken();
      setToken({
        accessToken: '',
        refreshToken: '',
      });
    } catch (error) {
      console.error('Logout Error', error);
    }
  };

  const refreshTokens = async (loginInfo: LoginRequest) => {
    try {
      const { refreshToken } = accessToken || {};
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      const res = await authApis.refreshToken({
        ...loginInfo,
        refreshToken,
      });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        res;
      setAccessToken({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
      setToken({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error('Token Refresh Error', error);
      logout();
    }
  };

  const isLoggedIn = () => {
    return !!accessToken?.accessToken;
  };

  useEffect(() => {
    // Any side effects related to authentication can be handled here
  }, [accessToken]);

  return {
    login,
    oauthLogin,
    logout,
    accessToken: accessToken?.accessToken,
    refreshToken: accessToken?.refreshToken,
    refreshTokens,
    isLoggedIn,
  };
};

export default useAuth;
