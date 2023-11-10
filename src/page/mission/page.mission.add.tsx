import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import useAsyncEffect from '@hooks/useAsyncEffect';
import BootSplash from 'react-native-bootsplash';
import { audit } from 'rxjs';
import { RecoilLoadable } from 'recoil';
import error = RecoilLoadable.error;
import DeviceInfo from 'react-native-device-info';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageMissionAdd: React.FC<IPage> = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [deviceID, setDeviceID] = useState('');
  useEffect(() => {
    DeviceInfo.getUniqueId().then((uniqueId) => {
      setDeviceID(uniqueId);
    });
  }, []);
  const getData = useCallback(() => {
    const loadData = async () => {
      try {
        const rtnData = await fetch(
          'http://218.155.95.66:8777/api/v1/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'test@daum.net',
              password: 'test1234',
              deviceId: 'testdeviceId',
              pushKey: 'tessPushKey',
            }),
          },
        );

        return await rtnData.json();
      } catch (e) {
        return false;
      }
    };

    loadData().then((rtnData) => {
      console.log(rtnData);
    });
  }, []);
  return (
    <FrameLayout>
      <S.Text>습관추가</S.Text>
      <Button
        type={'action'}
        text={'추가하기'}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
        onPress={() => props.navigation.navigate(AppScreens.MissionRepair)}
      />
      <Button type={'action'} text={'데이터'} onPress={getData} />
    </FrameLayout>
  );
};
