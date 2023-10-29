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

export const PageSettingSecurity: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>비밀번호 및 보안</S.Text>
      <S.Button
        title={'비밀번호변경'}
        onPress={() =>
          props.navigation.navigate(AppScreens.SettingSecurityPass)
        }
      />
    </FrameLayout>
  );
};
