import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Button, SvgIcon, TextInputField } from '@design-system';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
};

interface IProps {
  navigation: () => void;
}

export const ComponentLoginJoinPass: React.FC<IProps> = (props) => {
  const [userPassword, setUserPassword] = useState<string>('');
  return (
    <>
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
        onPress={() => {
          if (userPassword.length >= 8) props.navigation();
        }}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </>
  );
};
