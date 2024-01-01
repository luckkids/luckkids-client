import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { LoginJoinId } from '@components/page/login/join/login.join.id';
import { LoginJoinPass } from '@components/page/login/join/login.join.pass';
import { FrameLayoutKeyboard } from '@frame/frame.layout.keyboard';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { RecoilJoinInfo } from '@recoil/recoil.join';
import { ChipButton, Font, L, SvgIcon } from '@design-system';
import { useFocusEffect } from '@react-navigation/native';

export const PageLoginJoinEmailConfirm: React.FC = () => {
  const navigation = useNavigationService();
  const joinInfo = useRecoilValue(RecoilJoinInfo);
  const resetJoinInfo = useResetRecoilState(RecoilJoinInfo);
  const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handleChangeEmail = () => {
    resetJoinInfo();
    navigation.navigate('LoginJoin', {
      step: 'Id',
    });
  };

  const handlePressConfirm = () => {
    navigation.navigate('LoginJoin', {
      step: 'Password',
    });
  };

  // 이메일 인증 완료 여부 확인
  const { resultData, onFetch: confirmEmail } = useFetch({
    method: 'POST',
    url: '/confirmEmail/check',
    value: {
      email: joinInfo.email,
      authKey: '',
    },
    onSuccessCallback: () => {
      console.log('이메일 인증 완료 성공');
      setEmailConfirmed(true);
    },
    onFailCallback: () => {
      console.log('이메일 인증 완료 실패');
      setEmailConfirmed(false);
    },
  });

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  useEffect(() => {
    console.log(54, resultData);
  }, [resultData]);

  return (
    <>
      <FrameLayoutKeyboard>
        <StackNavbar
          title={'이메일 인증하기'}
          useBackButton
          onBackPress={handlePressBack}
        />
        <L.Row>
          <Font
            type={'BODY_REGULAR'}
            mt={20}
          >{`“${joinInfo.email}" 주소로 인증 요청 이메일이 전송되었습니다. 이메일의 링크를 탭한 후에 아래 [인증하기] 버튼을 눌러주세요.`}</Font>
        </L.Row>
      </FrameLayoutKeyboard>
    </>
  );
};
