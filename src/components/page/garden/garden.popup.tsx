import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Dim from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Font, L } from '@design-system';
import { IGardenItem } from '@types-common/page.types';
import { getCharacterImage } from '@utils';

interface IGardenPopup {
  show: IGardenItem;
  setShow: React.Dispatch<IGardenItem | null>;
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
    height: 200,
    marginTop: 40,
    marginBottom: 36,
  }),
  imgEl: styled.Image({
    width: '100%',
    height: '100%',
  }),
  Dim: styled.View({
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  }),
  commentWrap: styled.View({
    width: '100%',
    background: 'rgba(109,123,106,0.5)',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
  }),
};
export const GardenPopup: React.FC<IGardenPopup> = ({ show, setShow }) => {
  const { luckPhrase, nickname, characterType, level } = show;

  const characterImageUrl = getCharacterImage(characterType, level, 'normal');
  return (
    <S.popupContainer visible={!!show} transparent={true}>
      <S.popupWrap>
        <TouchableWithoutFeedback onPress={() => setShow(null)}>
          <Dim
            colors={['#3E4A33', '#314540']}
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
              opacity: 0.97,
            }}
          >
            <S.Dim />
          </Dim>
        </TouchableWithoutFeedback>
        <L.Col w={'100%'} ph={35}>
          <S.commentWrap>
            <Font type={'BODY_REGULAR'} textAlign={'center'}>
              {luckPhrase}
            </Font>
          </S.commentWrap>
        </L.Col>
        <S.imgWrap>
          <S.imgEl source={{ uri: characterImageUrl }} />
        </S.imgWrap>
        <Font type={'TITLE3_SEMIBOLD'}>{nickname}</Font>
      </S.popupWrap>
    </S.popupContainer>
  );
};
