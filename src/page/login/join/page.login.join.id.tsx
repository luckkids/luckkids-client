import React, { useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, TextInputField } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayoutKeyboard } from '@frame/frame.layout.keyboard';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageLoginJoinId: React.FC<IPage> = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const { bottom } = useSafeAreaInsets();

  const handleNext = () => {
    navigation.navigate(AppScreens.LoginJoinPass);
  };

  // 중복확인 여부 추가

  return (
    <FrameLayoutKeyboard>
      <StackNavbar title={'계정 만들기'} useBackButton />
      <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
        <TextInputField
          title="이메일 주소가 무엇인가요?"
          text={email}
          placeholder="luckkids.official@gmail.com"
          onChangeText={setEmail}
          description="나중에 이 이메일 주소를 확인해야 합니다."
        />
      </L.Col>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Row ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            text={'다음'}
            onPress={handleNext}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </FrameLayoutKeyboard>
  );
};
