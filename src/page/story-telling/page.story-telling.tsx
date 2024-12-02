import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  DEFAULT_MARGIN,
  STORY_TELLING_CONTENTS,
  STORY_TELLING_LOTTIES,
} from '@constants';
import { Button, Font, L } from '@design-system';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';

export const PageStoryTelling: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const { setValue: setStoryTelling } =
    useAsyncStorage<StorageKeys.StoryTelling>(StorageKeys.StoryTelling);

  const handlePressStart = () => {
    setStoryTelling({
      viewed: true,
    });

    // 무조건 앱을 처음 실행시켰을 때 나오는 화면이므로 Login 화면으로 이동
    return navigation.navigate('Login');
  };

  const handlePrevStep = () => {
    setAutoPlayEnabled(false);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleNextStep = () => {
    setAutoPlayEnabled(false);
    setStep((prev) => Math.min(STORY_TELLING_CONTENTS.length, prev + 1));
  };

  const handlePressCTA = () => {
    if (step === STORY_TELLING_CONTENTS.length) {
      return handlePressStart();
    }
    return handleNextStep();
  };

  useEffect(() => {
    if (!autoPlayEnabled) return;

    const sub = interval(6 * 1000)
      .pipe(take(STORY_TELLING_CONTENTS.length))
      .subscribe((v) => {
        if (v === STORY_TELLING_CONTENTS.length) {
          sub.unsubscribe();
        }
        setStep(v + 1);
      });
    return () => {
      sub.unsubscribe();
    };
  }, [autoPlayEnabled]);

  return (
    <FrameLayout paddingBottom={bottom}>
      <L.Col
        ph={DEFAULT_MARGIN}
        items="center"
        justify="space-between"
        h={'100%'}
        w={'100%'}
      >
        <L.Col w={'100%'} items="center">
          <L.Row items={'center'} mt={24}>
            <ProgressBar progress={step / STORY_TELLING_CONTENTS.length} />
          </L.Row>
          <Font textAlign="center" type={'TITLE2_BOLD'} color={'WHITE'} mt={56}>
            {STORY_TELLING_CONTENTS[step - 1]}
          </Font>
          {!!STORY_TELLING_LOTTIES[step - 1] && (
            <L.Row mt={90}>
              <LottieView
                source={STORY_TELLING_LOTTIES[step - 1]}
                style={{
                  width: 300,
                  height: 300,
                }}
                autoPlay
                renderMode="HARDWARE"
              />
            </L.Row>
          )}
        </L.Col>
        <L.Absolute h="100%">
          <TouchableWithoutFeedback onPress={handlePrevStep}>
            <L.Row w={SCREEN_WIDTH / 2} h="100%" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleNextStep}>
            <L.Row w={SCREEN_WIDTH / 2} h="100%" />
          </TouchableWithoutFeedback>
        </L.Absolute>
        <Button
          type={'action'}
          text={
            step === STORY_TELLING_CONTENTS.length ? '시작하기' : '다음으로'
          }
          onPress={handlePressCTA}
          sizing="stretch"
          bgColor={'LUCK_GREEN'}
          textColor={'BLACK'}
        />
      </L.Col>
    </FrameLayout>
  );
};
