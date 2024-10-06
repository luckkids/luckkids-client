import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { Font, SvgIcon, L, CONSTANTS } from '@design-system';
import { useMe } from '@queries';
import ButtonText from '../../design-system/components/Button/ButtonText';
import { settingApis } from '@apis/setting';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import { RecoilToken } from '@recoil/recoil.token';

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
  const applicationVersion = DeviceInfo.getVersion();
  const { removeValue: removeRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const [needUpdate, setNeedUpdate] = useState(false);

  const { removeValue: removeAccessToken } =
    useAsyncStorage<StorageKeys.AccessToken>(StorageKeys.AccessToken);
  const resetAccessToken = useResetRecoilState(RecoilToken);

  const { data: me } = useMe();
  const { nickname } = me || {};
  const { getToken } = useFirebaseMessage();

  const fetchVersionInfo = async () => {
    settingApis.getVersion().then((res) => {
      if (res.data.versionNum !== applicationVersion) {
        setNeedUpdate(true);
      }
    });
  };

  const handleLogout = () => {
    // 정말 로그아웃?

    AlertPopup.show({
      title: '정말 로그아웃하실 건가요?',
      noText: '네!',
      yesText: '아니요!',
      onPressNo: async () => {
        // delete remember me
        removeRememberMe();
        // delete token
        removeAccessToken();
        resetAccessToken();
        // go to login page
        return navigation.replace('Login');
      },
      onPressYes: async () => {
        AlertPopup.hide();
      },
    });
  };

  useEffect(() => {
    //TODO 백엔드 오류 수정되면 주석 해제
    // fetchVersionInfo();
  }, []);

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
      <ScrollView
        contentInset={{
          bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
        }}
      >
        <S.Wrap>
          <Font type={'BODY_REGULAR'}>{nickname}</Font>
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
        <ButtonText
          onPress={() =>
            navigation.navigate('WebView', {
              url: 'https://brunch.co.kr/magazine/luckkids-about',
              title: '브랜드 스토리',
            })
          }
        >
          <L.Row justify={'space-between'} ph={25} pv={20}>
            <Font type={'BODY_REGULAR'}>브랜드 스토리</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        <ButtonText
          onPress={() =>
            navigation.navigate('WebView', {
              url: 'https://forms.gle/isFjTdZ2aybSqfq48',
              title: '피드백 보내기',
            })
          }
        >
          <L.Row justify={'space-between'} ph={25} pv={20} items="center">
            <L.Col g={7}>
              <Font type={'BODY_REGULAR'}>피드백 보내기</Font>
              <Font type={'FOOTNOTE_REGULAR'} color="GREY1">
                하찮은 피드백도 환영이에요!
              </Font>
            </L.Col>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        <L.Row justify={'space-between'} ph={25} pv={20} items="center">
          <L.Col g={7}>
            <Font type={'BODY_REGULAR'}>앱 버전</Font>
            {needUpdate && (
              <Font type={'FOOTNOTE_REGULAR'} color="GREY1">
                업데이트가 필요해요!
              </Font>
            )}
          </L.Col>
          {needUpdate ? (
            <SvgIcon name={'arrow_right_gray'} size={14} />
          ) : (
            <Font type={'SUBHEADLINE_REGULAR'} color="GREY1">
              최신 버전이에요!
            </Font>
          )}
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
        {/* TODO admin인 경우 추가 */}
        {/* <ButtonText
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
        /> */}
      </ScrollView>
    </FrameLayout>
  );
};
