import React from 'react';
import { FrameLayout } from '../../frame/frame.layout';
import styled from 'styled-components/native';
import { AppScreens } from '../../types/common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageTutorialSurvey = ({ navigation }: any) => {
  return (
    <FrameLayout>
      <S.Text>당신의 삶에 어떤 행운이 찾아오길 바라나요?</S.Text>
      <S.Button
        title={'행운이 찾아오는 방법 알아보기'}
        onPress={() => navigation.navigate(AppScreens.Home)}
      />
    </FrameLayout>
  );
};
