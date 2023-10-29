import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageSettingAlarm: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>알람을 켜주세요</S.Text>
      <S.Button
        title={'뒤로가기'}
        onPress={() => props.navigation.navigate(AppScreens.Setting)}
      />
    </FrameLayout>
  );
};
