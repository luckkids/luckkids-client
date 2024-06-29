import React, { useCallback, useEffect, useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import { authApis } from '@apis/auth';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { RecoilJoinInfo } from '@recoil/recoil.join';
import { Subject } from 'rxjs';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';

// TODO(Gina): 이메일 중복 체크 로직 확인 (sns도)
export const LoginJoinId: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const [joinInfo, setJoinInfo] = useRecoilState(RecoilJoinInfo);
  const { email } = joinInfo;

  const [email$] = useState(() => new Subject<string>());

  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [duplicationPassed, setDuplicationPassed] = useState<boolean>(false);
  const navigation = useNavigationService();

  const handleSendEmail = async () => {
    const res = await authApis.sendEmail(joinInfo.email);
    return res.authKey;
  };

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

  const resetState = useCallback(() => {
    setJoinInfo((prev) => ({ ...prev, email: '' }));
    setIsValidEmail(false);
    setDuplicationPassed(false);
  }, [setJoinInfo]);

  const handleConfirmEmail = useCallback(async () => {
    LoadingIndicator.show({});
    if (getIsError()) return;
    const authKey = await handleSendEmail();
    if (authKey) {
      LoadingIndicator.hide();
      return navigation.navigate('LoginJoinEmailConfirm', {
        authKey,
      });
    }
  }, [getIsError, handleSendEmail]);

  useEffect(() => {
    const subscription = email$
      .pipe(
        debounceTime(300),
        switchMap((email) => {
          const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const isValid = reg.test(email);
          setIsValidEmail(isValid);

          if (isValid) {
            console.log(63, email);
            return authApis.checkEmail(email);
          } else {
            return Promise.resolve({ isDuplicate: false });
          }
        }),
      )
      .subscribe({
        next: (result) => {
          console.log('Email check result:', result);
          setDuplicationPassed(!result.isDuplicate);
        },
        error: (error) => {
          console.error('Email check error:', error);
          AlertPopup.show({
            title: '이메일 확인 에러',
            body: error.response.data.message,
            yesText: '확인',
          });
          resetState();
        },
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleChangeEmail = useCallback((email: string) => {
    console.log('handleChangeEmail', email);
    setJoinInfo((prev) => ({
      ...prev,
      email,
    }));

    email$.next(email);
  }, []);

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
            status={getIsError() || !email ? 'disabled' : 'normal'}
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
