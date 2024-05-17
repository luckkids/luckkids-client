import React, { useEffect, useState } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { interval, take } from 'rxjs';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SimpleTextInput, SvgIcon } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { getCharacterImage, saveImage, shareImage } from '@utils';

const bgImage = require('assets/images/tutorial-setting-bg.png');

export const PageTutorialSettingCharacter: React.FC = () => {
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');

  const handleConfirm = () => {
    navigation.navigate('TutorialSettingNoti');
    return;
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  // save image
  const handleSaveImage = () => {
    return saveImage(getCharacterImage('CLOUD', 1));
  };

  const handleShareProfile = (imageUrl: string) => {
    //TODO fix this
    shareImage({
      title: '럭키즈 프로필 공유',
      message: '행운럭키',
      imageUrl: imageUrl,
    });
  };

  useEffect(() => {
    if (step !== 1) return;
    const subscription = interval(3000)
      .pipe(take(1))
      .subscribe(() => {
        handleNext();
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [step]);

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Font
              textAlign="center"
              type={'TITLE2_BOLD'}
              color={'WHITE'}
              mt={76}
            >
              {'함께 키워가게 될\n어떤 럭키즈가 기다릴까?'}
            </Font>
            <Font
              textAlign="center"
              type={'BODY_REGULAR'}
              color={'GREY0'}
              mt={20}
            >
              슬라임을 눌러 럭키즈를 받아보세요
            </Font>
            {/* TODO LOTTIE */}
            <TouchableWithoutFeedback onPress={handleNext}>
              <L.Row w={200} h={200} mt={100} bg="WHITE" />
            </TouchableWithoutFeedback>
          </>
        );
      case 1:
        return (
          <>
            <Font textAlign="left" type={'TITLE1_BOLD'} color={'WHITE'} mt={76}>
              {'두근두근,\n럭키즈가 탄생하고 있어요!'}
            </Font>
          </>
        );
      case 2:
        return (
          <>
            <Font
              textAlign="center"
              type={'TITLE2_BOLD'}
              color={'WHITE'}
              mt={76}
            >
              {'행운과 함께 쑥쑥 자라날 럭키즈!\n어떤 닉네임을 붙여줄까요?'}
            </Font>
            <Font
              textAlign="center"
              type={'BODY_REGULAR'}
              color={'GREY0'}
              mt={20}
              mb={40}
            >
              캐릭터와 유저 닉네임은 동일하게 사용되어요.
            </Font>
            <L.Row w={230} h={60}>
              <SimpleTextInput
                text={nickname}
                onChangeText={setNickname}
                placeholder="행운럭키"
                backgroundColor="rgba(128, 244, 102, 0.2)"
                outline={nickname ? 'LUCK_GREEN' : undefined}
              />
            </L.Row>
          </>
        );
      case 3:
        return (
          <>
            <L.Row>
              <Image
                source={{
                  uri: getCharacterImage('CLOUD', 1),
                }}
                style={{
                  width: SCREEN_WIDTH - 120,
                  height: SCREEN_WIDTH - 120,
                }}
              />
            </L.Row>
            <Font
              textAlign="center"
              type={'TITLE2_BOLD'}
              color={'WHITE'}
              mt={76}
            >
              {'짠, 아직 새싹'}
            </Font>
            <Font
              textAlign="center"
              type={'BODY_REGULAR'}
              color={'GREY0'}
              mt={20}
              mb={40}
            >
              {
                '아직 새싹 단계예요. 습관을 수행하여\n행운을 가져다 줄 클로버를 키워보세요!'
              }
            </Font>
            <L.Row g={8}>
              {/* 이미지 저장 */}
              <TouchableWithoutFeedback onPress={handleSaveImage}>
                <L.Col
                  bg="BLACK"
                  style={{
                    opacity: 0.5,
                  }}
                  flex-1
                  ph={46}
                  pv={15}
                  items="center"
                  rounded={15}
                  g={10}
                >
                  <SvgIcon name="icon_download_green" size={20} />
                  <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                    이미지 저장
                  </Font>
                </L.Col>
              </TouchableWithoutFeedback>
              {/* 프로필 공유  */}
              <TouchableWithoutFeedback
                onPress={() => {
                  handleShareProfile(getCharacterImage('CLOUD', 1));
                }}
              >
                <L.Col
                  bg="BLACK"
                  style={{
                    opacity: 0.5,
                  }}
                  flex-1
                  ph={46}
                  pv={15}
                  items="center"
                  rounded={15}
                  g={10}
                >
                  <SvgIcon name="icon_share_green" size={20} />
                  <Font type="FOOTNOTE_SEMIBOLD" color="WHITE">
                    프로필 공유
                  </Font>
                </L.Col>
              </TouchableWithoutFeedback>
            </L.Row>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <FrameLayout
      statusBarColor={'TUTORIAL_SETTING_BG'}
      backgroundImage={bgImage}
    >
      <L.Col
        w="100%"
        items={step === 1 ? 'flex-start' : 'center'}
        ph={DEFAULT_MARGIN}
        h="100%"
      >
        {renderContent()}
      </L.Col>
      {step === 2 && !!nickname && (
        <L.Absolute b={bottom} w={SCREEN_WIDTH}>
          <L.Row ph={DEFAULT_MARGIN}>
            <Button
              type={'action'}
              text={'럭키즈를 만나볼래요'}
              onPress={handleNext}
              sizing="stretch"
              textColor="BLACK"
              bgColor={'LUCK_GREEN'}
            />
          </L.Row>
        </L.Absolute>
      )}
      {step === 3 && (
        <L.Absolute b={bottom} w={SCREEN_WIDTH}>
          <L.Row ph={DEFAULT_MARGIN}>
            <Button
              type={'action'}
              text={'습관을 세팅할게요'}
              onPress={handleConfirm}
              sizing="stretch"
              textColor="BLACK"
              bgColor={'LUCK_GREEN'}
            />
          </L.Row>
        </L.Absolute>
      )}
    </FrameLayout>
  );
};
