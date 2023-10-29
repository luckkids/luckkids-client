import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageSettingProfile: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>프로필수</S.Text>
      <S.Button
        title={'저장/취소'}
        onPress={() => props.navigation.navigate(AppScreens.Setting)}
      />
    </FrameLayout>
  );
};
