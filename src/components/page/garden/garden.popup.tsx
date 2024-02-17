import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Font } from '@design-system';
import Colors from '../../../design-system/colors';
import {IGardenItem} from "@types-common/page.types";

interface IGardenPopup {
  title: string;
  img: string;
  isShow:boolean;
  name:string;
  setShow: React.Dispatch<IGardenItem>;
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
    backgroundColor: 'rgba(0,0,0,0.7)',
  }),
};
export const GardenPopup: React.FC<IGardenPopup> = ({
  title,
  img,
  isShow,
    name,
  setShow,
}) => {
  const imageSource = require(img);
  return (
    <S.popupContainer visible={isShow} transparent={true}>
      <S.popupWrap>
        <TouchableWithoutFeedback onPress={() => setShow({isShow:false,nickname:'',luckPhrase:'',imageFileUrl:''})}>
          <S.Dim />
        </TouchableWithoutFeedback>
        <Font type={'TITLE2_REGULAR'}>{title}</Font>
        <S.imgWrap>
          <S.imgEl source={imageSource} />
        </S.imgWrap>
        <Font type={'TITLE2_REGULAR'}>{name}</Font>
      </S.popupWrap>
    </S.popupContainer>
  );
};
