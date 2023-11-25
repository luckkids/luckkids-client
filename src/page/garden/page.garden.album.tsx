import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageGardenAlbum: React.FC = () => {
  const navigation = useNavigationService();
  return (
    <FrameLayout>
      <S.Text>Luck Kids(로그인메인)</S.Text>
      <S.Button
        title={'가입하기'}
        onPress={() => navigation.navigate('LoginJoin')}
      />
      <S.Button title={'로그인하기'} />
    </FrameLayout>
  );
};
