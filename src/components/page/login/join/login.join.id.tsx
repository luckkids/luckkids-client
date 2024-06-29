import React, { useCallback, useEffect, useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import { authApis } from '@apis/auth';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilJoinInfo } from '@recoil/recoil.join';

const socialTypeValues = {
  APPLE: 'APPLE',
  KAKAO: 'KAKAO',
  GOOGLE: 'GOOGLE',
  NORMAL: 'NORMAL',
} as const;

export const LoginJoinId: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const [joinInfo, setJoinInfo] = useRecoilState(RecoilJoinInfo);
  const { email } = joinInfo;

  const [email$] = useState(() => new Subject<string>());
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);

  const navigation = useNavigationService();

  const handleSendEmail = async () => {
    const res = await authApis.sendEmail(joinInfo.email);
    return res.authKey;
  };

  const getErrorMessage = useCallback(() => {
    if (!isValidEmail) return '이메일 형식을 확인해주세요!';
    if (isDuplicate) return '이미 등록된 이메일입니다!';
    return '';
  }, [isValidEmail, isDuplicate]);

  const getIsError = useCallback(() => {
    if (!email) return false;
    return !isValidEmail || isDuplicate;
  }, [email, isValidEmail, isDuplicate]);

  const handleConfirmEmail = useCallback(async () => {
    if (!email || !isValidEmail) return;

    LoadingIndicator.show({});
    try {
      // 이메일 중복 체크
      await authApis.checkEmail(email);

      // 이메일 인증 키 발송
      const authKey = await handleSendEmail();

      LoadingIndicator.hide();
      if (authKey) {
        navigation.navigate('LoginJoinEmailConfirm', { authKey });
      }
    } catch (error: any) {
      LoadingIndicator.hide();
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (Object.values(socialTypeValues).includes(message)) {
          if (message === 'NORMAL') {
            setIsDuplicate(true);
          } else {
            navigation.push('LoginAlready', { type: message });
          }
        } else {
          AlertPopup.show({
            title: '이메일 확인 에러',
            body: message,
            yesText: '확인',
          });
        }
      } else {
        AlertPopup.show({
          title: '이메일 전송 실패',
          body: '이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.',
          yesText: '확인',
        });
      }
    }
  }, [email, isValidEmail, navigation]);

  useEffect(() => {
    const subscription = email$.pipe(debounceTime(300)).subscribe((email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setIsValidEmail(emailRegex.test(email));
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleChangeEmail = useCallback(
    (email: string) => {
      setJoinInfo((prev) => ({
        ...prev,
        email,
      }));
      email$.next(email);
    },
    [setJoinInfo],
  );

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
            email &&
            isValidEmail && (
              <SvgIcon
                name={isDuplicate ? 'validation_error' : 'validation_check'}
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
            status={!email || !isValidEmail ? 'disabled' : 'normal'}
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
