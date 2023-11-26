import React from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageHomeCalendar: React.FC = () => {
  const navigation = useNavigationService();
  return (
    <FrameLayout>
      <S.Text>캘린더</S.Text>
      <Button
        type={'action'}
        text={'홈으로'}
        onPress={() => navigation.navigate('Home')}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
