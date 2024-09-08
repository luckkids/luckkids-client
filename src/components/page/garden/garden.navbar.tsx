import React, { useState } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L, SvgIcon } from '@design-system';
import { useHomeInfo } from '@queries';
import Colors from '../../../design-system/colors';
import { GardenLeagueItem } from '@components/page/garden/garden.league.item';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { IGardenLeagueItem } from '@types-common/page.types';

const S = {
  Icon: styled.View({
    width: 42,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.GREY5,
    borderRadius: 42,
    overflow: 'hidden',
  }),
};

export const GardenNavbar = () => {
  const navigation = useNavigationService();
  const [showLeague, setShowLeague] = useState<boolean>(false);
  const [league, setLeague] = useState<Array<IGardenLeagueItem>>([]);

  const { data: homeInfo } = useHomeInfo();
  const { hasUncheckedAlerts } = homeInfo || {};

  const { onFetch: onGardenLeague } = useFetch({
    method: 'GET',
    url: '/garden/league',
    value: {},
    onSuccessCallback: (rtn) => setLeague(rtn),
  });

  return (
    <>
      <L.Row
        ph={20}
        pv={10}
        justify={'space-between'}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Image
          source={require('@design-system/assets/images/nav-logo.png')}
          style={{
            resizeMode: 'contain',
            width: 113,
            height: 20,
          }}
        />
        <L.Row g={25}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowLeague(!showLeague);
              if (!showLeague) onGardenLeague();
            }}
          >
            <View>
              <SvgIcon name={'icon_league'} size={20} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('HomeAlarm')}
          >
            <L.Row items="center">
              <SvgIcon
                name={hasUncheckedAlerts ? 'bell_badge' : 'bell_white'}
                size={20}
                color="WHITE"
              />
            </L.Row>
          </TouchableWithoutFeedback>
        </L.Row>
      </L.Row>
      {showLeague && (
        <L.Absolute
          t={0}
          w="100%"
          h="100%"
          r={0}
          z={1}
          justify={'center'}
          ph={DEFAULT_MARGIN}
          items="center"
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <L.Col w={'100%'} h={'100%'} mv={25} justify={'center'}>
            <L.Row items={'center'} ml={15} mb={18} g={13}>
              <S.Icon>
                <SvgIcon name={'icon_league'} size={22} />
              </S.Icon>
              <Font type={'TITLE_League'}>리그</Font>
            </L.Row>
            <L.Row
              justify="space-between"
              w="100%"
              rounded={15}
              p={25}
              items="flex-end"
              style={{
                backgroundColor: 'rgba(44,44,44,0.6)',
              }}
            >
              <GardenLeagueItem {...league[1]} rank={1} />
              <GardenLeagueItem {...league[0]} rank={0} />
              <GardenLeagueItem {...league[2]} rank={2} />
            </L.Row>
          </L.Col>
        </L.Absolute>
      )}
    </>
  );
};
