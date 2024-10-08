import React, { useCallback, useEffect, useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { interval } from 'rxjs';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import { authApis } from '@apis/auth';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useAppStateEffect from '@hooks/useAppStateEffect';
import { RecoilJoinInfo } from '@recoil/recoil.join';

export const PageLoginJoinEmailConfirm: React.FC = () => {
  const {
    params: { authKey },
  } = useNavigationRoute('LoginJoinEmailConfirm');
  const navigation = useNavigationService();
  const joinInfo = useRecoilValue(RecoilJoinInfo);
  const resetJoinInfo = useResetRecoilState(RecoilJoinInfo);
  const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);
  const { bottom } = useSafeAreaInsets();

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
    navigation.push('LoginJoin', {
      step: 'Password',
    });
  };

  const handleConfirmEmail = useCallback(async () => {
    try {
      await authApis.confirmEmail({
        email: joinInfo.email,
        authKey: authKey,
      });
      setEmailConfirmed(true);
    } catch (error: any) {
      console.error('confirmEmail', error);
      setEmailConfirmed(false);
    }
  }, [joinInfo, authKey]);

  useAppStateEffect((state) => {
    if (state === 'active') {
      handleConfirmEmail();
    }
  }, []);

  useEffect(() => {
    const subscription = interval(5000).subscribe(() => {
      handleConfirmEmail();
    });

    return () => subscription.unsubscribe();
  }, [handleConfirmEmail]);

  return (
    <FrameLayout>
      <StackNavbar
        title={'이메일 인증하기'}
        useBackButton
        onBackPress={handlePressBack}
      />
      <L.Row ph={DEFAULT_MARGIN}>
        <Font
          type={'BODY_REGULAR'}
          mt={20}
        >{`“${joinInfo.email}" 주소로 인증 요청 이메일이 전송되었습니다. 이메일의 링크를 탭한 후에 아래 [인증하기] 버튼을 눌러주세요.\n*이메일 [인증하기] 버튼을 누른 후 최대 5초간 기다려 주세요!`}</Font>
      </L.Row>
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Col ph={DEFAULT_MARGIN} g={10}>
          <L.Row>
            <Button
              type={'action'}
              status={!emailConfirmed ? 'disabled' : 'normal'}
              text={'인증하기'}
              onPress={handlePressConfirm}
              sizing="stretch"
              bgColor={'LUCK_GREEN'}
            />
          </L.Row>
          <L.Row
            style={{
              opacity: 0.5,
            }}
          >
            <Button
              type={'action'}
              status={'normal'}
              text={'이메일 변경'}
              onPress={handleChangeEmail}
              sizing="stretch"
              bgColor={'TRANSPARENT'}
              textColor="WHITE"
            />
          </L.Row>
        </L.Col>
      </L.Absolute>
    </FrameLayout>
  );
};
