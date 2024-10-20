import React from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bgImage = require('assets/images/tutorial-start-bg.png');

export const PageTutorialStart: React.FC = () => {
  const navigation = useNavigationService();
  const { bottom } = useSafeAreaInsets();

  const handlePressStart = () => {
    navigation.navigate('TutorialGuide');
  };

  return (
    <FrameLayout
      backgroundColor="WHITE"
      backgroundImage={bgImage}
      stickToTop
      paddingBottom={bottom}
      backgroundImageStyle={{
        height: (SCREEN_WIDTH * 850) / 390,
      }}
    >
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
