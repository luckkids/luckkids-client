import React from 'react';
import { Font, L, SvgIcon } from '@design-system';
import { FrameLayout } from '../frame/frame.layout';
import { TouchableWithoutFeedback, View } from 'react-native';
import { AppScreens, IPage } from '@types-common/page.types';
import { GardenItem } from '@components/page/garden/garden.item';
import styled from 'styled-components/native';

const S = {
  listWrap: styled.View({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 25,
  }),
};

export const Garden: React.FC<IPage> = ({ navigation }) => {
  return (
    <FrameLayout>
      <L.Row ph={20} pv={10} justify={'space-between'}>
        <Font type={'TITLE3_SEMIBOLD'} color={'GREY0'}>
          Luck Kids
        </Font>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate(AppScreens.HomeAlarm)}
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
    </FrameLayout>
  );
};
