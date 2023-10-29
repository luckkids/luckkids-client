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

export const PageHomeLevel: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>두군두근, 럭키즈가 한단계 성장해요!</S.Text>
      <Button
        type={'action'}
        text={'홈으로'}
        onPress={() => props.navigation.navigate(AppScreens.Home)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
