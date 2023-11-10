import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { L } from '@design-system';
import { ComponentLoginJoinId } from '@components/page/login/join/component.login.join.id';
import { ComponentLoginJoinPass } from '@components/page/login/join/component.login.join.pass';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const deviceId = DeviceInfo.getDeviceId();

export const LoginData = {
  email: 'tkdrl8908@naver.com',
  password: '1234',
  deviceId: 'testdeviceId',
  pushKey: deviceId,
};

export const PageLoginJoin: React.FC<IPage> = (props) => {
  const [isRegPass, setIsRegPass] = useState<boolean>(false);
  return (
    <>
      {!isRegPass ? (
        <ComponentLoginJoinId regPass={setIsRegPass} />
      ) : (
        <ComponentLoginJoinPass
          navigation={() => props.navigation.navigate(AppScreens.LoginId)}
        />
      )}
    </>
  );
};
