import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SvgIcon } from '@design-system';
import { useHomeInfo, useMe } from '@queries';
import { getCharacterImage } from '@utils';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageHomeProfile: React.FC = () => {
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();

  const { data: me } = useMe();
  const { luckPhrase, nickname } = me || {};
  const { data: homeInfo } = useHomeInfo();
  const { userCharacterSummaryResponse } = homeInfo || {};
  const { inProgressCharacter } = userCharacterSummaryResponse || {};

  const handleEditComment = () => {
    navigation.navigate('SettingComment');
  };

  const handleEditName = () => {
    navigation.navigate('SettingProfile');
  };

  const handleShareProfile = () => {
    if (!inProgressCharacter) return;
    navigation.navigate('HomeProfileShare');
  };

  return (
    <FrameLayout
      statusBarColor={'HOME_PROFILE_BG'}
      backgroundColor="HOME_PROFILE_BG"
      NavBar={<StackNavbar />}
    >
      <L.Col items="center" justify="center" mt={100}>
        {/* 행운의 한마디 수정 */}
        <TouchableWithoutFeedback onPress={handleEditComment}>
          <L.Row
            style={{
              position: 'relative',
            }}
          >
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
              r={-14}
              t={-14}
              rounded={14}
              style={{
                backgroundColor: '#021911',
              }}
            >
              <SvgIcon name={'icon_edit_comment'} size={28} />
            </L.Absolute>
            <L.Absolute
              flexDirection="row"
              justify="center"
              items="center"
              w={SCREEN_WIDTH - 2 * 35}
              h={58}
              opacity={luckPhrase ? 1 : 0.5}
            >
              <Font type={'BODY_REGULAR'} color={'WHITE'} textAlign="center">
                {luckPhrase || PHRASE_PLACEHOLDER}
              </Font>
            </L.Absolute>
          </L.Row>
        </TouchableWithoutFeedback>
        {/* 캐릭터 */}
        <L.Row w="100%" justify="center">
          {inProgressCharacter && (
            <Image
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
        <TouchableWithoutFeedback onPress={handleEditName}>
          <L.Row mt={36} items="center">
            <Font type={'TITLE1_BOLD'} color={'WHITE'} mr={9}>
              {nickname}
            </Font>
            <SvgIcon name={'icon_edit'} size={16} />
          </L.Row>
        </TouchableWithoutFeedback>
      </L.Col>

      <L.Absolute b={bottom} ph={DEFAULT_MARGIN}>
        <Button
          text={'프로필 공유하기'}
          onPress={handleShareProfile}
          type={'action'}
          bgColor="LUCK_GREEN"
          sizing="stretch"
        />
      </L.Absolute>
    </FrameLayout>
  );
};

const PHRASE_PLACEHOLDER = '당신의 행운의 한마디를 적어주세요!';
const CHARACTER_MARGIN = 75;
