import React from 'react';
import { Text, View } from 'react-native';
import { Button, Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';

export const Mission: React.FC<IPage> = (props) => {
  return (
    <>
      <FrameLayout>
        <L.Row>
          <Font type={'FOOTNOTE_REGULAR'}>클로버</Font>
          <Font type={'FOOTNOTE_REGULAR'}>+3</Font>
        </L.Row>
        <L.Row p={24} justify={'space-between'}>
          <Font type={'LARGE_TITLE_BOLD'}>미션 달성하기</Font>
          <Font type={'LARGE_TITLE_REGULAR'} color={'LUCK_GREEN'}>
            3/10
          </Font>
        </L.Row>
      </FrameLayout>
      <FloatingButton
        text={'습관편집'}
        onPress={() => props.navigation.navigate(AppScreens.MissionRepair)}
      />
    </>
  );
};
