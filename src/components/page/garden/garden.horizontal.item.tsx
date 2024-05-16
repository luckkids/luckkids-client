import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font, L, SvgIcon } from '@design-system';
import { IGardenItem } from '@types-common/page.types';

const S = {
  Container: styled.View(
    {
      width: '100%',
      paddingHorizontal: 25,
    },
    (props: { isSelf?: boolean }) => {
      return {
        borderBottomWidth: props.isSelf ? 0.5 : 0,
        paddingVertical: props.isSelf ? 18 : 8,
        borderBottomColor: Colors.GREY5,
        marginBottom: props.isSelf ? 10 : 0,
      };
    },
  ),
  Wrapper: styled.View({
    width: 80,
    height: 80,
    background: Colors.BG_TERTIARY,
    borderRadius: 12,
  }),
  BadgeWrap: styled.View({
    width: 27,
    height: 24,
    borderRadius: 10,
    background: Colors.LUCK_GREEN,
    position: 'absolute',
    right: 0,
    top: -8,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  TextWrap: styled.View({}),
};

interface IProps extends IGardenItem {
  isDimProfile?: boolean;
}
export const GardenHorizontalItem: React.FC<IProps> = (props) => {
  return (
    <S.Container isSelf={props.isSelf}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <L.Row justify={'space-between'} items={'center'}>
          <L.Row>
            <S.Wrapper>
              <Image
                source={
                  !props.isDimProfile
                    ? { uri: props.imageFileUrl }
                    : require('assets/images/garden/garden-character-disabled.png')
                }
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: !props.isDimProfile ? 1 : 0.3,
                }}
              />
              {props.isSelf && (
                <S.BadgeWrap>
                  <Font
                    type={'CAPTION1_SEMIBOLD'}
                    justify-content={'center'}
                    textAlign={'center'}
                    color={'BLACK'}
                  >
                    나
                  </Font>
                </S.BadgeWrap>
              )}
            </S.Wrapper>
            <L.Col justify={'center'} ml={16} h={80}>
              <Font type={'BODY_SEMIBOLD'}>{props.nickname}</Font>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
                {props.characterCount}네잎
              </Font>
            </L.Col>
          </L.Row>
          <SvgIcon name={'arrow_right_gray'} size={8} />
        </L.Row>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};
