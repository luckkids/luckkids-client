import React, { useState } from 'react';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { LoginJoinId } from '@components/page/login/join/login.join.id';
import { LoginJoinPass } from '@components/page/login/join/login.join.pass';
import { FrameLayoutKeyboard } from '@frame/frame.layout.keyboard';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageLoginJoin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [step, setStep] = useState<'Id' | 'Password'>('Id');
  const navigate = useNavigationService();

  const handlePressConfirm = () => {
    // TODO(Gina) 회원가입 API 호출

    navigate.navigate('LoginAgreement');
  };

  return (
    <>
      <FrameLayoutKeyboard>
        <StackNavbar title={'이메일로 회원가입'} useBackButton />
        {step === 'Id' ? (
          <LoginJoinId
            email={email}
            setEmail={setEmail}
            onEmailPass={() => {
              setStep('Password');
            }}
          />
        ) : (
          <LoginJoinPass
            password={password}
            setPassword={setPassword}
            onSuccess={handlePressConfirm}
          />
        )}
      </FrameLayoutKeyboard>
    </>
  );
};
