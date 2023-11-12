import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L, SvgIcon, TextInputField } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import DeviceInfo from 'react-native-device-info';
import { useFetch } from '@hooks/useFetch';
import useAsyncEffect from '@hooks/useAsyncEffect';

export const PageLoginId: React.FC<IPage> = ({ navigation }) => {
  const [deviceID, setDeviceID] = useState('');
  useAsyncEffect(async () => {
    try {
      await DeviceInfo.getUniqueId().then(setDeviceID);
    } catch (error) {
      console.error(error);
    }
  }, []);
  const setResult = useCallback(() => {
    return navigation.navigate(AppScreens.LoginRemember);
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

  const [visiblityMode, setVisiblityMode] = useState(false);

  const handlePressForgotPassword = () => {
    //
  };

  return (
    <FrameLayout NavBar={<StackNavbar title={'로그인하기'} useBackButton />}>
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
            text={'로그인하기'}
            onPress={onFetch}
            sizing="stretch"
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
            onPress={() => navigation.navigate(AppScreens.LoginJoin)}
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
