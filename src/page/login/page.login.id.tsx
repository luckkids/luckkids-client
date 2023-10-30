import React from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageLoginId: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>로그인 하기</S.Text>
      <Button
        type={'action'}
        text={'로그인하기'}
        onPress={() => props.navigation.navigate(AppScreens.CharacterMake)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
      <Button
        type={'action'}
        text={'새 계정 만들기'}
        onPress={() => props.navigation.navigate(AppScreens.LoginId)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
