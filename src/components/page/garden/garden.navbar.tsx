import React, { useState } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS, Font, L, SvgIcon } from '@design-system';
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
  LeaguePopup: styled.View({
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
  }),
  Dim: styled.View({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(30px)',
    backgroundColor: 'rgba(0,0,0,0.8)',
  }),
  leagueContainer: styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(44,44,44,0.6)',
    borderRadius: 15,
    padding: 25,
  }),
};

export const GardenNavbar = () => {
  const navigation = useNavigationService();
  const [showLeague, setShowLeague] = useState<boolean>(false);
  const [league, setLeague] = useState<Array<IGardenLeagueItem>>([]);
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
            <View>
              <SvgIcon name={'bell_badge'} size={20} />
            </View>
          </TouchableWithoutFeedback>
        </L.Row>
      </L.Row>
      {showLeague && (
        <S.LeaguePopup>
          <S.Dim />
          <L.Col w={'100%'} h={'100%'} mv={25} justify={'center'}>
            <L.Row items={'center'} ml={15} mb={18}>
              <S.Icon>
                <SvgIcon name={'icon_league'} size={22} />
              </S.Icon>
              <Font type={'TITLE_League'}>리그</Font>
            </L.Row>
            <L.Row w={'100%'}>
              <S.leagueContainer>
                <GardenLeagueItem {...league[1]} rank={1} />
                <GardenLeagueItem {...league[0]} rank={0} />
                <GardenLeagueItem {...league[2]} rank={2} />
              </S.leagueContainer>
            </L.Row>
          </L.Col>
        </S.LeaguePopup>
      )}
    </>
  );
};
