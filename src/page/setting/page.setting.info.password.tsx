import React, { createElement, useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState, useRecoilValue } from 'recoil';
import { of } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { DEFAULT_MARGIN } from '@constants';
import { Button, TextInputField, L, SvgIcon, ButtonText } from '@design-system';
import { useMe } from '@queries';
import { authApis } from '@apis/auth';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { useFetch } from '@hooks/useFetch';
import { RecoilLoignInfo } from '@recoil/recoil.login';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageSettingInfoPassword: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  const [passVisibility, setPassVisibility] = useState<boolean>(false);
  const [currentPass, setCurrentPass] = useState<string>('');
  const [currentPassError, setCurrentPassError] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');
  const [newPassError, setNewPassError] = useState<string>('');
  const [repeatNewPass, setRepeatNewPass] = useState<string>('');
  const [repeatNewPassError, setRepeatNewPassError] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { data: me } = useMe();
  const { email = '' } = me || {};
  const navigation = useNavigationService();
  const [savedLoginInfo, setSavedLoginInfo] = useRecoilState(RecoilLoignInfo);

  useEffect(() => {
    const newPassSubscription = of(newPass)
      .pipe(
        debounceTime(300),
        switchMap((pass) => {
          if (pass && pass.length < 8) {
            setNewPassError('8자 이상이 되어야 해요!');
            return of(false);
          } else {
            setNewPassError('');
            return of(true);
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      )
      .subscribe();

    const repeatNewPassSubscription = of([newPass, repeatNewPass])
      .pipe(
        debounceTime(300),
        switchMap(([newPass, repeatNewPass]) => {
          if (!newPassError && repeatNewPass && newPass !== repeatNewPass) {
            setRepeatNewPassError('두 비밀번호가 달라요! 확인해 보시겠어요?');
            return of(false);
          } else {
            setRepeatNewPassError('');
            return of(true);
          }
        }),
        catchError((err) => {
          console.error(err);
          return of(false);
        }),
      )
      .subscribe();

    setIsDisabled(
      !currentPass ||
        newPassError !== '' ||
        repeatNewPassError !== '' ||
        newPass.length < 8 ||
        repeatNewPass !== newPass,
    );

    return () => {
      newPassSubscription.unsubscribe();
      repeatNewPassSubscription.unsubscribe();
    };
  }, [newPass, repeatNewPass, currentPass, newPassError, repeatNewPassError]);

  const togglePasswordVisibility = () => {
    setPassVisibility((prev) => !prev);
  };

  const handleConfirm = async () => {
    if (!isDisabled) {
      // 가입한 snsType 판별 시작
      //TODO(Gina): post로 백엔드에서 변경되면 다시 테스트 필요
      authApis
        .findEmail({
          email,
        })
        .then(async (res) => {
          // snsType : NORMAL 조회 성공 후
          const { snsType } = res;
          if (snsType === 'NORMAL') {
            // 현재 비밀번호 틀린 경우
            if (savedLoginInfo.password !== currentPass) {
              setCurrentPassError('이전 비밀번호가 일치하지 않아요!');
              return;
            }
            // 비밀번호 재설정 진행
            const { email: emailRes } = await authApis.resetPassword({
              email,
              password: newPass,
            });

            if (emailRes) {
              setSavedLoginInfo({
                ...savedLoginInfo,
                password: newPass,
              });

              SnackBar.show({
                leftElement: createElement(SvgIcon, {
                  name: 'lucky_check',
                  size: 20,
                }),
                title: `비밀번호가 변경되었어요!.`,
                width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
                position: 'bottom',
                rounded: 25,
              });

              navigation.navigate('Setting');
            } else {
              // TODO(Gina): oauthLogin을 한 유저는 비밀번호 재설정 안됨
            }
          }
        })
        .catch((error) => {
          console.error('findEmail Error', error);
        });
    }
  };

  const { onFetch: sendTempPassword } = useFetch({
    method: 'POST',
    url: '/mail/password',
    value: {
      email,
    },
    onSuccessCallback: (resultData) => {
      console.log('이메일 전송 성공');
      SnackBar.show({
        title: `${resultData.email} 주소로 임시 비밀번호가 전송되었습니다.`,
        position: 'bottom',
        width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
        rounded: 25,
        offsetY: 110,
      });
    },
    onFailCallback: () => {
      console.log('이메일 전송 실패');
      SnackBar.show({
        title: `이메일 전송에 실패했습니다. 다시 시도해 주세요.`,
        position: 'bottom',
        width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
        rounded: 25,
        offsetY: 110,
      });
    },
  });

  const handlePressForgotPassword = () => {
    Keyboard.dismiss();
    return sendTempPassword();
  };

  return (
    <FrameLayout NavBar={<StackNavBar title={'비밀번호 변경'} useBackButton />}>
      <L.Col h={'100%'} w={'100%'} items={'center'} ph={DEFAULT_MARGIN} g={10}>
        <TextInputField
          text={currentPass}
          placeholder={'현재 비밀번호'}
          onChangeText={(text) => {
            setCurrentPass(text);
            setCurrentPassError('');
          }}
          secureTextEntry={!passVisibility}
          errorMessage={currentPassError}
          isError={currentPassError !== ''}
          RightComponent={
            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
              <L.Row>
                <SvgIcon
                  size={24}
                  name={`password_visibility_${passVisibility ? 'off' : 'on'}`}
                />
              </L.Row>
            </TouchableWithoutFeedback>
          }
        />
        <TextInputField
          text={newPass}
          placeholder={'새 비밀번호'}
          onChangeText={setNewPass}
          secureTextEntry={!passVisibility}
          errorMessage={newPassError}
          isError={newPassError !== ''}
          RightComponent={
            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
              <L.Row>
                <SvgIcon
                  size={24}
                  name={`password_visibility_${passVisibility ? 'off' : 'on'}`}
                />
              </L.Row>
            </TouchableWithoutFeedback>
          }
        />
        <TextInputField
          text={repeatNewPass}
          placeholder={'새 비밀번호 재입력'}
          onChangeText={setRepeatNewPass}
          secureTextEntry={!passVisibility}
          errorMessage={repeatNewPassError}
          isError={repeatNewPassError !== ''}
          RightComponent={
            <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
              <L.Row>
                <SvgIcon
                  size={24}
                  name={`password_visibility_${passVisibility ? 'off' : 'on'}`}
                />
              </L.Row>
            </TouchableWithoutFeedback>
          }
        />
        <L.Col items="flex-start" w="100%">
          <ButtonText
            onPress={handlePressForgotPassword}
            text={'비밀번호를 잊으셨나요?'}
            fontType={'SUBHEADLINE_REGULAR'}
            textColor={'LUCK_GREEN'}
            cssProp={{ marginTop: 20 }}
          />
        </L.Col>
      </L.Col>
      <L.Absolute b={bottom} ph={DEFAULT_MARGIN}>
        <Button
          type={'action'}
          text={'완료'}
          bgColor={'LUCK_GREEN'}
          status={isDisabled ? 'disabled' : 'normal'}
          sizing={'stretch'}
          onPress={handleConfirm}
        />
      </L.Absolute>
    </FrameLayout>
  );
};
