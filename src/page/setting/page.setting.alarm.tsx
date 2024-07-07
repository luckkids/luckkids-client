import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components/native';
import { ButtonText, Font, SvgIcon, L, Colors, Toggle } from '@design-system';
import { useSettingAlarmSetting } from '@queries';
import { settingApis } from '@apis/setting';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { FrameLayout } from '@frame/frame.layout';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { AlertType } from '@types-common/setting.types';

const S = {
  onAlarm: styled.View({
    paddingVertical: 25,
    paddingHorizontal: 30,
    flexDirection: 'row',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderTopColor: Colors.GREY5,
    borderBottomColor: Colors.GREY5,
  }),
  onAlarmWrap: styled.View({
    flexDirection: 'column',
    alignItems: 'baseline',
    marginLeft: 16,
  }),
  itemContainer: styled.View({}),
};

export const PageSettingAlarm: React.FC = () => {
  const [deviceId, setDeviceId] = useState('');
  const { requestPermissionIfNot, hasPermission } = useFirebaseMessage();
  const [showPushSetting, setShowPushSetting] = useState(false);

  //TODO API 수정되면 주석 해제
  const { data: setting } = useSettingAlarmSetting({ deviceId });

  const handlePressAllowAlarm = () => {
    requestPermissionIfNot().then(() => {
      settingApis.updateAlertSetting({
        alertType: 'ENTIRE',
        alertStatus: 'CHECKED',
        deviceId,
      });
    });
  };

  const handleUpdateAlarm = async (type: AlertType, value: boolean) => {
    try {
      // 왜 DeviceID가 빈 스트링?
      console.log(44, deviceId);
      if (!deviceId) return;
      settingApis.updateAlertSetting({
        alertType: type,
        alertStatus: value ? 'CHECKED' : 'UNCHECKED',
        deviceId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(46, setting);

  useAsyncEffect(async () => {
    setShowPushSetting(await hasPermission());
  }, []);

  useAsyncEffect(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    setDeviceId(deviceId);
  }, []);

  return (
    <FrameLayout NavBar={<StackNavBar title={'알림'} useBackButton />}>
      {!showPushSetting && (
        <S.onAlarm>
          <SvgIcon name={'bell'} size={20} />
          <S.onAlarmWrap>
            <Font type={'BODY_REGULAR'} color={'GREY0'}>
              알림을 켜주세요.
            </Font>
            <ButtonText
              onPress={handlePressAllowAlarm}
              fontType={'CAPTION1_SEMIBOLD'}
              text={'알림 설정'}
              cssProp={{
                backgroundColor: Colors.LUCK_GREEN,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                marginTop: 20,
              }}
            />
          </S.onAlarmWrap>
        </S.onAlarm>
      )}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>알림음</Font>
        <ButtonText
          onPress={() => {
            //TODO 나중에 알림음 추가되면 수정
          }}
          text={'럭럭'}
          textColor={'LUCK_GREEN'}
        />
      </L.Row>
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>습관 알림 받기</Font>
        <Toggle
          value={true} // TODO 실제 값으로 변경
          onChange={(value) => handleUpdateAlarm('MISSION', value)}
        />
      </L.Row>
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <L.Col g={8}>
          <Font type={'BODY_REGULAR'}>오늘의 한마디 받아보기</Font>
          <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
            매일 오전 7시에 행운의 한마디를 보내드려요.
          </Font>
        </L.Col>
        <Toggle
          value={true} // TODO 실제 값으로 변경
          onChange={(value) => handleUpdateAlarm('LUCK', value)}
        />
      </L.Row>
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>공지사항 알림 받기</Font>
        <Toggle
          value={true} // TODO 실제 값으로 변경
          onChange={(value) => handleUpdateAlarm('NOTICE', value)}
        />
      </L.Row>
    </FrameLayout>
  );
};
