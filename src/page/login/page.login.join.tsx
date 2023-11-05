import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import DeviceInfo from 'react-native-device-info';
import { ComponentLoginJoinId } from '@components/page/login/join/component.login.join.id';
import { ComponentLoginJoinPass } from '@components/page/login/join/component.login.join.pass';

const deviceId = DeviceInfo.getDeviceId();

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const LoginData = {
  email: 'tkdrl8908@naver.com',
  password: '1234',
  deviceId: 'testdeviceId',
  pushKey: deviceId,
};

export const PageLoginJoin: React.FC<IPage> = (props) => {
  console.log(deviceId);
  const [isRegPass, setIsRegPass] = useState<boolean>(false);
  return (
    <FrameLayout>
      <L.Col p={24}>
        {!isRegPass ? (
          <ComponentLoginJoinId regPass={setIsRegPass} />
        ) : (
          <ComponentLoginJoinPass
            navigation={() => props.navigation.navigate(AppScreens.LoginId)}
          />
        )}
      </L.Col>
    </FrameLayout>
  );
};
