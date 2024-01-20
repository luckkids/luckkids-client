import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_MARGIN } from '@constants';
import { Button, TextInputField, L, SvgIcon, ButtonText } from '@design-system';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

type ButtonStatus = 'normal' | 'disabled' | 'completed';

export const PageSettingInfoPassword: React.FC = () => {
  const navigation = useNavigationService();
  const [isDisable, setIsDisable] = useState<ButtonStatus>('disabled');
  const [passVisibility, setPassvisibility] = useState<boolean>(true);
  const [currentPass, setCurrentPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [repeatNewPass, setRepeatNewPass] = useState<string>('');
  const [isNotSame, setIsNotSame] = useState<boolean>(true);
  useEffect(() => {
    if (newPass === repeatNewPass) {
      console.log('same!');
      setIsNotSame(false);
    } else {
      setIsNotSame(true);
    }
  }, [newPass, repeatNewPass]);
  return (
    <FrameLayout NavBar={<StackNavBar title={'비밀번호 변경'} useBackButton />}>
      <L.Col
        h={'100%'}
        w={'100%'}
        justify={'space-between'}
        items={'center'}
        ph={DEFAULT_MARGIN}
      >
        <L.Col>
          <TextInputField
            text={currentPass}
            placeholder={'현재 비밀번호'}
            onChangeText={setCurrentPass}
            secureTextEntry={passVisibility}
            RightComponent={
              <TouchableWithoutFeedback
                onPress={() => {
                  setPassvisibility((prev) => !prev);
                }}
              >
                <L.Row>
                  <SvgIcon
                    size={24}
                    name={`password_visibility_${
                      passVisibility ? 'off' : 'on'
                    }`}
                  />
                </L.Row>
              </TouchableWithoutFeedback>
            }
          />
          <TextInputField
            text={newPass}
            placeholder={'새 비밀번호'}
            onChangeText={setNewPass}
            secureTextEntry={passVisibility}
            RightComponent={
              <TouchableWithoutFeedback
                onPress={() => {
                  setPassvisibility((prev) => !prev);
                }}
              >
                <L.Row>
                  <SvgIcon
                    size={24}
                    name={`password_visibility_${
                      passVisibility ? 'off' : 'on'
                    }`}
                  />
                </L.Row>
              </TouchableWithoutFeedback>
            }
          />
          <TextInputField
            text={repeatNewPass}
            placeholder={'새 비밀번호 재입력'}
            onChangeText={setRepeatNewPass}
            secureTextEntry={passVisibility}
            errorMessage={'두 비밀번호가 달라요! 확인해 보시곘어요?'}
            isError={isNotSame}
            RightComponent={
              <TouchableWithoutFeedback
                onPress={() => {
                  setPassvisibility((prev) => !prev);
                }}
              >
                <L.Row>
                  <SvgIcon
                    size={24}
                    name={`password_visibility_${
                      passVisibility ? 'off' : 'on'
                    }`}
                  />
                </L.Row>
              </TouchableWithoutFeedback>
            }
          />
          <L.Col>
            <ButtonText
              onPress={() => console.log('dddd')}
              text={'비밀번호를 잊으셨나요?'}
              fontType={'SUBHEADLINE_REGULAR'}
              textColor={'LUCK_GREEN'}
              cssProp={{ marginTop: 20 }}
            />
          </L.Col>
        </L.Col>
        <L.Col pb={30} w={'100%'}>
          <Button
            type={'action'}
            text={'완료'}
            bgColor={'LUCK_GREEN'}
            status={isDisable}
            sizing={'stretch'}
          />
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};
