import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, SvgIcon, TextInputField } from '@design-system';

interface IProps {
  onSuccess: () => void;
  password: string;
  setPassword: (password: string) => void;
}

export const LoginJoinPass: React.FC<IProps> = ({
  onSuccess,
  password,
  setPassword,
}) => {
  const { bottom } = useSafeAreaInsets();
  const [visiblityMode, setVisiblityMode] = useState(false);

  const isButtonDisabled = password.length < 8;

  const handlePressConfirm = () => {
    if (isButtonDisabled) return;
    onSuccess();
  };

  return (
    <>
      <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
        <TextInputField
          title="비밀번호를 설정해주세요."
          text={password}
          placeholder="Password"
          onChangeText={setPassword}
          description="비밀번호는 8자 이상이 되어야 해요."
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
            text={'설정했어요'}
            onPress={handlePressConfirm}
            status={isButtonDisabled ? 'disabled' : 'normal'}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </>
  );
};
