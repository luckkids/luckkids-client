import React from 'react';
import { DEFAULT_MARGIN } from '@constants';
import { ChipButton, Font, L, SvgIcon } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import { useAppleLogin } from '@hooks/sns-login/useAppleLogin';
import { useGoogleLogin } from '@hooks/sns-login/useGoogleLogin';
import { useKakaoLogin } from '@hooks/sns-login/useKakaoLogin';

export const PageLoginAlready: React.FC = () => {
  const {
    params: { type },
  } = useNavigationRoute('LoginAlready');

  const { handleAppleLogin } = useAppleLogin();
  const { handleGoogleLogin } = useGoogleLogin();
  const { handleKakaoLogin } = useKakaoLogin();

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
              <ChipButton text={'로그인'} onPress={handleAppleLogin} />
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
              <ChipButton text={'로그인'} onPress={handleKakaoLogin} />
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
              <ChipButton text={'로그인'} onPress={handleGoogleLogin} />
            </L.Row>
          )}
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};

const ICON_SIZE = 34;
