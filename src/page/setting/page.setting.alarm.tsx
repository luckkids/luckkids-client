import React, { useState } from 'react';
import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components/native';
import { ButtonText, Font, SvgIcon, L, Colors, Toggle } from '@design-system';
import { useSettingAlarmSetting } from '@queries';
import { settingApis } from '@apis/setting';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import SettingAlarmLuckTimePicker from '@components/page/setting/setting.alarm.luck.time.picker';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { AlertType } from '@types-common/setting.types';
import { useFocusEffect } from '@react-navigation/native';
import useAppStateEffect from '@hooks/useAppStateEffect';

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
  const { hasPermission } = useFirebaseMessage();
  const [showPushSetting, setShowPushSetting] = useState(false);

  //TODO API 수정되면 주석 해제
  const { data: setting } = useSettingAlarmSetting({ deviceId });

  const handlePressAllowAlarm = () => {
    Linking.openSettings();
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

  const syncHasPermission = async () => {
    const isPermitted = await hasPermission();
    setShowPushSetting(isPermitted);
  };

  useAsyncEffect(syncHasPermission, []);
  useAppStateEffect(syncHasPermission, []);

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
              알림이 꺼져있어요!
            </Font>
            <ButtonText
              onPress={handlePressAllowAlarm}
              fontType={'CAPTION1_SEMIBOLD'}
              text={'iOS 알림 설정'}
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
      {/* LUCK */}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <L.Col g={8}>
          <Font type={'BODY_REGULAR'}>행운의 한마디</Font>
          <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
            매일 설정한 시간에 행운의 한마디를 보내 드려요!
          </Font>
        </L.Col>
        <Toggle
          value={true} // TODO 실제 값으로 변경
          onChange={(value) => handleUpdateAlarm('LUCK', value)}
        />
      </L.Row>
      {/* LUCK 시간 변경 */}
      {/* {!!setting?.luck && ( */}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <Font type={'BODY_REGULAR'}>행운의 한마디 알림 시간</Font>
        <L.Row items="center" g={15}>
          <ButtonText
            onPress={() => {
              BottomSheet.show({
                component: (
                  <SettingAlarmLuckTimePicker
                    onConfirmTime={(time) => {
                      console.log(time);
                    }}
                    initialTime={new Date(
                      new Date().setHours(7, 0, 0, 0),
                    ).getTime()}
                  />
                ),
              });
            }}
            text={'오전 7:00'}
            textColor="GREY1"
          />
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </L.Row>
      {/* )} */}
      {/* MISSION */}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <L.Col g={8}>
          <Font type={'BODY_REGULAR'}>습관 알림</Font>
          <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
            매일 설정한 시간에 습관을 알려 드려요.
          </Font>
        </L.Col>
        <Toggle
          value={true} // TODO 실제 값으로 변경
          onChange={(value) => handleUpdateAlarm('MISSION', value)}
        />
      </L.Row>
      {/* FRIEND */}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <L.Col g={8}>
          <Font type={'BODY_REGULAR'}>친구 알림</Font>
          <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
            가든에 친구가 추가되면 알려 드려요.
          </Font>
        </L.Col>
        <Toggle
          value={true} // TODO 실제 값으로 변경
          onChange={(value) => handleUpdateAlarm('MISSION', value)}
        />
      </L.Row>
      {/* NOTICE */}
      <L.Col ph={25} pv={20} w="100%">
        <Font type="BODY_REGULAR" color="GREY1">
          럭키즈 소식
        </Font>
        <L.Row w="100%" pv={20} justify={'space-between'} items={'center'}>
          <Font type={'BODY_REGULAR'}>공지사항</Font>
          <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
            업데이트, 이벤트, 콘텐츠 관련 마케팅 알림이에요.
          </Font>
          <Toggle
            value={true} // TODO 실제 값으로 변경
            onChange={(value) => handleUpdateAlarm('NOTICE', value)}
          />
        </L.Row>
      </L.Col>
    </FrameLayout>
  );
};
