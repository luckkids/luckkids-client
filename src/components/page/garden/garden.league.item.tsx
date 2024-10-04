import React, { useMemo } from 'react';
import FastImage from 'react-native-fast-image';
import { Font, L, SvgIcon } from '@design-system';
import { getCharacterImage } from '@utils';
import { IGardenLeagueItem } from '@types-common/page.types';

interface IProps extends IGardenLeagueItem {
  rank: number;
}
export const GardenLeagueItem: React.FC<IProps> = (props) => {
  const setMedal = useMemo(() => {
    switch (props.rank) {
      case 0:
        return <SvgIcon name={'iconMedal1'} size={25} />;
      case 1:
        return <SvgIcon name={'iconMedal2'} size={25} />;
      default:
        return <SvgIcon name={'iconMedal3'} size={25} />;
    }
  }, [props.rank]);

  const characterImageUrl = getCharacterImage(
    props.characterType,
    props.level,
    'normal',
  );

  return (
    <L.Col justify={'center'} items={'center'} g={10}>
      {setMedal}
      <FastImage
        source={{ uri: characterImageUrl }}
        style={{
          width: props.rank === 0 ? 95 : 67,
          height: props.rank === 0 ? 95 : 67,
          marginVertical: 20,
        }}
      />
      <Font type={'SUBTITLE_LEAGUE'}>{props.nickname || '-'}</Font>
      <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
        모은 럭키즈 {props.characterCount}
      </Font>
    </L.Col>
  );
};
