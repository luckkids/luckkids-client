import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { interval, take } from 'rxjs';
import { DEFAULT_MARGIN, levelup_contents } from '@constants';
import { Button, Font, L } from '@design-system';
import { getCharacterImage } from '@utils';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';

const levelUpMotion1 = require('assets/lotties/levelup-motion-1.json');

export const PageHomeLevel: React.FC = () => {
  const {
    params: { level, type },
  } = useNavigationRoute('HomeLevel');
  const [step, setStep] = useState(1);
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigationService();

  const handleNext = () => {
    navigation.navigate('Home', {});
  };

  const handlePressBack = () => {
    navigation.navigate('Home', {});
  };

  useEffect(() => {
    const subscription = interval(5000)
      .pipe(take(1))
      .subscribe(() => {
        if (step < 2) setStep((prev) => prev + 1);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <FrameLayout
      statusBarColor={'TUTORIAL_SETTING_BG'}
      backgroundColor={'TUTORIAL_SETTING_BG'}
    >
      {/* step 1 : 레벨업 애니메이션 */}
      {step === 1 ? (
        <L.Col mt={60} ph={DEFAULT_MARGIN}>
          <Font type="TITLE1_BOLD" color="WHITE">
            야호!
          </Font>
          <Font type="TITLE1_BOLD" color="WHITE">
            럭키즈가 한단계 성장해요
          </Font>
          <L.Row w={'100%'} justify="center" mt={100}>
            <LottieView
              source={levelUpMotion1}
              style={{
                width: SCREEN_WIDTH - 2 * CHARACTER_MARGIN,
                height: SCREEN_WIDTH - 2 * CHARACTER_MARGIN,
              }}
              autoPlay
            />
          </L.Row>
        </L.Col>
      ) : (
        <L.Col items="center" pt={42} h="100%">
          {/* step 2 : 레벨업 결과 */}
          <Image
            source={{
              uri: getCharacterImage(type, level, 'normal'),
            }}
            style={{
              width: SCREEN_WIDTH - 2 * CHARACTER_MARGIN,
              height: SCREEN_WIDTH - 2 * CHARACTER_MARGIN,
            }}
          />
          <Font type="TITLE2_BOLD" color="WHITE" mt={30}>
            {levelup_contents[level - 1].title}
          </Font>
          <Font type="BODY_REGULAR" color="GREY0" mt={16} textAlign="center">
            {levelup_contents[level - 1].description}
          </Font>
        </L.Col>
      )}
      {step === 2 && (
        <L.Absolute b={bottom} ph={DEFAULT_MARGIN}>
          <Button
            text={'계속하기'}
            onPress={handleNext}
            type={'action'}
            bgColor="LUCK_GREEN"
            sizing="stretch"
          />
        </L.Absolute>
      )}
    </FrameLayout>
  );
};

const CHARACTER_MARGIN = 40;
