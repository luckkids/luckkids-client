import React, { useEffect, useState } from 'react';
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

export const LoginData = {
  email: 'tkdrl8908@naver.com',
  password: '1234',
  deviceId: 'testdeviceId',
  pushKey: 'tessPushKey',
};

const JoinId = () => {
  const [userId, setUserId] = useState<string>('');
  const [regPass, setRegPass] = useState<boolean>(true);
  useEffect(() => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setRegPass(reg.test(userId));
  }, [userId]);
  return (
    <>
      <S.Text>계정 만들기 (이메일 주소가 무엇인가요?)</S.Text>
      <TextInputField
        text={userId}
        title={'이메일 주소가 무엇인가요?'}
        notice={'이메일 형식이 아닙니다.'}
        reg={regPass}
        description="나중에 이 이메일 주소를 확인해야 합니다."
        onChangeText={setUserId}
        placeholder="email"
      />
      <Button
        type={'action'}
        text={'다음(비밀번호만들기)'}
        onPress={() => {}}
        sizing="stretch"
        textColor={regPass ? 'BLACK' : 'WHITE'}
        bgColor={regPass ? 'LUCK_GREEN' : 'BG_TERTIARY'}
      />
    </>
  );
};

const JoinPass: React.FC<IPage> = (props) => {
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
        onPress={() => props.navigation.navigate(AppScreens.LoginId)}
        // onPress={() => {}}
        sizing="stretch"
        bgColor={'LUCK_GREEN'}
      />
    </>
  );
};

export const PageLoginJoin: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <L.Col p={24}>
        <JoinId />
        <JoinPass navigation={props.navigation} />
      </L.Col>
    </FrameLayout>
  );
};
