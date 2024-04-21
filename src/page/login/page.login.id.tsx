import React, {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import DeviceInfo from 'react-native-device-info';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SvgIcon, TextInputField } from '@design-system';
import { accessTokenStorage, rememberMeStorage } from '@storage';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import LoginRemember from '@components/page/login/remember';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { useFetch } from '@hooks/useFetch';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

export const PageLoginId: React.FC = () => {
  const [deviceID, setDeviceID] = useState('');
  const { bottom } = useSafeAreaInsets();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const emailInput$ = useRef(new Subject<string>()).current;

  const navigation = useNavigationService();

  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const isButtonDisabled = !loginInfo.email || !loginInfo.password;

  const [visiblityMode, setVisiblityMode] = useState(false);

  const handlePressForgotPassword = () => {
    Keyboard.dismiss();
    if (!loginInfo.email) {
      return SnackBar.show({
        leftElement: createElement(SvgIcon, {
          name: 'yellow_info',
          size: 20,
        }),
        title: `아이디를 입력해 주세요.`,
        position: 'bottom',
      });
    }
    return sendTempPassword();
  };

  const onSuccessCallback = () => {
    Keyboard.dismiss();
    const rememberMeInfo = rememberMeStorage.getItem();
    if (!rememberMeInfo) {
      BottomSheet.show({
        component: (
          <LoginRemember
            onClose={() => {
              navigation.navigate('Home');
            }}
            onRemember={() => {
              navigation.navigate('Home');
              rememberMeStorage.setItem({
                email: loginInfo.email,
                password: loginInfo.password,
                deviceId: deviceID,
                pushKey: null,
              });
            }}
          />
        ),
      });
    } else {
      return navigation.navigate('Home');
    }
  };

  const onFailCallback = () => {
    Keyboard.dismiss();
    return SnackBar.show({
      leftElement: createElement(SvgIcon, {
        name: 'yellow_info',
        size: 20,
      }),
      title: `이메일 또는 비밀번호가 잘못 입력되었어요!`,
      position: 'bottom',
      width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
      rounded: 25,
      offsetY: 110,
    });
  };

  const { onFetch: login } = useFetch({
    method: 'POST',
    url: '/auth/login',
    value: {
      email: loginInfo.email,
      password: loginInfo.password,
      deviceId: deviceID,
      pushKey: 'testPushKey',
    },
    onSuccessCallback,
    onFailCallback,
  });

  const handleLogin = () => {
    login();
  };

  const { onFetch: sendTempPassword } = useFetch({
    method: 'POST',
    url: '/mail/password',
    value: {
      email: loginInfo.email,
    },
    onSuccessCallback: (resultData) => {
      console.log('이메일 전송 성공');
      SnackBar.show({
        title: `${resultData.email} 주소로 비밀번호 재설정 이메일이 전송되었습니다.`,
        position: 'bottom',
        width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
        rounded: 25,
        offsetY: 110,
      });
    },
    onFailCallback: () => {
      console.log('이메일 전송 실패');
      SnackBar.show({
        title: `koyrkr@gmail.com 주소로\n비밀번호 재설정 이메일이 전송되었습니다.`,
        position: 'bottom',
        width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
        rounded: 25,
        offsetY: 110,
      });
    },
  });

  useAsyncEffect(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    setDeviceID(deviceId);
  }, []);

  const handleEmailChange = (text: string) => {
    setLoginInfo((prev) => ({ ...prev, email: text }));
    emailInput$.next(text);
  };

  useEffect(() => {
    const subscription = emailInput$
      .pipe(debounceTime(500))
      .subscribe((email) => {
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmail(reg.test(email));
      });

    return () => subscription.unsubscribe();
  }, [emailInput$]);

  return (
    <FrameLayout>
      <StackNavbar title={'이메일 로그인'} useBackButton />
      <L.Col w={'100%'} justify="space-between" ph={DEFAULT_MARGIN}>
        <L.Col w={'100%'} g={10} mt={40}>
          <TextInputField
            text={loginInfo.email}
            placeholder="이메일"
            keyboardType="email-address"
            onChangeText={handleEmailChange}
            RightComponent={
              isValidEmail && <SvgIcon name={'validation_check'} size={20} />
            }
          />
          <TextInputField
            text={loginInfo.password}
            placeholder={'비밀번호'}
            onChangeText={(text) =>
              setLoginInfo((prev) => ({ ...prev, password: text }))
            }
            secureTextEntry={visiblityMode}
            RightComponent={
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
            }
          />
          <Button
            type={'action'}
            text={'로그인'}
            onPress={handleLogin}
            sizing="stretch"
            status={isButtonDisabled ? 'disabled' : 'normal'}
            bgColor={'LUCK_GREEN'}
          />
          <L.Row mt={10}>
            <TouchableWithoutFeedback onPress={handlePressForgotPassword}>
              <Font type={'SUBHEADLINE_REGULAR'} color={'LUCK_GREEN'}>
                비밀번호를 잊으셨나요?
              </Font>
            </TouchableWithoutFeedback>
          </L.Row>
        </L.Col>
      </L.Col>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Row ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            text={'새 계정 만들기'}
            onPress={() =>
              navigation.navigate('LoginJoin', {
                step: 'Id',
              })
            }
            sizing="stretch"
            textColor="LUCK_GREEN"
            bgColor={'TRANSPARENT'}
            outline={'LUCK_GREEN'}
          />
        </L.Row>
      </L.Absolute>
    </FrameLayout>
  );
};
