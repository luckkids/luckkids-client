import React from 'react';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageLoginRemember: React.FC<IPage> = ({ navigation }) => {
  const handlePressYes = () => {};

  const handlePressNo = () => {
    navigation.navigate(AppScreens.CharacterMake);
  };

  return (
    <FrameLayout>
      <L.Col w={'100%'} h={'100%'} justify="space-between" ph={DEFAULT_MARGIN}>
        <L.Col w={'100%'} mt={60} items="center">
          <L.Col g={10} items="center">
            <Font type={'TITLE2_BOLD'}>다음부터 자동으로 로그인할까요?</Font>
            <Font type={'BODY_REGULAR'}>설정에서 언제든 변경할 수 있어요.</Font>
          </L.Col>
          {/* 자동 로그인 추가 */}
          <L.Row bg={'BG_TERTIARY'} mt={160} w={108} h={108} />
        </L.Col>
        <L.Col w={'100%'} g={10}>
          <Button
            type={'action'}
            text={'네, 좋아요'}
            onPress={handlePressYes}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
          <Button
            type={'action'}
            text={'다음에 할게요'}
            onPress={handlePressNo}
            sizing="stretch"
            textColor="LUCK_GREEN"
            bgColor={'TRANSPARENT'}
            outline={'LUCK_GREEN'}
          />
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};
