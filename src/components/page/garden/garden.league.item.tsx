import React, { useMemo } from 'react';
import { Font, L, SvgIcon } from '@design-system';
import { IGardenItem, IGardenLeagueItem } from '@types-common/page.types';
import { Image } from 'react-native';

interface IProps extends IGardenLeagueItem {
  rank: number;
}
export const GardenLeagueItem: React.FC<IProps> = (props) => {
  const setMedal = useMemo(() => {
    switch (props.rank) {
      case 0:
        return <SvgIcon name={'iconMedal1'} size={20} />;
      case 1:
        return <SvgIcon name={'iconMedal2'} size={20} />;
      default:
        return <SvgIcon name={'iconMedal3'} size={20} />;
    }
  }, [props.rank]);
  return (
    <L.Col justify={'center'} items={'center'}>
      {setMedal}
      <Image
        source={{ uri: props.imageFileUrl }}
        style={{
          width: props.rank === 0 ? 95 : 67,
          height: props.rank === 0 ? 95 : 67,
          marginVertical: 20,
        }}
      />
      <Font type={'SUBTITLE_LEAGUE'}>{props.nickname}</Font>
      <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
        {props.characterCount}네잎
      </Font>
    </L.Col>
  );
};
