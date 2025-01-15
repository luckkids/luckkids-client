import React, { useEffect, useState } from 'react';
import { Alert, Clipboard, ScrollView } from 'react-native';
import { Font, L, CONSTANTS, Toggle } from '@design-system';
import ButtonText from '../../design-system/components/Button/ButtonText';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import useNavigationService from '@hooks/navigation/useNavigationService';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';

export const PageSettingAdmin: React.FC = () => {
  const navigation = useNavigationService();
  const { getCurrentValue: getEnvironment, setValue: setEnvironment } =
    useAsyncStorage<StorageKeys.Environment>(StorageKeys.Environment);
  const [isStage, setIsStage] = useState(false);

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

  const { getToken } = useFirebaseMessage();

  return (
    <FrameLayout>
      <StackNavbar
        title={'어드민 메뉴'}
        useBackButton
        onBackPress={() => {
          navigation.pop();
        }}
      />
      <ScrollView
        contentInset={{
          bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
        }}
      >
        {/* environment 변경 */}
        <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
          <L.Col g={8}>
            <Font type={'BODY_REGULAR'}>개발 서버</Font>
            <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
              개발 서버로 접속합니다.
            </Font>
          </L.Col>
          <Toggle value={isStage} onChange={toggleEnvironment} />
        </L.Row>
        {/* 내 푸시 토큰 복사 */}
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
