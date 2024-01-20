import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ButtonText, Colors, Font, L, SvgIcon, Toggle } from '@design-system';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import { TouchableWithoutFeedback } from 'react-native';
import useNavigationService from '@hooks/navigation/useNavigationService';

const S = {
  Border: styled.View({
    borderTopColor: Colors.GREY5,
    borderTopWidth: '0.5px',
  }),
};

export const PageSettingInfo: React.FC = () => {
  const navigation = useNavigationService();
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  return (
    <FrameLayout NavBar={<StackNavBar title={'계정'} useBackButton />}>
      <S.Border />
      <L.Col ph={25} pt={25} pb={15}>
        <Font type={'SUBHEADLINE_SEMIBOLD'} color={'GREY1'}>
          계정 정보
        </Font>
        <L.Col pt={30}>
          <Font type={'BODY_REGULAR'}>이메일</Font>
          <L.Col pt={7}>
            <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
              Luckids@gmail.com
            </Font>
          </L.Col>
        </L.Col>
      </L.Col>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('SettingSecurityPass')}
      >
        <L.Row ph={25} pt={25} items={'center'} justify={'space-between'}>
          <Font type={'BODY_REGULAR'}>비밀번호 변경</Font>
          <SvgIcon name={'arrow_right_gray'} size={8.4} />
        </L.Row>
      </TouchableWithoutFeedback>
      <L.Row ph={25} pv={25} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>자동 로그인</Font>
        <Toggle value={autoLogin} onChange={setAutoLogin} />
      </L.Row>
      <L.Col ph={25} pt={25}>
        <Font type={'SUBHEADLINE_SEMIBOLD'} color={'GREY1'}>
          기타
        </Font>
        <L.Col pt={30}>
          <ButtonText
            onPress={() => console.log('서비스이용약관')}
            text={'서비스 이용약관'}
            textColor={'WHITE'}
          />
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};
