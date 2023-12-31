import React, { useCallback, useEffect, useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import { useFetch } from '@hooks/useFetch';
import { RecoilJoinInfo } from '@recoil/recoil.join';

export const LoginJoinId: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const [joinInfo, setJoinInfo] = useRecoilState(RecoilJoinInfo);
  const { email } = joinInfo;

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [duplicationPassed, setDuplicationPassed] = useState<boolean>(false);

  // 이메일 중복 체크
  const { onFetch: checkEmail } = useFetch({
    method: 'POST',
    url: '/join/checkEmail',
    value: {
      email,
    },
    onSuccessCallback: () => {
      setDuplicationPassed(true);
    },
    onFailCallback: () => {
      setDuplicationPassed(true);
    },
  });

  // 이메일 전송
  const { resultData, onFetch: sendEmail } = useFetch({
    method: 'POST',
    url: '/mail/authUrl',
    value: {
      email: joinInfo.email,
    },
    onSuccessCallback: () => {
      console.log('이메일 전송 성공');
    },
    onFailCallback: () => {
      console.log('이메일 전송 실패');
    },
  });

  const handleChangeEmail = useCallback(
    (email: string) => {
      setJoinInfo((prev) => ({
        ...prev,
        email,
      }));
      if (isValidEmail) checkEmail();
    },
    [checkEmail, isValidEmail],
  );

  const getErrorMessage = useCallback(() => {
    if (!isValidEmail) return '이메일 형식을 확인해주세요!';
    if (!duplicationPassed) return '이미 등록된 이메일이에요!';
    return '';
  }, [email]);

  const getIsError = useCallback(() => {
    if (!email) return false;
    if (!isValidEmail || !!duplicationPassed) return true;
    return false;
  }, [email]);

  const handleConfirmEmail = useCallback(() => {
    if (getIsError()) return;
    console.log(joinInfo.email);
    sendEmail();
  }, [getIsError, sendEmail, joinInfo]);

  useEffect(() => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(reg.test(email));
  }, [email]);

  return (
    <>
      <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
        <TextInputField
          title={`반가워요!\n먼저 이메일 주소를 입력해주세요.`}
          text={email}
          placeholder="luckkids.official@gmail.com"
          onChangeText={handleChangeEmail}
          keyboardType="email-address"
          errorMessage={getErrorMessage()}
          isError={getIsError()}
          RightComponent={
            getIsError() && (
              <SvgIcon
                name={
                  duplicationPassed ? 'validation_check' : 'validation_error'
                }
                size={20}
              />
            )
          }
        />
      </L.Col>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Row ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            status={getIsError() ? 'disabled' : 'normal'}
            text={'다음'}
            onPress={handleConfirmEmail}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </>
  );
};
