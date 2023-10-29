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
      <S.Text>
        나만의 행운 캐릭터 만들기 or 어떤 행운을 갖고 싶어요? or 행운이 찾아오는
        방법을 알고 싶나요?
      </S.Text>
      <S.Button
        title={'시작하기 or 행운 말하기'}
        onPress={() => props.navigation.navigate(AppScreens.TutorialSurvey)}
      />
    </FrameLayout>
  );
};
