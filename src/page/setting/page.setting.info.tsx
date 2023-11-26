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

export const PageSettingInfo: React.FC = () => {
  const navigation = useNavigationService();

  return (
    <FrameLayout>
      <S.Text>계정</S.Text>
      <S.Button
        title={'뒤로가기'}
        onPress={() => navigation.navigate('Setting')}
      />
    </FrameLayout>
  );
};
