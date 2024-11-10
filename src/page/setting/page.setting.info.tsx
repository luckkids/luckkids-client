import React, { createElement } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { DEFAULT_MARGIN } from '@constants';
import { ButtonText, Colors, Font, L, SvgIcon, Toggle } from '@design-system';
import { useMe } from '@queries';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import { RecoilLoignInfo, RecoilOauthLoginInfo } from '@recoil/recoil.login';

const S = {
  Border: styled.View({
    borderTopColor: Colors.GREY5,
    borderTopWidth: '0.5px',
  }),
};

export const PageSettingInfo: React.FC = () => {
  const navigation = useNavigationService();
  const { storedValue: rememberMe, setValue: setRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);
  const loginInfo = useRecoilValue(RecoilLoignInfo);
  const oauthLoginInfo = useRecoilValue(RecoilOauthLoginInfo);

  const { data: me } = useMe();
  const { email } = me || {};

  const handleRememberMe = (value: boolean) => {
    if (value) {
      setRememberMe({
        isEnabled: true,
        email: loginInfo.email || null,
        credential: loginInfo.password || oauthLoginInfo.token,
        snsType: oauthLoginInfo.snsType || 'NORMAL',
      });
    } else {
      setRememberMe(null);
    }
  };

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
              {email}
            </Font>
          </L.Col>
        </L.Col>
      </L.Col>
      {me?.snsType === 'NORMAL' && (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('SettingInfoPassword')}
        >
          <L.Row ph={25} pv={20} items={'center'} justify={'space-between'}>
            <Font type={'BODY_REGULAR'}>비밀번호 변경</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </TouchableWithoutFeedback>
      )}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>자동 로그인</Font>
        <Toggle
          value={rememberMe?.isEnabled || false}
          onChange={handleRememberMe}
        />
      </L.Row>
      <L.Col ph={25} pt={25}>
        <Font type={'SUBHEADLINE_SEMIBOLD'} color={'GREY1'}>
          기타
        </Font>
        <L.Col pt={30}>
          <ButtonText
            onPress={() => {
              navigation.push('WebView', {
                url: 'https://www.notion.so/1f210857eb944efcb575dc674249cda3?pvs=4',
                title: '약관 및 정책',
              });
            }}
            text={'약관 및 정책'}
            textColor={'WHITE'}
          />
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};
