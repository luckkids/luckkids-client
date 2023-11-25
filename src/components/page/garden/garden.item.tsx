import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '@design-system';

interface GardenItem {
  onPress: () => void;
}

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
};
export const GardenItem: React.FC<GardenItem> = (props) => {
  return (
    <S.Container>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <S.Wrapper></S.Wrapper>
      </TouchableWithoutFeedback>
    </S.Container>
  );
};
