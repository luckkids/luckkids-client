import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font, L, SvgIcon } from '@design-system';
import { getCharacterImage } from '@utils';
import { IGardenItem } from '@types-common/page.types';

const S = {
  Container: styled.View(
    {
      width: '100%',
      paddingHorizontal: 25,
      paddingRight: 22,
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

interface IProps {
  item: IGardenItem | null;
  isSelf?: boolean;
  onPress?: () => void;
}

export const GardenHorizontalItem: React.FC<IProps> = ({
  isSelf,
  onPress,
  item,
}) => {
  const characterImageUrl = getCharacterImage(
    !item ? null : item.characterType,
    !item ? null : item.level,
    'normal',
  );

  return (
    <S.Container isSelf={isSelf}>
      <TouchableWithoutFeedback onPress={onPress}>
        <L.Row justify={'space-between'} items={'center'}>
          <L.Row>
            <S.Wrapper>
              <Image
                source={{ uri: characterImageUrl }}
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: isSelf || item !== null ? 1 : 0.3,
                }}
              />
              {isSelf && (
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
              <Font type={'BODY_SEMIBOLD'}>{item ? item.nickname : ' '}</Font>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
                {item ? `모은 럭키즈 ${item.characterCount}` : ' '}
              </Font>
            </L.Col>
          </L.Row>
          {item !== null && <SvgIcon name={'arrow_right_gray'} size={14} />}
        </L.Row>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};
