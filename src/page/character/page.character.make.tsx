import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageCharacterMake: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>Luck Kids(로그인메인)</S.Text>
      <S.Button
        title={'가입하기'}
        onPress={() => props.navigation.navigate('page.login.join')}
      />
      <S.Button title={'로그인하기'} />
    </FrameLayout>
  );
};
