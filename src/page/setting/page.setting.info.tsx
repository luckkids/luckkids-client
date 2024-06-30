import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components/native';
import { ButtonText, Colors, Font, L, SvgIcon, Toggle } from '@design-system';
import { useMe } from '@queries';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';

const S = {
  Border: styled.View({
    borderTopColor: Colors.GREY5,
    borderTopWidth: '0.5px',
  }),
};

export const PageSettingInfo: React.FC = () => {
  const navigation = useNavigationService();
  const {
    storedValue: rememberMe,
    loading: isLoadingRememberMe,
    setValue: setRememberMe,
  } = useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const { data: me } = useMe();
  const { email } = me || {};
  const [deviceId, setDeviceId] = useState<string>('');

  const handleRememberMe = (value: boolean) => {
    // TODO: 자동 로그인 어떻게 해야할지 확인 후 구현 필요
  };

  useAsyncEffect(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    setDeviceId(deviceId);
  }, []);

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
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('SettingInfoPassword')}
      >
        <L.Row ph={25} pv={20} items={'center'} justify={'space-between'}>
          <Font type={'BODY_REGULAR'}>비밀번호 변경</Font>
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </TouchableWithoutFeedback>
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>자동 로그인</Font>
        <Toggle value={!!rememberMe} onChange={handleRememberMe} />
      </L.Row>
      <L.Col ph={25} pt={25}>
        <Font type={'SUBHEADLINE_SEMIBOLD'} color={'GREY1'}>
          기타
        </Font>
        <L.Col pt={30}>
          <ButtonText
            onPress={() => {
              navigation.push('WebView', {
                // TODO url 변경 필요
                url: '',
                title: '서비스 이용약관',
              });
            }}
            text={'서비스 이용약관'}
            textColor={'WHITE'}
          />
        </L.Col>
      </L.Col>
    </FrameLayout>
  );
};
