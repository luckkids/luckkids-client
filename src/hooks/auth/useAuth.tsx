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
import { checkGoogleTokenValidity } from '@hooks/sns-login/useGoogleLogin';
import { checkKakaoTokenValidity } from '@hooks/sns-login/useKakaoLogin';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import { RecoilLoginInfo, RecoilOauthLoginInfo } from '@recoil/recoil.login';
import { RecoilToken } from '@recoil/recoil.token';
import LoginRemember from '@components/page/login/remember';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';

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
    return await authApis
      .login({
        ...loginInfo,
      })
      .then(async (res) => {
        const { accessToken, refreshToken } = res.data;
        // token 저장
        setAccessToken({ accessToken, refreshToken });
        setToken({ accessToken, refreshToken });
        // login 정보 저장
        setLoginInfo({
          email: loginInfo.email,
          password: loginInfo.password,
        });

        const rememberMe = await getCurrentRememberMe();

        if (!rememberMe || rememberMe?.snsType !== 'NORMAL') {
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
      })
      .catch((error) => {
        console.error('Login Error', error);
        return null;
      });
  };

  const oauthLogin = async (
    loginInfo: OauthLoginRequest,
  ): Promise<OauthLoginResponse | null | string> => {
    return await authApis
      .oauthLogin({
        ...loginInfo,
      })
      .then(async (res) => {
        const { accessToken, refreshToken } = res.data;
        // token 저장
        setAccessToken({ accessToken, refreshToken });
        setToken({ accessToken, refreshToken });
        // login 정보 저장
        setOauthLoginInfo({
          snsType: loginInfo.snsType,
          token: loginInfo.token,
        });

        const rememberMe = await getCurrentRememberMe();

        if (!rememberMe || rememberMe?.snsType === 'NORMAL') {
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
      })
      .catch(async (error) => {
        console.error(error);

        const { message } = error.response.data;

        if (message && Object.values(SocialTypeValues).includes(message)) {
          return message;
        } else {
          const { snsType } = loginInfo;
          // kakao 재로그인
          if (snsType === 'KAKAO') {
            console.log('Kakao token may be invalid. Trying to re-login...');
            const newAccessToken = await checkKakaoTokenValidity();
            if (newAccessToken) {
              const currentRememberMe = await getCurrentRememberMe();

              await oauthLogin({
                ...loginInfo,
                token: newAccessToken,
              });

              // 자동 로그인 설정이 되어있으면 새로운 토큰으로 갱신
              if (currentRememberMe?.isEnabled) {
                await setRememberMe({
                  ...currentRememberMe,
                  credential: newAccessToken,
                });
              }

              return;
            }
          }
          // google 재로그인
          if (snsType === 'GOOGLE') {
            console.log('Google token may be invalid. Trying to re-login...');
            const newAccessToken = await checkGoogleTokenValidity();
            if (newAccessToken) {
              const currentRememberMe = await getCurrentRememberMe();
              console.log('[currentRememberMe]', currentRememberMe);

              // 새로운 토큰을 받아서 다시 로그인 시도
              await oauthLogin({
                ...loginInfo,
                token: newAccessToken,
              });

              // 자동 로그인 설정이 되어있으면 새로운 토큰으로 갱신
              if (currentRememberMe?.isEnabled) {
                await setRememberMe({
                  ...currentRememberMe,
                  credential: newAccessToken,
                });
              }

              return;
            }
          }
        }

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
      setAccessToken({ accessToken: '', refreshToken: '' });
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
