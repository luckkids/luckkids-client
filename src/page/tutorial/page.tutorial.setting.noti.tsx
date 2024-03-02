import React, { useState } from 'react';
import { Image } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';

//TODO Fix bg image
const bgImage = require('assets/images/tutorial-setting-bg.png');
const exampleImage = require('assets/images/tutorial-setting-noti-example.png');

export const PageTutorialSettingNoti: React.FC = () => {
  const navigation = useNavigationService();
  const [step, setStep] = useState(0);
  const { bottom } = useSafeAreaInsets();

  const { requestPermissionIfNot, hasPermission } = useFirebaseMessage();

  const handleTurnOnNoti = async () => {
    console.log('hasPermission', await hasPermission());
    if (await hasPermission()) {
      AlertPopup.show({
        body: '이미 알림이 허용되어 있어요!',
        yesText: '확인',
        onPressYes: () => {
          navigation.navigate('Home');
        },
      });
    } else {
      requestPermissionIfNot().then(() => {
        navigation.navigate('Home');
      });
    }
  };

  const handleKeepGoing = () => {
    navigation.navigate('Home');
  };

  return (
    <FrameLayout
      statusBarColor={'TUTORIAL_SETTING_BG'}
      backgroundImage={bgImage}
    >
      <L.Col w="100%" items="center" ph={DEFAULT_MARGIN} h="100%">
        <Font textAlign="center" type={'TITLE1_BOLD'} color={'WHITE'} mt={200}>
          {'알림을 허용해주세요!'}
        </Font>
        <Font
          textAlign="center"
          type={'BODY_REGULAR'}
          color={'GREY0'}
          mt={20}
          mb={40}
        >
          습관을 잊지 않도록 도와드릴게요.
        </Font>
        <Image
          source={exampleImage}
          style={{
            width: EXAMPLE_IMAGE_WIDTH,
            height: EXAMPLE_IMAGE_WIDTH * (121 / 340),
          }}
        />
        <L.Absolute b={0} w={SCREEN_WIDTH}>
          <L.Col ph={DEFAULT_MARGIN} g={10} w="100%">
            <Button
              type={'action'}
              text={'네, 알림을 켤게요!'}
              onPress={handleTurnOnNoti}
              sizing="stretch"
              textColor="BLACK"
              bgColor={'LUCK_GREEN'}
            />
            <Button
              type={'action'}
              text={'다음에 할래요'}
              onPress={handleKeepGoing}
              sizing="stretch"
              textColor="LUCK_GREEN"
              bgColor={'TRANSPARENT'}
              outline="LUCK_GREEN"
            />
          </L.Col>
        </L.Absolute>
      </L.Col>
    </FrameLayout>
  );
};

const EXAMPLE_IMAGE_WIDTH = SCREEN_WIDTH - 2 * DEFAULT_MARGIN;
