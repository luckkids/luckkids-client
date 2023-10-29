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

export const PageHomeAlarm: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>알림 (push)</S.Text>
      <S.Text>알림을 놓치지 마세요!</S.Text>
      <S.Text>새로운 미션이 추가 되었습니다 (13시간전)</S.Text>
      <S.Text>새로운 미션이 추가 되었습니다 (13시간전)</S.Text>
      <S.Text>새로운 미션이 추가 되었습니다 (13시간전)</S.Text>
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
