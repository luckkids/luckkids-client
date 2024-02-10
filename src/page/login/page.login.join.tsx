import React from 'react';
import { useResetRecoilState } from 'recoil';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { LoginJoinId } from '@components/page/login/join/login.join.id';
import { LoginJoinPass } from '@components/page/login/join/login.join.pass';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilJoinInfo } from '@recoil/recoil.join';
import { FrameLayout } from '@frame/frame.layout';

export const PageLoginJoin: React.FC = () => {
  const navigation = useNavigationService();
  const {
    params: { step },
  } = useNavigationRoute('LoginJoin');
  const resetJoinInfo = useResetRecoilState(RecoilJoinInfo);

  const handlePressConfirm = () => {
    navigation.navigate('LoginJoinAgreement');
  };

  const handlePressBack = () => {
    navigation.goBack();
    resetJoinInfo();
  };

  return (
    <FrameLayout>
      <StackNavbar
        title={step === 'Id' ? '이메일 회원가입' : '비밀번호 만들기'}
        useBackButton
        onBackPress={handlePressBack}
      />
      {step === 'Id' ? (
        <LoginJoinId />
      ) : (
        <LoginJoinPass onSuccess={handlePressConfirm} />
      )}
    </FrameLayout>
  );
};
