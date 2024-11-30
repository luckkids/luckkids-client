import React, { useEffect, useState } from 'react';
import { Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { interval, take } from 'rxjs';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SimpleTextInput } from '@design-system';
import { userApis } from '@apis/user';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilInitialSetting } from '@recoil/recoil.initialSetting';

const tutorialGuideBgImage = require('assets/images/tutorial-guide-bg.png');
const tutorialSettingBgImage = require('assets/images/tutorial-setting-bg.png');
const tutorialSettingCharacterCompleteImage = require('assets/images/tutorial-setting-character-complete.png');
const tutorialSettingCharacterImage = require('assets/images/tutorial-setting-character.png');
const tutorialSettingCharacterNickname = require('assets/images/tutorial-setting-nickname.png');

export const PageTutorialSettingCharacter: React.FC = () => {
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [initialSetting, setInitialSetting] =
    useRecoilState(RecoilInitialSetting);

  const handleNext = async () => {
    const initialCharacter = await userApis.getInitialCharacter();
    const { id } = initialCharacter;

    if (step === 2) {
      // nickname 저장
      setInitialSetting({
        ...initialSetting,
        character: {
          id: id,
          nickName: nickname,
        },
      });
    }

    if (step === 3) {
      navigation.navigate('TutorialSettingNoti');
    }

    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    // step이 1이거나 3일때만 타이머 실행
    if (step !== 1 && step !== 3) return;
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
              mt={84}
            >
              {'함께 키워가게 될\n어떤 럭키즈가 기다릴까?'}
            </Font>
            <Font
              textAlign="center"
              type={'HEADLINE_SEMIBOLD'}
              color={'GREY1'}
              mt={20}
            >
              {'슬라임을 눌러 럭키즈를 받아보세요'}
            </Font>
            <TouchableWithoutFeedback onPress={handleNext}>
              <L.Row mt={108} items="center">
                <Image
                  source={tutorialSettingCharacterImage}
                  style={{
                    width: 60,
                    height: 130,
                  }}
                />
              </L.Row>
            </TouchableWithoutFeedback>
          </>
        );
      case 1:
        return (
          <>
            <Font textAlign="left" type={'TITLE1_BOLD'} color={'WHITE'} mt={76}>
              {'두근두근,\n럭키즈가 탄생하고 있어요!'}
            </Font>
            <L.Row mt={108} items="center">
              <LottieView
                source={require(
                  `../../../assets/lotties/tutorial-character-change.json`,
                )}
                style={{
                  width: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
                  height: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
                }}
                autoPlay
              />
            </L.Row>
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
                source={tutorialSettingCharacterCompleteImage}
                style={{
                  width: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
                  height: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
                }}
              />
            </L.Row>
            <Font
              textAlign="center"
              type={'TITLE2_BOLD'}
              color={'WHITE'}
              mt={30}
            >
              {'럭키즈 탄생을 축하해요!'}
            </Font>
            <Font
              textAlign="center"
              type={'BODY_REGULAR'}
              color={'GREY0'}
              mt={20}
              mb={40}
            >
              {
                '과연 어떤 럭키즈로 커갈까요?\n꾸준히 습관을 수행하며 럭키즈를 키워보세요.'
              }
            </Font>
          </>
        );
      default:
        return <></>;
    }
  };

  const renderBackgroundImage = () => {
    switch (step) {
      case 0:
      case 1:
        return tutorialSettingBgImage;
      case 2:
        return tutorialSettingCharacterNickname;
      case 3:
        return tutorialGuideBgImage;
      default:
        return tutorialSettingBgImage;
    }
  };

  return (
    <FrameLayout
      statusBarColor={step === 3 ? 'TUTORIAL_GUIDE_BG' : 'TUTORIAL_SETTING_BG'}
      backgroundImage={renderBackgroundImage()}
      backgroundColor={step === 3 ? 'TUTORIAL_GUIDE_BG' : 'TUTORIAL_SETTING_BG'}
      backgroundImageStyle={
        step === 2
          ? {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH * (500 / 375),
              position: 'absolute',
              bottom: 0,
            }
          : {}
      }
      paddingBottom={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <L.Col
          w="100%"
          items={step === 1 ? 'flex-start' : 'center'}
          ph={DEFAULT_MARGIN}
          h="100%"
        >
          {renderContent()}
        </L.Col>
      </TouchableWithoutFeedback>
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
    </FrameLayout>
  );
};
