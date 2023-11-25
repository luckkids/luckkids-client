import React, { useState } from 'react';
import { timer } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { DEFAULT_MARGIN, STORY_TELLING_CONTENTS } from '@constants';
import { Button, Font, L } from '@design-system';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageStoryTelling: React.FC<IPage> = ({ navigation }) => {
  const [step, setStep] = useState(1);

  timer(5000)
    .pipe(
      takeWhile(() => step < STORY_TELLING_CONTENTS.length),
      tap(() => setStep((prev) => prev + 1)),
    )
    .subscribe();

  const handlePressStart = () => {
    navigation.navigate(AppScreens.Login);
  };

  return (
    <FrameLayout>
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
