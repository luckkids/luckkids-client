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

export const PageSettingAccount: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>탈퇴하기</S.Text>
      <S.Button
        title={'제출'}
        onPress={() => props.navigation.navigate(AppScreens.Login)}
      />
    </FrameLayout>
  );
};
