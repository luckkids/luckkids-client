import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font } from '@design-system';
import { getCharacterImage } from '@utils';
import { IGardenItem } from '@types-common/page.types';

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
};

interface IProps {
  item: IGardenItem | null;
  onPress?: () => void;
  isSelf?: boolean;
}

export const GardenItem: React.FC<IProps> = ({ onPress, isSelf, item }) => {
  const characterImageUrl = getCharacterImage(
    !item ? null : item.characterType,
    !item ? null : item.level,
    'garden',
  );

  return (
    <S.Container>
      <TouchableWithoutFeedback onPress={onPress}>
        <S.Wrapper>
          <Image
            source={{
              uri: `${characterImageUrl}`,
            }}
            style={{
              width: '100%',
              height: '100%',
              opacity: isSelf || item !== null ? 1 : 0.3,
            }}
          />
        </S.Wrapper>
      </TouchableWithoutFeedback>
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
    </S.Container>
  );
};
