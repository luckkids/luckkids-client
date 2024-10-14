import React, { useEffect, useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PageStoryTelling: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();

  const { setValue: setStoryTelling } =
    useAsyncStorage<StorageKeys.StoryTelling>(StorageKeys.StoryTelling);

  const handlePressStart = () => {
    setStoryTelling({
      viewed: true,
    });

    // 무조건 앱을 처음 실행시켰을 때 나오는 화면이므로 Login 화면으로 이동
    return navigation.navigate('Login');
  };

  useEffect(() => {
    const sub = interval(1000)
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
  }, []);

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
          <L.Row items={'center'}>
            <ProgressBar progress={step / STORY_TELLING_CONTENTS.length} />
          </L.Row>
          <Font textAlign="center" type={'TITLE2_BOLD'} color={'WHITE'} mt={76}>
            {STORY_TELLING_CONTENTS[step - 1]}
          </Font>
          {!!STORY_TELLING_LOTTIES[step - 1] && (
            <LottieView
              source={STORY_TELLING_LOTTIES[step - 1]}
              style={{
                width: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
                height: SCREEN_WIDTH - 2 * DEFAULT_MARGIN,
              }}
              autoPlay
            />
          )}
        </L.Col>
        <Button
          type={'action'}
          text={'시작하기'}
          onPress={handlePressStart}
          sizing="stretch"
          bgColor={'LUCK_GREEN'}
          textColor={'BLACK'}
        />
      </L.Col>
    </FrameLayout>
  );
};
