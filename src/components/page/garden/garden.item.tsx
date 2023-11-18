import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '@design-system';

interface GardenItem {
  onPress: () => void;
}

const S = {
  Container: styled.View({
    aspectRatio: '1',
    borderRadius: 12,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '31.6%',
    background: Colors.BG_TERTIARY,
  }),
  Wrapper: styled.View({}),
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
