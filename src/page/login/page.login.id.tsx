import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SvgIcon, TextInputField } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { useFetch } from '@hooks/useFetch';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageLoginId: React.FC = () => {
  const [deviceID, setDeviceID] = useState('');

  const navigation = useNavigationService();

  const setResult = useCallback(() => {
    return navigation.navigate('Home');
  }, []);

  const { onFetch } = useFetch({
    method: 'POST',
    url: '/auth/login',
    value: {
      email: 'test@daum.net',
      password: 'test1234',
      deviceId: deviceID,
      pushKey: 'tessPushKey',
    },
    onSuccessCallback: setResult,
  });

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
    //
  };

  useAsyncEffect(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    setDeviceID(deviceId);
  }, []);

  return (
    <FrameLayout NavBar={<StackNavbar title={'이메일 로그인'} useBackButton />}>
      <L.Col w={'100%'} h={'100%'} justify="space-between" ph={DEFAULT_MARGIN}>
        <L.Col w={'100%'} g={10} mt={40}>
          <TextInputField
            text={loginInfo.email}
            placeholder="luckkids.official@gmail.com"
            onChangeText={(text) =>
              setLoginInfo((prev) => ({ ...prev, email: text }))
            }
          />
          <TextInputField
            text={loginInfo.password}
            placeholder={'Password'}
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
            text={'로그인 할게요'}
            onPress={() => {
              /**
               * TODO: 현재 포스트맨으로도 확인했는데, 500에러 떠서 일단 페이지만 넘어가게 해두었습니다.
               * */
              onFetch();
              navigation.navigate('Home');
            }}
            sizing="stretch"
            status={isButtonDisabled ? 'disabled' : 'normal'}
            bgColor={'LUCK_GREEN'}
          />
          <L.Row mt={10}>
            <TouchableWithoutFeedback onPress={handlePressForgotPassword}>
              <Font type={'SUBHEADLINE_REGULAR'} color={'WHITE'}>
                비밀번호를 잊으셨나요?
              </Font>
            </TouchableWithoutFeedback>
          </L.Row>
        </L.Col>
        <L.Col w={'100%'}>
          <Button
            type={'action'}
            text={'새 계정 만들기'}
            onPress={() => navigation.navigate('LoginJoin')}
            sizing="stretch"
            textColor="LUCK_GREEN"
            bgColor={'TRANSPARENT'}
            outline={'LUCK_GREEN'}
          />
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};
