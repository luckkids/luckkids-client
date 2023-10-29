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

export const PageLoginJoinId: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>계정 만들기 (이메일 주소가 무엇인가요?)</S.Text>
      <Button
        type={'action'}
        text={'다음(비밀번호만들기)'}
        onPress={() => props.navigation.navigate(AppScreens.LoginJoinPass)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
