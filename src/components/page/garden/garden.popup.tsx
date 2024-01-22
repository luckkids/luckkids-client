import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
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
  isShow: boolean;
  setShow: React.Dispatch<boolean>;
}

const S = {
  popupContainer: styled.Modal({}),
  popupWrap: styled.View({
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
  imgWrap: styled.View({
    width: 205,
    height: 250,
    marginTop: 30,
    marginBottom: 50,
  }),
  imgEl: styled.Image({
    width: '100%',
    height: '100%',
    borderRadius: 15,
  }),
  imgCaption: styled.View({
    color: Colors.LUCK_GREEN,
    position: 'absolute',
    bottom: 0,
    left: 0,
    textAlign: 'center',
  }),
  progressBarContainer: styled.View({
    paddingHorizontal: 25,
    width: '100%',
  }),
  progressBarWrap: styled.View({
    position: 'relative',
    height: 8,
    width: '100%',
  }),
  progressBarBg: styled.View({
    width: '100%',
    height: '100%',
    opacity: 0.7,
    backgroundColor: Colors.LUCK_GREEN,
    borderRadius: 4,
  }),
  progressBar: styled.View(
    {
      backgroundColor: Colors.LUCK_GREEN,
      position: 'absolute',
      borderRadius: 4,
    },
    (props: { level: number }) => {
      return {
        width: `${props.level}%`,
        height: '100%',
      };
    },
  ),
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
export const GardenPopup: React.FC<IGardenPopup> = ({
  title,
  img,
  level,
  isShow,
  setShow,
}) => {
  return (
    <S.popupContainer visible={isShow} transparent={true}>
      <S.popupWrap>
        <TouchableWithoutFeedback onPress={() => setShow(false)}>
          <S.Dim />
        </TouchableWithoutFeedback>
        <Font type={'TITLE2_REGULAR'}>{title}</Font>
        <S.imgWrap>
          <S.imgEl source={{ uri: img.uri }} />
          <Font
            color={'LUCK_GREEN'}
            type={'HEADLINE_SEMIBOLD'}
            textAlign={'center'}
            style={{ width: '100%', position: 'absolute', bottom: 25, left: 0 }}
          >
            {img.name}
          </Font>
        </S.imgWrap>
        <S.progressBarContainer>
          <S.progressBarWrap>
            <S.progressBar level={level} />
            <S.progressBarBg />
          </S.progressBarWrap>
        </S.progressBarContainer>
        <Font
          type={'TITLE1_BOLD'}
          textAlign={'right'}
          color={'LUCK_GREEN'}
          style={{ width: '100%', paddingHorizontal: 25, marginTop: 6 }}
        >
          {level}/100
        </Font>
      </S.popupWrap>
    </S.popupContainer>
  );
};
