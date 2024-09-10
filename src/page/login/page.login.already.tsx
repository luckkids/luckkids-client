import React from 'react';
import { useRecoilValue } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { ChipButton, Font, L, SvgIcon } from '@design-system';
import { SettingStatus, SocialType } from '@types-index';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useAuth from '@hooks/auth/useAuth';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useAppleLogin } from '@hooks/sns-login/useAppleLogin';
import { useGoogleLogin } from '@hooks/sns-login/useGoogleLogin';
import { useKakaoLogin } from '@hooks/sns-login/useKakaoLogin';
import { RecoilDevice } from '@recoil/recoil.device';

export const PageLoginAlready: React.FC = () => {
  const {
    params: { type },
  } = useNavigationRoute('LoginAlready');
  const { oauthLogin } = useAuth();

  const { handleAppleLogin } = useAppleLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  const { handleKakaoLogin } = useKakaoLogin();
  const navigation = useNavigationService();
  const { deviceId } = useRecoilValue(RecoilDevice);

  const getOauthHandler = async (type: SocialType) => {
    switch (type) {
      case 'APPLE':
        return await handleAppleLogin();
      case 'GOOGLE':
        return await handleGoogleLogin();
      case 'KAKAO':
        return await handleKakaoLogin();
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
    const token = await getOauthHandler?.(type);
    if (token) {
      try {
        const res = await oauthLogin({
          snsType: type,
          deviceId,
          pushKey: null,
          token,
        });

        if (!res || typeof res === 'string') return;

        return handleAfterLogin(res.settingStatus);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleNormalLogin = () => {
    navigation.push('LoginId');
  };

  return (
    <FrameLayout>
      <StackNavbar useBackButton />
      <L.Col w={'100%'} h={'100%'} items={'center'} ph={DEFAULT_MARGIN}>
        <L.Col w={'100%'} mt={36}>
          <Font type={'TITLE2_BOLD'}>이미 가입한 계정이 있어요.</Font>
          <Font type={'BODY_REGULAR'} mt={20}>
            {
              '정보와 일치하는 계정이 존재합니다.\n아래 계정으로 로그인해주세요.'
            }
          </Font>
        </L.Col>
        <L.Col w="100%" mt={40} g={30}>
          {type === 'APPLE' && (
            <L.Row w="100%" items="center" justify="space-between">
              <L.Row items="center">
                <L.Row
                  bg="WHITE"
                  w={ICON_SIZE}
                  h={ICON_SIZE}
                  rounded={ICON_SIZE / 2}
                  justify="center"
                  items="center"
                  mr={14}
                >
                  <SvgIcon name="iconApple" size={20} />
                </L.Row>
                <Font type="HEADLINE_SEMIBOLD" color="WHITE">
                  Apple
                </Font>
              </L.Row>
              <ChipButton
                text={'로그인'}
                onPress={() => handleOauthLogin('APPLE')}
              />
            </L.Row>
          )}
          {type === 'KAKAO' && (
            <L.Row w="100%" items="center" justify="space-between">
              <L.Row items="center">
                <L.Row
                  bg="KAKAO_YELLOW"
                  w={ICON_SIZE}
                  h={ICON_SIZE}
                  rounded={ICON_SIZE / 2}
                  justify="center"
                  items="center"
                  mr={14}
                >
                  <SvgIcon name="iconKakao" size={20} />
                </L.Row>
                <Font type="HEADLINE_SEMIBOLD" color="WHITE">
                  카카오
                </Font>
              </L.Row>
              <ChipButton
                text={'로그인'}
                onPress={() => {
                  handleOauthLogin('KAKAO');
                }}
              />
            </L.Row>
          )}
          {type === 'GOOGLE' && (
            <L.Row w="100%" items="center" justify="space-between">
              <L.Row items="center">
                <L.Row
                  bg="WHITE"
                  w={ICON_SIZE}
                  h={ICON_SIZE}
                  rounded={ICON_SIZE / 2}
                  justify="center"
                  items="center"
                  mr={14}
                >
                  <SvgIcon name="iconGoogle" size={20} />
                </L.Row>
                <Font type="HEADLINE_SEMIBOLD" color="WHITE">
                  Google
                </Font>
              </L.Row>
              <ChipButton
                text={'로그인'}
                onPress={() => {
                  handleOauthLogin('GOOGLE');
                }}
              />
            </L.Row>
          )}
          {type === 'NORMAL' && (
            <L.Row w="100%" items="center" justify="space-between">
              <L.Row items="center">
                <L.Row
                  bg="WHITE"
                  w={ICON_SIZE}
                  h={ICON_SIZE}
                  rounded={ICON_SIZE / 2}
                  justify="center"
                  items="center"
                  mr={14}
                >
                  {/* TODO: icon 바꿔야 함 */}
                  {/* <SvgIcon name="iconGoogle" size={20} /> */}
                </L.Row>
                <Font type="HEADLINE_SEMIBOLD" color="WHITE">
                  이메일
                </Font>
              </L.Row>
              <ChipButton text={'로그인'} onPress={handleNormalLogin} />
            </L.Row>
          )}
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};

const ICON_SIZE = 34;
