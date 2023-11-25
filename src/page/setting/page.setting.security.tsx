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

export const PageSettingSecurity: React.FC = () => {
  const navigation = useNavigationService();
  return (
    <FrameLayout>
      <S.Text>비밀번호 및 보안</S.Text>
      <S.Button
        title={'비밀번호변경'}
        onPress={() => navigation.navigate('SettingSecurityPass')}
      />
    </FrameLayout>
  );
};
