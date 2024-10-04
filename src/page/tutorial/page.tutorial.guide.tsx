import React, { useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const bgImage = require('assets/images/tutorial-guide-bg.png');

export const PageTutorialGuide: React.FC = () => {
  const navigation = useNavigationService();
  const [step, setStep] = useState(0);

  const handlePressNext = () => {
    if (step === TUTORIAL_GUIDE_CONTENTS.length - 1) {
      navigation.navigate('TutorialSettingCharacter');
      return;
    }
    setStep((prev) => prev + 1);
  };

  return (
    <FrameLayout statusBarColor={'TUTORIAL_GUIDE_BG'} backgroundImage={bgImage}>
      <L.Col
        ph={DEFAULT_MARGIN}
        items="center"
        justify="space-between"
        h={'100%'}
        w={'100%'}
      >
        <L.Col w={'100%'} items="center">
          <L.Row items={'center'}>
            <ProgressBar
              progress={(step + 1) / TUTORIAL_GUIDE_CONTENTS.length}
            />
          </L.Row>
          <Font textAlign="center" type={'TITLE2_BOLD'} color={'WHITE'} mt={76}>
            {TUTORIAL_GUIDE_CONTENTS[step].title}
          </Font>
          {TUTORIAL_GUIDE_CONTENTS[step].description && (
            <Font
              textAlign="center"
              type={'BODY_REGULAR'}
              color={'GREY0'}
              mt={20}
            >
              {TUTORIAL_GUIDE_CONTENTS[step].description}
            </Font>
          )}
          <L.Row w={'100%'} justify="center" mt={50}>
            <LottieView
              source={TUTORIAL_GUIDE_CONTENTS[step].lottieFile}
              autoPlay
              loop
              style={{
                width: TUTORIAL_GUIDE_CONTENTS[step].size,
                height: TUTORIAL_GUIDE_CONTENTS[step].size,
              }}
            />
          </L.Row>
        </L.Col>
        <Button
          type={'action'}
          text={TUTORIAL_GUIDE_CONTENTS[step].buttonText}
          onPress={handlePressNext}
          sizing="stretch"
          bgColor={'LUCK_GREEN'}
          textColor={'BLACK'}
        />
      </L.Col>
    </FrameLayout>
  );
};

const TUTORIAL_GUIDE_CONTENTS = [
  {
    title: '먼저 럭키즈 캐릭터를 설정해요.',
    description: '캐릭터 닉네임도 붙여줄 거예요!',
    buttonText: '그 다음은요?',
    lottieFile: require(`../../../assets/lotties/tutorial-guide-1.json`),
    size: SCREEN_WIDTH,
  },
  {
    title: '행운을 키워줄 습관과\n습관 알림 시간을 세팅해요.',
    buttonText: '습관을 수행하면요?',
    lottieFile: require(`../../../assets/lotties/tutorial-guide-2.json`),
    size: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
  },
  {
    title:
      '습관을 수행할 때마다\n점수가 1점씩 쌓이며\n럭키즈 캐릭터가 성장해요!',
    description:
      '100점이 완성되면 캐릭터 성장 완료! 100점\n이후에는 캐릭터를 다시 0점부터 키울 수 있어요.',
    buttonText: '이제 시작할래요',
    lottieFile: require(`../../../assets/lotties/tutorial-guide-3-2X.json`),
    size: SCREEN_WIDTH,
  },
];
