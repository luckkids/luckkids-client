import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components/native';
import { Font, SvgIcon, L } from '@design-system';
import ButtonText from '../../design-system/components/Button/ButtonText';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import { useFetch } from '@hooks/useFetch';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';

const S = {
  Wrap: styled.View({
    paddingVertical: 30,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
  }),
};

export const PageSetting: React.FC = () => {
  const navigation = useNavigationService();
  const [version, setVersion] = useState<string>('최신 버전이에요!');
  const applicationVersion = DeviceInfo.getVersion();
  const { removeValue: removeRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const { removeValue: removeAccessToken } =
    useAsyncStorage<StorageKeys.AccessToken>(StorageKeys.AccessToken);

  const { getToken } = useFirebaseMessage();
  const { onFetch } = useFetch({
    method: 'GET',
    url: '/versions/',
    value: {},
    onSuccessCallback: (rtn) => {
      // if (rtn.versionNum === applicationVersion) setVersion(rtn.versionNum);
      setVersion(rtn);
    },
  });
  useEffect(() => {
    // onFetch();
    console.log(applicationVersion);
  }, []);

  const handleLogout = () => {
    // delete remember me
    removeRememberMe();
    // delete token
    removeAccessToken();
    // go to login page
    return navigation.navigate('Login');
  };

  return (
    <FrameLayout
      NavBar={
        <L.Row pt={12} pb={10} justify={'center'}>
          <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'} textAlign={'center'}>
            설정
          </Font>
        </L.Row>
      }
    >
      <ScrollView>
        <S.Wrap>
          <Font type={'BODY_REGULAR'}>정럭키</Font>
          <ButtonText
            onPress={() => navigation.navigate('HomeProfile')}
            text={'프로필 수정'}
            textColor={'GREY1'}
          />
        </S.Wrap>
        <ButtonText onPress={() => navigation.navigate('SettingAlarm')}>
          <L.Row justify={'space-between'} ph={25} pv={20}>
            <Font type={'BODY_REGULAR'}>알림</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        <ButtonText onPress={() => navigation.navigate('SettingInfo')}>
          <L.Row justify={'space-between'} ph={25} pv={20}>
            <Font type={'BODY_REGULAR'}>계정</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        <ButtonText onPress={() => navigation.navigate('SettingNotice')}>
          <L.Row justify={'space-between'} ph={25} pv={20}>
            <Font type={'BODY_REGULAR'}>공지사항</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        <ButtonText onPress={() => console.log('브랜드스토리')}>
          <L.Row justify={'space-between'} ph={25} pv={20}>
            <Font type={'BODY_REGULAR'}>브랜드 스토리</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        <L.Row justify={'space-between'} ph={25} pv={20}>
          <Font type={'BODY_REGULAR'}>버전 정보</Font>
          <Font type={'BODY_REGULAR'} color={'GREY1'}>
            {version}
          </Font>
        </L.Row>
        <ButtonText
          text={'로그아웃'}
          textColor={'WHITE'}
          cssProp={{
            paddingVertical: 20,
            paddingHorizontal: 25,
          }}
          onPress={handleLogout}
        />
        <ButtonText
          text={'탈퇴하기'}
          textColor={'WHITE'}
          cssProp={{
            paddingVertical: 20,
            paddingHorizontal: 25,
          }}
          onPress={() => navigation.navigate('SettingAccount')}
        />
        <ButtonText
          text={'내 푸시 토큰 복사하기'}
          textColor={'WHITE'}
          cssProp={{
            paddingVertical: 20,
            paddingHorizontal: 25,
          }}
          onPress={async () => {
            const pushToken = await getToken();
            if (pushToken) {
              Clipboard.setString(pushToken);
              Alert.alert('푸시 토큰이 복사되었습니다.');
            } else Alert.alert('푸시 토큰이 없습니다.');
          }}
        />
      </ScrollView>
    </FrameLayout>
  );
};
