import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayoutKeyboard } from '@frame/frame.layout.keyboard';
import { AppScreens, IPage } from '@types-common/page.types';

export const PageLoginJoinPass: React.FC<IPage> = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [visiblityMode, setVisiblityMode] = useState(false);

  const { bottom } = useSafeAreaInsets();

  const handleNext = () => {
    // TODO 약관 동의 바텀시트

    // 약관 동의 모두 끝나면 로그인 화면으로 이동
    navigation.navigate(AppScreens.LoginId);
  };

  return (
    <FrameLayoutKeyboard>
      <StackNavbar title={'계정 만들기'} useBackButton />
      <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
        <TextInputField
          title="비밀번호 만들기"
          text={password}
          placeholder="Password"
          onChangeText={setPassword}
          description="8자 이상을 사용하세요."
          secureTextEntry={visiblityMode}
          RightComponent={
            !!password && (
              <TouchableWithoutFeedback
                onPress={() => {
                  setVisiblityMode((prev) => !prev);
                }}
              >
                <L.Row>
                  <SvgIcon
                    size={24}
                    name={`password_visibility_${visiblityMode ? 'off' : 'on'}`}
                  />
                </L.Row>
              </TouchableWithoutFeedback>
            )
          }
        />
      </L.Col>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Row ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            text={'계정 만들기'}
            onPress={handleNext}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </FrameLayoutKeyboard>
  );
};
