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

export const PageCharacterName: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>당신의 삶에 행운을 불러줄 럭키즈! 뭐라고 불러드릴까요?</S.Text>
      <Button
        type={'action'}
        text={'럭키즈 만나기'}
        onPress={() => props.navigation.navigate(AppScreens.MissionRepair)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
      <S.Button title={'로그인하기'} />
    </FrameLayout>
  );
};
