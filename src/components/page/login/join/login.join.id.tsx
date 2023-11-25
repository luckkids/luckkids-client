import React, { useEffect, useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, ButtonText, L, SvgIcon, TextInputField } from '@design-system';

interface IProps {
  onEmailPass: () => void;
  email: string;
  setEmail: (email: string) => void;
}

export const LoginJoinId: React.FC<IProps> = ({
  onEmailPass,
  email,
  setEmail,
}) => {
  const { bottom } = useSafeAreaInsets();
  // TODO(Gina) isValidEmail이 추가되어야 하는지 아닌지 확인 필요
  // const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [duplicationPassed, setDuplicationPassed] = useState<boolean>(false);
  const isButtonDisabled = !duplicationPassed;

  const handleCheckDuplicate = async () => {
    // TODO(Gina) 중복 체크 api 추가
    setDuplicationPassed(true);
  };

  useEffect(() => {
    setDuplicationPassed(false);

    // const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // setIsValidEmail(reg.test(email));
  }, [email]);

  return (
    <>
      <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
        <TextInputField
          title={`반가워요!\n먼저 이메일 주소를 입력해주세요.`}
          text={email}
          placeholder="luckkids.official@gmail.com"
          onChangeText={setEmail}
          description="럭키즈 이메일 로그인을 할 때 사용하게 될 주소에요!"
          keyboardType="email-address"
          RightComponent={
            !!email && (
              <>
                {!duplicationPassed ? (
                  <ButtonText
                    text={'중복확인'}
                    textColor="LUCK_GREEN"
                    onPress={handleCheckDuplicate}
                  />
                ) : (
                  <SvgIcon name={'validation_check'} size={20} />
                )}
              </>
            )
          }
        />
      </L.Col>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Row ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            status={isButtonDisabled ? 'disabled' : 'normal'}
            text={'입력했어요'}
            onPress={onEmailPass}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </>
  );
};
