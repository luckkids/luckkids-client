import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L, SvgIcon } from '@design-system';
import { useHomeInfo } from '@queries';
import { getLuckCardImage, saveImage, shareImage } from '@utils';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import SnackBar from '@global-components/common/SnackBar/SnackBar';

//TODO(Gina): 버튼 스타일 변경 (pressed)
export const PageHomeProfileShare: React.FC = () => {
  const { data: homeInfo } = useHomeInfo();
  const { userCharacterSummaryResponse } = homeInfo || {};
  const { inProgressCharacter } = userCharacterSummaryResponse || {};
  const { bottom } = useSafeAreaInsets();

  const luckCardImageUrl = inProgressCharacter
    ? getLuckCardImage(
        inProgressCharacter?.characterType,
        inProgressCharacter?.level,
      )
    : '';

  const handleShareProfile = () => {
    //TODO(FIXME: Gina) 기획 변경으로 인해 수정 필요
    if (!luckCardImageUrl) return;
    shareImage({
      title: '프로필 공유',
      message: '행운의 한마디를 공유합니다!',
      imageUrl: luckCardImageUrl,
    });
  };

  const handleSaveImage = () => {
    if (!luckCardImageUrl) return;
    try {
      console.log('save Image');
      saveImage(luckCardImageUrl);
      SnackBar.show({
        title: '이미지가 저장되었습니다!',
        position: 'bottom',
        rounded: 100,
        offsetY: bottom,
        width: 200,
      });
    } catch (error) {
      console.error('handleSaveImage', error);
    }
  };

  return (
    <FrameLayout
      statusBarColor={'BLACK'}
      backgroundColor="BLACK"
      NavBar={<StackNavbar />}
    >
      <L.Col
        items="center"
        justify="center"
        h={'100%'}
        ph={DEFAULT_MARGIN}
        pb={100}
      >
        {/* 캐릭터 */}
        <L.Row w="100%" justify="center" rounded={25}>
          {inProgressCharacter && (
            <Image
              source={{
                uri: getLuckCardImage(
                  inProgressCharacter.characterType,
                  inProgressCharacter.level,
                ),
              }}
              style={{
                width: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
                height: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
              }}
            />
          )}
        </L.Row>
        {/* 버튼 */}
        <L.Row g={8} mt={70}>
          {/* 프로필 공유  */}
          <TouchableWithoutFeedback onPress={handleShareProfile}>
            <L.Col
              bg="GREY5"
              flex-1
              ph={46}
              pv={15}
              items="center"
              rounded={15}
              g={10}
            >
              <SvgIcon name="icon_share_green" size={20} color="WHITE" />
              <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                공유
              </Font>
            </L.Col>
          </TouchableWithoutFeedback>
          {/* 이미지 저장 */}
          <TouchableWithoutFeedback onPress={handleSaveImage}>
            <L.Col
              bg="GREY5"
              flex-1
              ph={46}
              pv={15}
              items="center"
              rounded={15}
              g={10}
            >
              <SvgIcon name="icon_download_green" size={20} color="WHITE" />
              <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                이미지 저장
              </Font>
            </L.Col>
          </TouchableWithoutFeedback>
        </L.Row>
      </L.Col>
    </FrameLayout>
  );
};
