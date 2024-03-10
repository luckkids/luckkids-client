import React, {useEffect, useState} from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import {Colors, Font} from '@design-system';
import {IGardenItem} from "@types-common/page.types";

const S = {
  Container: styled.View({
    aspectRatio: '1.075',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '33.33%',
    paddingHorizontal: 4,
  }),
  Wrapper: styled.View({
    width: '100%',
    height: '100%',
    background: Colors.BG_TERTIARY,
    borderRadius: 12,
    padding:20
  }),
  BadgeWrap:styled.View({
    width:27,
    height:24,
    borderRadius:10,
    background:Colors.LUCK_GREEN,
    position:'absolute',
    right:0,
    top:-8,
    alignItems:'center',
    justifyContent:'center'
  })
};

interface IProps extends IGardenItem{
  isDimProfile?:boolean;
}
export const GardenItem: React.FC<IProps> = (props) => {
  const [img,setImg] = useState<string>('');
  // const imgSrc = require(props.fileUrl);
  useEffect(() => {
    setImg(props.imageFileUrl);
  }, []);
  return (
    <S.Container>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <S.Wrapper>
          <Image source={require('assets/images/garden/charactor-lucky.png')} style={{
            width: '100%',
            height: '100%',
            opacity: props.isDimProfile ? 0.3 : 1
          }}/>
        </S.Wrapper>
      </TouchableWithoutFeedback>
      {props.isSelf && <S.BadgeWrap><Font type={'CAPTION1_SEMIBOLD'} justify-content={'center'} textAlign={'center'} color={'BLACK'}>나</Font></S.BadgeWrap>}
    </S.Container>
  );
};
