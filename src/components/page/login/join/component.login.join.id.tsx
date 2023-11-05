import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Button, TextInputField } from '@design-system';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
};

interface IProps {
  regPass: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ComponentLoginJoinId: React.FC<IProps> = (props) => {
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
        onPress={() => {
          if (regPass) props.regPass(true);
        }}
        sizing="stretch"
        textColor={regPass ? 'BLACK' : 'WHITE'}
        bgColor={regPass ? 'LUCK_GREEN' : 'BG_TERTIARY'}
      />
    </>
  );
};
