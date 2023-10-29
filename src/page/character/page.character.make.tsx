import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import { Button } from '@design-system';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageCharacterMake: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>나의 럭키즈 만들기</S.Text>
      <Button
        type={'action'}
        text={'시작하기'}
        onPress={() => props.navigation.navigate(AppScreens.CharacterSelect)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
