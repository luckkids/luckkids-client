import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { SettingStatus, SocialType } from '@types-index';
import LoginRemember from '@components/page/login/remember';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import useAuth from '@hooks/auth/useAuth';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useAppleLogin } from '@hooks/sns-login/useAppleLogin';
import { useGoogleLogin } from '@hooks/sns-login/useGoogleLogin';
import { useKakaoLogin } from '@hooks/sns-login/useKakaoLogin';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';

export const PageLogin: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { handleAppleLogin } = useAppleLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  const { handleKakaoLogin } = useKakaoLogin();
  const navigation = useNavigationService();
  const [deviceId, setDeviceId] = React.useState<string>('');
  const { storedValue: rememberMe, setValue: setRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

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
      return navigation.navigate('Home');
    } else {
      return navigation.navigate('TutorialStart');
    }
  };

  const handleOauthLogin = async (type: SocialType) => {
    const token = await getOauthHandler?.(type);
    if (token) {
      try {
        const res = await oauthLogin({
          snsType: type,
          deviceId,
          pushKey: null,
          token,
        });

        if (!res) return;

        // rememberMe 정보가 없으면 자동 로그인 bottom sheet 띄우기
        if (!rememberMe || rememberMe?.snsType === 'NORMAL') {
          BottomSheet.show({
            component: (
              <LoginRemember
                onClose={() => {
                  handleAfterLogin(res.settingStatus);
                  setRememberMe({
                    snsType: type,
                    email: null,
                    credential: token,
                    isEnabled: false,
                  });
                }}
                onRemember={() => {
                  handleAfterLogin(res.settingStatus);
                  setRememberMe({
                    snsType: type,
                    email: null,
                    credential: token,
                    isEnabled: true,
                  });
                }}
              />
            ),
          });
          // rememberMe 정보가 있으면 바로 홈으로 이동
        } else {
          return handleAfterLogin(res.settingStatus);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useAsyncEffect(async () => {
    setDeviceId(await DeviceInfo.getUniqueId());
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
