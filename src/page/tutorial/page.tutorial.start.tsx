import React from 'react';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

//TODO Fix bg image
const bgImage = require('assets/images/home-bg.png');

export const PageTutorialStart: React.FC = () => {
  const navigation = useNavigationService();

  const handlePressStart = () => {
    navigation.navigate('TutorialGuide');
  };

  return (
    <FrameLayout statusBarColor={'HOME_BG'} backgroundColor="WHITE">
      <L.Col
        w="100%"
        items="center"
        ph={DEFAULT_MARGIN}
        justify="space-between"
        h="100%"
      >
        <Font textAlign="center" type={'TITLE2_BOLD'} color={'BLACK'} mt={76}>
          {'이제, 럭키즈를 시작합니다!\n사용법을 알려 드릴게요.'}
        </Font>
        <Button
          type={'action'}
          text={'30초만에 훑어보기'}
          onPress={handlePressStart}
          sizing="stretch"
          bgColor={'LUCK_GREEN'}
          textColor={'BLACK'}
        />
      </L.Col>
    </FrameLayout>
  );
};
