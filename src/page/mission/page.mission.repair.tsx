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

export const PageMissionRepair: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>습관을 선택하고 알림을 설정할 수 있어요</S.Text>
      <Button
        type={'action'}
        text={'습관추가'}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
        onPress={() => props.navigation.navigate(AppScreens.MissionAdd)}
      />
      <Button
        type={'action'}
        text={'미션홈'}
        onPress={() => props.navigation.navigate(AppScreens.Mission)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
