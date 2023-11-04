import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, SvgIcon, TextInputField } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageLoginJoinPass: React.FC<IPage> = (props) => {
  const [userPassword, setUserPassword] = useState<string>('');
  return (
    <FrameLayout>
      <S.Text>비밀번호 만들기</S.Text>
      <TextInputField
        text={userPassword}
        title={'비밀번호 만들기'}
        description="8자 이상을 사용하세요."
        onChangeText={setUserPassword}
        placeholder="password"
        secureTextEntry
        RightComponent={<SvgIcon name={'password_visibility_on'} size={20} />}
      />
      <Button
        type={'action'}
        text={'가입완료'}
        onPress={() => props.navigation.navigate(AppScreens.LoginId)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
