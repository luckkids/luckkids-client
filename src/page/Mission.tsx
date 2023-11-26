import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Colors, Font, L } from '@design-system';
import ButtonText from '../design-system/components/Button/ButtonText';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

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
    justifyContent: 'center',
    alignItems: 'center',
  }),
  dot: styled.View({
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    backgroundColor: Colors.LUCK_GREEN,
  }),
};

export const Mission: React.FC = () => {
  const [hide, setHide] = useState<boolean>(false);
  const navigation = useNavigationService();

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
        <L.Row ph={24} pt={48} justify={'space-between'}>
          <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
            지금까지 N개 완료했어요!
          </Font>
          <ButtonText
            text={hide ? '보기' : '숨기기'}
            onPress={() => setHide(!hide)}
            fontType={'SUBHEADLINE_REGULAR'}
            textColor={'LUCK_GREEN'}
          />
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
        onPress={() => navigation.navigate('MissionRepair')}
      />
    </>
  );
};
