import React from 'react';
import styled from 'styled-components/native';
import { Button } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageCharacterSelect: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>캐릭터를 골라주세요.</S.Text>
      <Button
        type={'action'}
        text={'닉네임 정하기'}
        onPress={() => props.navigation.navigate(AppScreens.CharacterName)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
