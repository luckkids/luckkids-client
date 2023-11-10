import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import useAsyncEffect from '@hooks/useAsyncEffect';
import BootSplash from 'react-native-bootsplash';
import { audit } from 'rxjs';
import { RecoilLoadable, useRecoilValue } from 'recoil';
import error = RecoilLoadable.error;
import DeviceInfo from 'react-native-device-info';
import { UseFetch } from '@hooks/useFetch';
import { RecoilToken } from '@recoil/recoil.token';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageMissionAdd: React.FC<IPage> = (props) => {
  const { onFetch } = UseFetch({
    method: 'GET',
    url: '/api/v1/missions',
  });

  useEffect(() => {
    onFetch();
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
      {/*<Button type={'action'} text={'데이터'} onPress={getData} />*/}
    </FrameLayout>
  );
};
