import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageLogin: React.FC<IPage> = ({ navigation }) => {
  const handlePressKakao = () => {};
  const handlePressGoogle = () => {};
  const handlePressApple = () => {};

  const handlePressJoin = () => {
    navigation.navigate(AppScreens.LoginJoin);
  };

  const handlePressLogin = () => {
    navigation.navigate(AppScreens.LoginId);
  };

  const { bottom } = useSafeAreaInsets();

  return (
    <FrameLayout>
      <L.Absolute b={bottom + 60} w={'100%'}>
        <L.Col w={'100%'} items="center">
          <L.Col mb={60} items="center">
            {/* 로고 추가 */}
            <Font type={'LARGE_TITLE_BOLD'}>Luck Kids</Font>
          </L.Col>
          <L.Col ph={DEFAULT_MARGIN} g={10} w={'100%'}>
            <Button
              status={'normal'}
              bgColor={'BG_TERTIARY'}
              text={'카카오톡으로 계속하기'}
              textColor="WHITE"
              onPress={handlePressKakao}
              type={'action'}
              sizing="stretch"
            />
            <Button
              status={'normal'}
              bgColor={'BG_TERTIARY'}
              text={'구글로 계속하기'}
              textColor="WHITE"
              onPress={handlePressGoogle}
              type={'action'}
              sizing="stretch"
            />
            <Button
              status={'normal'}
              bgColor={'BG_TERTIARY'}
              text={'애플 계속하기'}
              textColor="WHITE"
              onPress={handlePressApple}
              type={'action'}
              sizing="stretch"
            />
          </L.Col>
          <L.Row justify="center" g={20} w={'100%'} mt={30}>
            <TouchableWithoutFeedback onPress={handlePressJoin}>
              <Font type={'SUBHEADLINE_SEMIBOLD'} color={'WHITE'}>
                가입하기
              </Font>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handlePressLogin}>
              <Font type={'SUBHEADLINE_SEMIBOLD'} color={'WHITE'}>
                로그인하기
              </Font>
            </TouchableWithoutFeedback>
          </L.Row>
        </L.Col>
      </L.Absolute>
    </FrameLayout>
  );
};
