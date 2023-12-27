import React from 'react';
import { ImageSourcePropType, ImageURISource } from 'react-native';
import styled from 'styled-components/native';
import { Font } from '@design-system';
import Colors from '../../../design-system/colors';

interface IGardenPopup {
  title: string;
  img: {
    uri: string;
    name: string;
  };
  level: number;
}

const S = {
  popupWrap: styled.Modal({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9,
  }),
  imgWrap: styled.View({}),
  imgEl: styled.Image({}),
  imgCaption: styled.View({}),
  progressBarWrap: styled.View({
    paddingVertical: 25,
    height: 8,
    borderRadius: 4,
  }),
  progressBarBg: styled.View({
    width: '100%',
    height: '100%',
    backgroundColor: Colors.LUCK_GREEN,
  }),
  progressBar: styled.View({}, (props: { level: number }) => {
    return {
      width: `${props.level}%`,
      height: '100%',
    };
  }),
  level: styled.View({
    display: 'flex',
  }),
  Dim: styled.View({
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  }),
};

export const GardenPopup: React.FC<IGardenPopup> = ({ title, img, level }) => {
  return (
    <S.popupWrap visible={true} transparent={true}>
      <S.Dim />
      <Font type={'TITLE2_REGULAR'}>{title}</Font>
      <S.imgWrap>
        <S.imgEl source={{ uri: img.uri }} />
        <S.imgCaption>
          <Font type={'HEADLINE_SEMIBOLD'}>{img.name}</Font>
        </S.imgCaption>
      </S.imgWrap>
      <S.progressBarWrap>
        <S.progressBarBg />
        <S.progressBar level={level} />
      </S.progressBarWrap>
      <Font type={'TITLE1_BOLD'} textAlign={'right'}>
        {level}/100
      </Font>
    </S.popupWrap>
  );
};
