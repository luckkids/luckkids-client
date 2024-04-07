import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useAppleLogin } from '@hooks/sns-login/useAppleLogin';
import { useGoogleLogin } from '@hooks/sns-login/useGoogleLogin';
import { useKakaoLogin } from '@hooks/sns-login/useKakaoLogin';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { useFetch } from '@hooks/useFetch';

export const PageLogin: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { handleAppleLogin } = useAppleLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  const { handleKakaoLogin } = useKakaoLogin();
  const navigation = useNavigationService();
  const [deviceId, setDeviceId] = React.useState<string>('');

  const handlePressJoin = () => {
    navigation.navigate('LoginJoin', {
      step: 'Id',
    });
  };

  const handlePressLogin = () => {
    navigation.navigate('LoginId');
  };

  const { onFetch: oauthKakaoLogin } = useFetch({
    method: 'POST',
    url: '/auth/oauth/login',
    onSuccessCallback: () => {},
    onFailCallback: () => {},
  });

  const handleKakao = async () => {
    const token = await handleKakaoLogin();
    if (token)
      oauthKakaoLogin({
        snsType: 'KAKAO',
        deviceId,
        pushKey:
          'ffBUlnx4BE7XveMXelsLNu:APA91bHfd01c-SnAraV3twtgOiZztYEfC9Db-PVFYMvIxZntFc5twUQnuOOXKSFawxF7ZLTA64P36yEOYhQDHKYhAd52tgMWOZVmjHq7x8wIxInmul2Fbmab5yGG_kNKMylCoNJK8wZo',
        token,
      });
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
            <Font type={'LARGE_TITLE_BOLD'}>Luck Kids</Font>
          </L.Col>
          <L.Col ph={DEFAULT_MARGIN} g={10} w={'100%'}>
            <Button
              status={'normal'}
              bgColor={'KAKAO_YELLOW'}
              text={'카카오로 계속하기'}
              textColor="BLACK"
              onPress={handleKakao}
              type={'action'}
              sizing="stretch"
              iconName="iconKakao"
            />
            <Button
              status={'normal'}
              bgColor={'WHITE'}
              text={'Apple로 계속하기'}
              textColor="BLACK"
              onPress={handleAppleLogin}
              type={'action'}
              sizing="stretch"
              iconName="iconApple"
            />
            <Button
              status={'normal'}
              bgColor={'WHITE'}
              text={'Google로 계속하기'}
              textColor="BLACK"
              onPress={handleGoogleLogin}
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
