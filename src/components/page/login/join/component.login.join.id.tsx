import React, { useEffect, useState } from 'react';
import { Button, L, TextInputField } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { DEFAULT_MARGIN } from '@constants';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { FrameLayoutKeyboard } from '@frame/frame.layout.keyboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
  regPass: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ComponentLoginJoinId: React.FC<IProps> = ({ regPass }) => {
  const [email, setEmail] = useState('');
  const { bottom } = useSafeAreaInsets();
  const [isRegPass, setIsRegPass] = useState<boolean>(true);
  useEffect(() => {
    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsRegPass(reg.test(email));
  }, [email]);

  return (
    <>
      <FrameLayoutKeyboard>
        <StackNavbar title={'계정 만들기'} useBackButton />
        <L.Col ph={DEFAULT_MARGIN} h={'100%'} pt={40}>
          <TextInputField
            title="이메일 주소가 무엇인가요?"
            text={email}
            placeholder="luckkids.official@gmail.com"
            notice={'올바른 이메일 형식이 아닙니다.'}
            isValidated={isRegPass}
            onChangeText={setEmail}
            description="나중에 이 이메일 주소를 확인해야 합니다."
          />
        </L.Col>
        <L.Absolute b={bottom} w={SCREEN_WIDTH}>
          <L.Row ph={DEFAULT_MARGIN}>
            <Button
              type={'action'}
              text={'다음'}
              onPress={() => {
                if (isRegPass) regPass(true);
              }}
              sizing="stretch"
              bgColor={'LUCK_GREEN'}
            />
          </L.Row>
        </L.Absolute>
      </FrameLayoutKeyboard>
    </>
  );
};
