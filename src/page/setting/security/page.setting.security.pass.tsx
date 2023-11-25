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

export const PageSettingSecurityPass: React.FC = () => {
  const navigation = useNavigationService();
  return (
    <FrameLayout>
      <S.Text>비밀번호 변경</S.Text>
      <S.Button
        title={'저장'}
        onPress={() => navigation.navigate('SettingSecurity')}
      />
    </FrameLayout>
  );
};
