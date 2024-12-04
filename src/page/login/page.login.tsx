import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { SettingStatus, SocialType } from '@types-index';
import { SocialTypeValues } from '@apis/auth';
import { FrameLayout } from '@frame/frame.layout';
import useAuth from '@hooks/auth/useAuth';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import { useAppleLogin } from '@hooks/sns-login/useAppleLogin';
import { useGoogleLogin } from '@hooks/sns-login/useGoogleLogin';
import { useKakaoLogin } from '@hooks/sns-login/useKakaoLogin';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import Logger from '@libs/LoggerService';
import { RecoilDevice } from '@recoil/recoil.device';

export const PageLogin: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { handleAppleLogin } = useAppleLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  const { handleKakaoLogin } = useKakaoLogin();
  const navigation = useNavigationService();
  const { getCurrentValue: getCurrentRememberMe, setValue: setRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);
  const { deviceId } = useRecoilValue(RecoilDevice);
  const { getToken } = useFirebaseMessage();

  const handlePressJoin = () => {
    navigation.navigate('LoginJoin', {
      step: 'Id',
    });
  };

  const handlePressLogin = () => {
    navigation.push('LoginId');
  };

  const { oauthLogin } = useAuth();

  const getOauthHandler = async (type: SocialType) => {
    switch (type) {
      case 'APPLE':
        return await handleAppleLogin();
      case 'GOOGLE':
        return await handleGoogleLogin();
      case 'KAKAO':
      default:
        return await handleKakaoLogin();
    }
  };

  const handleAfterLogin = (settingStatus: SettingStatus) => {
    if (settingStatus === 'COMPLETE') {
      return navigation.navigate('Home', {});
    } else {
      return navigation.navigate('TutorialStart');
    }
  };

  const handleOauthLogin = async (type: SocialType) => {
    if (!deviceId) return;
    const pushKey = await getToken();
    const token = await getOauthHandler?.(type);
    if (token) {
      try {
        const res = await oauthLogin({
          snsType: type,
          deviceId,
          pushKey,
          token,
        });

        if (!res) return;
        // social login 실패시 error message로 받아서 어떤 타입 계정이 존재하는지 확인
        // 있으면 catch block으로 이동
        if (typeof res === 'string') {
          throw new Error(res);
        }

        return handleAfterLogin(res.settingStatus);
      } catch (error: any) {
        if (error.message) {
          const type = error.message;
          if (Object.values(SocialTypeValues).includes(type)) {
            navigation.navigate('LoginAlready', {
              type: type as SocialType,
              email: null,
            });
          }
        }
      }
    }
  };

  useAsyncEffect(async () => {
    // NOTE: 로그인 화면에서 rememberMe 정보 로깅
    const rememberMe = await getCurrentRememberMe();

    Logger.info('Arrived Login Page', {
      email: rememberMe?.email,
      snsType: rememberMe?.snsType,
      isEnabled: rememberMe?.isEnabled,
      credential: rememberMe?.credential,
    });
  }, []);

  return (
    <FrameLayout>
      <L.Absolute b={bottom + 60} w={'100%'}>
        <L.Col w={'100%'} items="center">
          <L.Col mb={60} items="center">
            {/* 로고 추가 */}
            <Image
              source={require('@design-system/assets/images/main-logo.png')}
              style={{
                resizeMode: 'contain',
                width: 136,
                height: 107,
              }}
            />
          </L.Col>
          <L.Col ph={DEFAULT_MARGIN} g={10} w={'100%'}>
            <Button
              status={'normal'}
              bgColor={'KAKAO_YELLOW'}
              text={'카카오로 계속하기'}
              textColor="BLACK"
              onPress={() => handleOauthLogin('KAKAO')}
              type={'action'}
              sizing="stretch"
              iconName="iconKakao"
            />
            <Button
              status={'normal'}
              bgColor={'WHITE'}
              text={'Apple로 계속하기'}
              textColor="BLACK"
              onPress={() => handleOauthLogin('APPLE')}
              type={'action'}
              sizing="stretch"
              iconName="iconApple"
            />
            <Button
              status={'normal'}
              bgColor={'WHITE'}
              text={'Google로 계속하기'}
              textColor="BLACK"
              onPress={() => handleOauthLogin('GOOGLE')}
              type={'action'}
              sizing="stretch"
              iconName="iconGoogle"
            />
          </L.Col>
          <L.Row justify="center" g={20} w={'100%'} mt={30}>
            <TouchableWithoutFeedback onPress={handlePressJoin}>
              <Font type={'SUBHEADLINE_SEMIBOLD'} color={'WHITE'}>
                이메일 회원가입
              </Font>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePressLogin}>
              <Font type={'SUBHEADLINE_SEMIBOLD'} color={'WHITE'}>
                이메일 로그인
              </Font>
            </TouchableWithoutFeedback>
          </L.Row>
        </L.Col>
      </L.Absolute>
    </FrameLayout>
  );
};
