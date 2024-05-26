import React, { useState } from 'react';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { DEFAULT_MARGIN } from '@constants';
import { Button, Font, L } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
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
    navigation.navigate('LoginJoin', {
      step: 'Password',
    });
  };

  // 이메일 인증 완료 여부 확인
  const { onFetch: confirmEmail } = useFetch({
    method: 'POST',
    url: '/confirmEmail/check',
    value: {
      email: joinInfo.email,
      authKey: authKey,
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

  useFocusEffect(confirmEmail);

  return (
    <FrameLayout>
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
      <L.Absolute b={bottom} w={SCREEN_WIDTH}>
        <L.Col ph={DEFAULT_MARGIN}>
          <Button
            type={'action'}
            status={!emailConfirmed ? 'disabled' : 'normal'}
            text={'인증하기'}
            onPress={handlePressConfirm}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
          <Button
            type={'action'}
            status={'normal'}
            text={'이메일 변경'}
            onPress={handleChangeEmail}
            sizing="stretch"
            bgColor={'LUCK_GREEN'}
          />
        </L.Col>
      </L.Absolute>
    </FrameLayout>
  );
};
