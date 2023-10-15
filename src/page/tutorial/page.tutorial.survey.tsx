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

export const PageTutorialSurvey: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>당신의 삶에 어떤 행운이 찾아오길 바라나요?</S.Text>
      <S.Button
        title={'행운이 찾아오는 방법 알아보기'}
        onPress={() => props.navigation.navigate(AppScreens.Home)}
      />
    </FrameLayout>
  );
};
