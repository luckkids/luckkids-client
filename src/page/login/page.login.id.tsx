import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, L, SvgIcon, TextInputField } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageLoginId: React.FC<IPage> = (props) => {
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  return (
    <FrameLayout>
      <S.Text>로그인 하기</S.Text>
      <L.Col p={24}>
        <TextInputField
          text={userId}
          title={'이메일 주소가 무엇인가요?'}
          description="나중에 이 이메일 주소를 확인해야 합니다."
          onChangeText={setUserId}
          placeholder="email"
        />
        <TextInputField
          text={userPassword}
          title={'비밀번호 만들기'}
          description="8자 이상을 사용하세요."
          onChangeText={setUserPassword}
          placeholder="password"
          secureTextEntry
          RightComponent={<SvgIcon name={'password_visibility_on'} size={20} />}
        />
      </L.Col>
      <Button
        type={'action'}
        text={'로그인하기'}
        onPress={() => props.navigation.navigate(AppScreens.CharacterMake)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
      <Button
        type={'action'}
        text={'새 계정 만들기'}
        onPress={() => props.navigation.navigate(AppScreens.LoginId)}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </FrameLayout>
  );
};
