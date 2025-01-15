import React, { useEffect, useState } from 'react';
import { Linking, Platform, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useResetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { Font, SvgIcon, L, CONSTANTS } from '@design-system';
import { useMe } from '@queries';
import ButtonText from '../../design-system/components/Button/ButtonText';
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
  const { removeValue: removeRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);
  const { getCurrentValue: getEnvironment, setValue: setEnvironment } =
    useAsyncStorage<StorageKeys.Environment>(StorageKeys.Environment);
  const [isStage, setIsStage] = useState(false);

  const { data: userInfo } = useMe();

  const [versionInfo, setVersionInfo] = useState<{
    hasUpdate: boolean;
    storeVersion?: string;
    currentVersion?: string;
  }>({
    hasUpdate: false,
  });

  useEffect(() => {
    const checkEnvironment = async () => {
      const env = await getEnvironment();
      setIsStage(env?.type === 'STAGE');
    };
    checkEnvironment();
  }, []);

  const toggleEnvironment = async () => {
    const newEnv = isStage ? 'PROD' : 'STAGE';
    await setEnvironment({ type: newEnv });
    setIsStage(!isStage);
    AlertPopup.show({
      title: `서버 환경이 ${newEnv}로 변경되었습니다.`,
      noText: '확인',
      onPressNo: () => {
        AlertPopup.hide();
        // Reload the app to apply new environment
        navigation.replace('Login');
      },
    });
  };

  const checkIOSVersion = async () => {
    try {
      const response = await fetch(
        'https://itunes.apple.com/lookup?bundleId=com.app.luck-kids',
      );
      const json = await response.json();
      const storeVersion = json.results[0].version;
      const currentVersion = DeviceInfo.getVersion();

      return {
        hasUpdate: storeVersion !== currentVersion,
        storeVersion,
        currentVersion,
      };
    } catch (error) {
      console.error('Version check failed:', error);
      return {
        hasUpdate: false,
        currentVersion: DeviceInfo.getVersion(),
      };
    }
  };

  const { removeValue: removeAccessToken } =
    useAsyncStorage<StorageKeys.AccessToken>(StorageKeys.AccessToken);
  const resetAccessToken = useResetRecoilState(RecoilToken);

  const { data: me } = useMe();
  const { nickname } = me || {};
  const { getToken } = useFirebaseMessage();

  const handleLogout = () => {
    // 정말 로그아웃?

    AlertPopup.show({
      title: '정말 로그아웃하실 건가요?',
      noText: '네',
      yesText: '아니오',
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

  const openStore = async () => {
    const appStoreId = '6475259179';

    try {
      if (Platform.OS === 'ios') {
        // App Store로 이동
        await Linking.openURL(`itms-apps://apps.apple.com/app/id${appStoreId}`);
      } else {
        // FIXME: 안드로이드 출시되면 Play Store로 이동
      }
    } catch (error) {
      // 스토어 앱이 설치되지 않은 경우 웹 URL로 이동
      if (Platform.OS === 'ios') {
        await Linking.openURL(`https://apps.apple.com/app/id${appStoreId}`);
      } else {
        // FIXME: 안드로이드 출시되면 Play Store로 이동 (웹)
      }
    }
  };

  useEffect(() => {
    checkIOSVersion().then((res) => {
      if (res) {
        setVersionInfo(res);
      }
    });
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
              url: 'https://info-luckkids.netlify.app/',
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
        <ButtonText
          onPress={() => {
            if (!versionInfo.hasUpdate) return;
            openStore();
          }}
        >
          <L.Row justify={'space-between'} ph={25} pv={20} items="center">
            <L.Col g={7}>
              <Font type={'BODY_REGULAR'}>앱 버전</Font>
              {versionInfo.hasUpdate && (
                <Font type={'FOOTNOTE_REGULAR'} color="GREY1">
                  업데이트가 필요해요!
                </Font>
              )}
            </L.Col>
            {versionInfo.hasUpdate ? (
              <SvgIcon name={'arrow_right_gray'} size={14} />
            ) : (
              <Font type={'SUBHEADLINE_REGULAR'} color="GREY1">
                최신 버전이에요!
              </Font>
            )}
          </L.Row>
        </ButtonText>

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
        {/* admin 메뉴 */}
        {/* {userInfo?.role === 'ADMIN' && (
        <ButtonText onPress={() => navigation.navigate('SettingAdmin')}>
          <L.Row justify={'space-between'} ph={25} pv={20} items="center">
            <Font type={'BODY_REGULAR'}>어드민 메뉴</Font>
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </ButtonText>
        )} */}
      </ScrollView>
    </FrameLayout>
  );
};
