import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import { RecoilJoinInfo } from '@recoil/recoil.join';

interface IProps {
  onSuccess: () => void;
}

export const LoginJoinPass: React.FC<IProps> = ({ onSuccess }) => {
  const { bottom } = useSafeAreaInsets();
  const [visiblityMode, setVisiblityMode] = useState(false);
  const [joinInfo, setJoinInfo] = useRecoilState(RecoilJoinInfo);
  const { password } = joinInfo;
  const setPassword = (password: string) => {
    setJoinInfo((prev) => ({
      ...prev,
      password,
    }));
  };

  const [isError, setIsError] = useState(false);

  const handlePressConfirm = () => {
    if (!password) {
      setIsError(true);
      return;
    }
    if (isError) return;
    onSuccess();
  };

  useEffect(() => {
    if (!password) return;
    setIsError(password.length < 8);
  }, [password]);

  return (
    <>
      <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
        <TextInputField
          title="비밀번호를 설정해주세요."
          text={password}
          placeholder="8자 이상 입력해주세요"
          onChangeText={setPassword}
          secureTextEntry={visiblityMode}
          isError={isError}
          errorMessage="8자 이상이 되어야 해요!"
          RightComponent={
            <>
              {isError && <SvgIcon name={'validation_error'} size={20} />}
              {!!password && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setVisiblityMode((prev) => !prev);
                  }}
                >
                  <L.Row>
                    <SvgIcon
                      size={24}
                      name={`password_visibility_${
                        visiblityMode ? 'off' : 'on'
                      }`}
                    />
                  </L.Row>
                </TouchableWithoutFeedback>
              )}
            </>
          }
        />
      </L.Col>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Row ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            text={'다음'}
            onPress={handlePressConfirm}
            status={isError ? 'disabled' : 'normal'}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </>
  );
};
