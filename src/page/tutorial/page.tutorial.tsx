import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { DEFAULT_MARGIN, TUTORIAL_CONTENTS } from '@constants';
import { Font, L } from '@design-system';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageTutorial: React.FC<IPage> = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const handlePressSkip = () => {
    navigation.navigate(AppScreens.Login);
  };

  timer(5000)
    .pipe(
      takeWhile(() => step < TUTORIAL_CONTENTS.length),
      tap(() => setStep((prev) => prev + 1)),
    )
    .subscribe();

  return (
    <FrameLayout>
      <L.Row justify="space-between" ph={DEFAULT_MARGIN} items={'center'}>
        <L.Row w={'80%'}>
          <ProgressBar progress={step / TUTORIAL_CONTENTS.length} />
        </L.Row>
        <TouchableWithoutFeedback onPress={handlePressSkip}>
          <L.Row>
            <Font type={'SUBHEADLINE_SEMIBOLD'} color={'WHITE'}>
              넘어가기
            </Font>
          </L.Row>
        </TouchableWithoutFeedback>
      </L.Row>
      <L.Row justify="center" mt={76}>
        <Font textAlign="center" type={'TITLE2_BOLD'} color={'WHITE'}>
          {TUTORIAL_CONTENTS[step - 1]}
        </Font>
      </L.Row>
    </FrameLayout>
  );
};
