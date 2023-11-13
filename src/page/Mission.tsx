import React from 'react';
import styled from 'styled-components/native';
import { Colors, Font, L } from '@design-system';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  item: styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  Title: styled.View({
    display: 'flex',
    flexDirection: 'row',
  }),
  iconRound: styled.View({
    position: 'relative',
    width: '22px',
    height: '22px',
    borderRadius: '22px',
    border: `2px solid ${Colors.GREY1}`,
    marginRight: '16px',
  }),
  dot: styled.View({
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    backgroundColor: Colors.LUCK_GREEN,
  }),
};

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
        <L.Row ph={25} pv={20} justify={'space-between'}>
          <S.Title>
            <S.iconRound>
              <S.dot />
            </S.iconRound>
            <Font type={'BODY_SEMIBOLD'}>자전거타기</Font>
          </S.Title>
          <Font type={'SUBHEADLINE_REGULAR'}>오전 9:00</Font>
        </L.Row>
        <L.Row ph={25} pv={20} justify={'space-between'}>
          <S.Title>
            <S.iconRound>
              <S.dot />
            </S.iconRound>
            <Font type={'BODY_SEMIBOLD'}>자전거타기</Font>
          </S.Title>
          <Font type={'SUBHEADLINE_REGULAR'}>오전 9:00</Font>
        </L.Row>
      </FrameLayout>
      <FloatingButton
        text={'편집'}
        onPress={() => props.navigation.navigate(AppScreens.MissionRepair)}
      />
    </>
  );
};
