import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '../../frame/frame.layout';
import { AppScreens, IPage } from '../../types/common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageTutorial: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>튜토리얼(스토리텔링)</S.Text>
      <S.Button
        title={'바로 로그인 할게요!'}
        onPress={() => props.navigation.navigate(AppScreens.Login)}
      />
    </FrameLayout>
  );
};
