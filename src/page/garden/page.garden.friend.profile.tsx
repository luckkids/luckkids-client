import React from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import FastImage from 'react-native-fast-image';
import { Font, L, SvgIcon } from '@design-system';
import { useUserInfo } from '@queries';
import { getCharacterImage } from '@utils';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';

export const PageGardenFriendProfile: React.FC = () => {
  const {
    params: { friendId },
  } = useNavigationRoute('GardenFriendProfile');

  const { data: userInfo } = useUserInfo(friendId);
  const { luckPhrase, nickname, inProgressCharacter } = userInfo || {};

  return (
    <FrameLayout
      statusBarColor={'HOME_PROFILE_BG'}
      backgroundColor="HOME_PROFILE_BG"
      NavBar={<StackNavbar />}
    >
      <L.Col items="center" justify="center" mt={100}>
        {/* 행운의 한마디  */}
        <L.Row>
          <L.Row
            mb={40}
            items="center"
            rounded={15}
            ph={21}
            pv={17}
            style={{
              backgroundColor: '#9ADAA7',
              opacity: 0.15,
              position: 'relative',
            }}
            w={SCREEN_WIDTH - 2 * 35}
            h={58}
          />
          <L.Absolute
            flexDirection="row"
            justify="center"
            items="center"
            w={SCREEN_WIDTH - 2 * 35}
            h={58}
            opacity={luckPhrase ? 1 : 0.5}
          >
            <Font type={'BODY_REGULAR'} color={'WHITE'} textAlign="center">
              {luckPhrase}
            </Font>
          </L.Absolute>
        </L.Row>
        {/* 캐릭터 */}
        <L.Row justify="center">
          {inProgressCharacter && (
            <FastImage
              source={{
                uri: getCharacterImage(
                  inProgressCharacter?.characterType,
                  inProgressCharacter?.level,
                ),
              }}
              style={{
                width: SCREEN_WIDTH - 2 * CHARACTER_MARGIN,
                height: SCREEN_WIDTH - 2 * CHARACTER_MARGIN,
              }}
            />
          )}
        </L.Row>
        {/* 이름 수정 */}
        <L.Row mt={36} items="center">
          <Font type={'TITLE1_BOLD'} color={'WHITE'} mr={9}>
            {nickname}
          </Font>
        </L.Row>
      </L.Col>
    </FrameLayout>
  );
};

const CHARACTER_MARGIN = 90;
