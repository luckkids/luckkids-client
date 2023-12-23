import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Font, L, SvgIcon } from '@design-system';
import { GardenItem } from '@components/page/garden/garden.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';

const S = {
  listWrap: styled.View({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    rowGap: 8,
    paddingHorizontal: 17,
  }),
};

export const Garden: React.FC = () => {
  const navigation = useNavigationService();
  return (
    <FrameLayout>
      <L.Row ph={20} pv={10} justify={'space-between'}>
        <Font type={'TITLE3_SEMIBOLD'} color={'GREY0'}>
          Luck Kids
        </Font>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('HomeAlarm')}
        >
          <SvgIcon name={'bell_badge'} size={20} />
        </TouchableWithoutFeedback>
      </L.Row>
      <L.Row pt={20} pb={24} ph={25} justify={'space-between'}>
        <Font type={'TITLE1_BOLD'}>가든</Font>
        <TouchableWithoutFeedback onPress={() => console.log('ranking')}>
          <SvgIcon name={'album'} size={22} />
        </TouchableWithoutFeedback>
      </L.Row>
      <S.listWrap>
        <GardenItem onPress={() => console.log('list')} />
        <GardenItem onPress={() => console.log('list')} />
        <GardenItem onPress={() => console.log('list')} />
        <GardenItem onPress={() => console.log('list')} />
      </S.listWrap>
      <FloatingButton
        text={'친구를 초대 할게요'}
        onPress={() => console.log('친구초대')}
        paddingBottom={35}
      />
    </FrameLayout>
  );
};
