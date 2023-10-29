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

export const PageLoginJoinPass: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>비밀번호 만들기</S.Text>
      <Button
        type={'action'}
        text={'가입완료'}
        onPress={() => props.navigation.navigate(AppScreens.LoginId)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
