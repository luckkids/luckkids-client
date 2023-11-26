import React, { useEffect, useState } from 'react';
import { useResetRecoilState } from 'recoil';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { LoginJoinId } from '@components/page/login/join/login.join.id';
import { LoginJoinPass } from '@components/page/login/join/login.join.pass';
import { FrameLayoutKeyboard } from '@frame/frame.layout.keyboard';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilJoinInfo } from '@recoil/recoil.join';

export const PageLoginJoin: React.FC = () => {
  const [step, setStep] = useState<'Id' | 'Password'>('Id');
  const navigation = useNavigationService();
  const resetJoinInfo = useResetRecoilState(RecoilJoinInfo);

  const handlePressConfirm = () => {
    navigation.navigate('LoginAgreement');
  };

  const handlePressBack = () => {
    navigation.goBack();
    resetJoinInfo();
  };

  return (
    <>
      <FrameLayoutKeyboard>
        <StackNavbar
          title={'이메일로 회원가입'}
          useBackButton
          onBackPress={handlePressBack}
        />
        {step === 'Id' ? (
          <LoginJoinId
            onEmailPass={() => {
              setStep('Password');
            }}
          />
        ) : (
          <LoginJoinPass onSuccess={handlePressConfirm} />
        )}
      </FrameLayoutKeyboard>
    </>
  );
};
