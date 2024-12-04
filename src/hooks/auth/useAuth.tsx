import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  LoginRequest,
  LoginResponse,
  OauthLoginRequest,
  OauthLoginResponse,
  SocialTypeValues,
  authApis,
} from '@apis/auth';
import LoginRemember from '@components/page/login/remember';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { checkGoogleTokenValidity } from '@hooks/sns-login/useGoogleLogin';
import { checkKakaoTokenValidity } from '@hooks/sns-login/useKakaoLogin';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import Logger from '@libs/LoggerService';
import { RecoilLoginInfo, RecoilOauthLoginInfo } from '@recoil/recoil.login';
import { RecoilToken } from '@recoil/recoil.token';

const useAuth = () => {
  const {
    storedValue: accessToken,
    setValue: setAccessToken,
    removeValue: removeAccessToken,
  } = useAsyncStorage<StorageKeys.AccessToken>(StorageKeys.AccessToken);
  const [token, setToken] = useRecoilState(RecoilToken);
  const setLoginInfo = useSetRecoilState(RecoilLoginInfo);
  const setOauthLoginInfo = useSetRecoilState(RecoilOauthLoginInfo);
  const { setValue: setRememberMe, getCurrentValue: getCurrentRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const login = async (
    loginInfo: LoginRequest,
  ): Promise<LoginResponse | null> => {
    try {
      Logger.setUserContext({ id: loginInfo.email });

      const res = await authApis.login({
        ...loginInfo,
      });

      const { accessToken, refreshToken } = res.data;

      // token 저장
      setAccessToken({ accessToken, refreshToken });
      setToken({ accessToken, refreshToken });

      // login 정보 저장
      setLoginInfo({
        email: loginInfo.email,
        password: loginInfo.password,
      });

      Logger.info('Login successful', {
        email: loginInfo.email,
        deviceId: loginInfo.deviceId,
      });

      const rememberMe = await getCurrentRememberMe();

      // Only show bottom sheet if rememberMe doesn't exist or is enabled
      if (!rememberMe || (rememberMe && !rememberMe.isEnabled)) {
        BottomSheet.show({
          component: (
            <LoginRemember
              onClose={() => {
                setRememberMe({
                  isEnabled: false,
                  snsType: 'NORMAL',
                  email: loginInfo.email,
                  credential: loginInfo.password,
                });
              }}
              onRemember={() => {
                setRememberMe({
                  isEnabled: true,
                  snsType: 'NORMAL',
                  email: loginInfo.email,
                  credential: loginInfo.password,
                });
              }}
            />
          ),
        });
      }

      return res.data;
    } catch (error) {
      Logger.error('Login failed', {
        email: loginInfo.email,
        deviceId: loginInfo.deviceId,
        error,
      });
      return null;
    }
  };

  const oauthLogin = async (
    loginInfo: OauthLoginRequest,
  ): Promise<OauthLoginResponse | null | string> => {
    try {
      Logger.info('OAuth login attempt', {
        snsType: loginInfo.snsType,
        deviceId: loginInfo.deviceId,
      });

      const res = await authApis.oauthLogin({
        ...loginInfo,
      });

      const { accessToken, refreshToken } = res.data;

      // token 저장
      setAccessToken({ accessToken, refreshToken });
      setToken({ accessToken, refreshToken });

      // login 정보 저장
      setOauthLoginInfo({
        snsType: loginInfo.snsType,
        token: loginInfo.token,
      });

      Logger.info('OAuth login successful', {
        snsType: loginInfo.snsType,
        deviceId: loginInfo.deviceId,
      });

      const rememberMe = await getCurrentRememberMe();

      if (!rememberMe || (rememberMe && !rememberMe.isEnabled)) {
        BottomSheet.show({
          component: (
            <LoginRemember
              onClose={() => {
                setRememberMe({
                  isEnabled: false,
                  snsType: loginInfo.snsType,
                  email: null,
                  credential: loginInfo.token,
                });
              }}
              onRemember={() => {
                setRememberMe({
                  isEnabled: true,
                  snsType: loginInfo.snsType,
                  email: null,
                  credential: loginInfo.token,
                });
              }}
            />
          ),
        });
      }

      return res.data;
    } catch (error: any) {
      Logger.error('OAuth login failed', {
        snsType: loginInfo.snsType,
        deviceId: loginInfo.deviceId,
        error: error.response?.data || error,
      });

      const { message } = error.response?.data || {};

      if (message && Object.values(SocialTypeValues).includes(message)) {
        return message;
      }

      // Handle Kakao and Google token refresh attempts
      const { snsType } = loginInfo;
      if (snsType === 'KAKAO' || snsType === 'GOOGLE') {
        Logger.info(`Attempting to refresh ${snsType} token`, {
          snsType,
          deviceId: loginInfo.deviceId,
        });

        const checkTokenValidity =
          snsType === 'KAKAO'
            ? checkKakaoTokenValidity
            : checkGoogleTokenValidity;

        const newAccessToken = await checkTokenValidity();
        if (newAccessToken) {
          const currentRememberMe = await getCurrentRememberMe();

          await oauthLogin({
            ...loginInfo,
            token: newAccessToken,
          });

          if (currentRememberMe?.isEnabled) {
            await setRememberMe({
              ...currentRememberMe,
              credential: newAccessToken,
            });
          }
        }
      }

      return null;
    }
  };

  const logout = async () => {
    try {
      Logger.info('User logout');
      await removeAccessToken();
      setToken({
        accessToken: '',
        refreshToken: '',
      });
      setAccessToken({ accessToken: '', refreshToken: '' });
    } catch (error) {
      Logger.error('Logout failed', { error });
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
