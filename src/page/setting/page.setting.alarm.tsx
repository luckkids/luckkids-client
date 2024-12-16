import React, { useState } from 'react';
import { Linking } from 'react-native';
import Sound from 'react-native-sound';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { ButtonText, Font, SvgIcon, L, Colors, Toggle } from '@design-system';
import { useSettingAlarmSetting } from '@queries';
import { formatLuckTime } from '@utils';
import { settingApis } from '@apis/setting';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import SettingAlarmLuckTimePicker from '@components/page/setting/setting.alarm.luck.time.picker';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useAppStateEffect from '@hooks/useAppStateEffect';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { RecoilDevice } from '@recoil/recoil.device';
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

const luckAlarmSound = new Sound(
  'noti_drop.wav',
  Sound.MAIN_BUNDLE,
  (error) => {
    if (error) {
      console.log('failed to load sound', error);
      return;
    }
    luckAlarmSound.setCategory('Playback');
  },
);

export const PageSettingAlarm: React.FC = () => {
  const { hasPermission } = useFirebaseMessage();
  const [showPushSetting, setShowPushSetting] = useState(false);
  const { deviceId } = useRecoilValue(RecoilDevice);

  const { data: setting, refetch } = useSettingAlarmSetting();

  const handlePressAllowAlarm = () => {
    Linking.openSettings();
  };

  const handleUpdateAlarm = async (type: AlertType, value: boolean) => {
    if (!deviceId) return;
    try {
      await settingApis.updateAlertSetting({
        alertType: type,
        alertStatus: value ? 'CHECKED' : 'UNCHECKED',
        deviceId,
      });
    } catch (e) {
      console.error(e);
    } finally {
      await refetch();
    }
  };

  const handleUpdateLuckTime = async (time: string) => {
    if (!deviceId) return;
    try {
      await settingApis.setLuckMessageAlertTime({
        deviceId,
        luckMessageAlertTime: time,
      });
    } catch (e) {
      console.error(e);
    } finally {
      await refetch();
    }
  };

  const syncHasPermission = async () => {
    const isPermitted = await hasPermission();
    setShowPushSetting(isPermitted);
  };

  useAsyncEffect(syncHasPermission, []);
  useAppStateEffect(syncHasPermission, []);

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
            luckAlarmSound.play();
          }}
          text={'Lucky Drop'}
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
          value={setting?.luck === 'CHECKED'}
          onChange={(value) => handleUpdateAlarm('LUCK', value)}
        />
      </L.Row>
      {/* LUCK 시간 변경 */}
      {setting?.luck === 'CHECKED' && !!setting?.luckMessageAlertTime && (
        <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
          <Font type={'BODY_REGULAR'}>행운의 한마디 알림 시간</Font>
          <L.Row items="center" g={15}>
            <ButtonText
              onPress={() => {
                BottomSheet.show({
                  component: (
                    <SettingAlarmLuckTimePicker
                      onConfirmTime={handleUpdateLuckTime}
                      initialTime={setting?.luckMessageAlertTime}
                    />
                  ),
                });
              }}
              text={formatLuckTime(setting?.luckMessageAlertTime || '')}
              textColor="GREY1"
            />
            <SvgIcon name={'arrow_right_gray'} size={14} />
          </L.Row>
        </L.Row>
      )}
      {/* MISSION */}
      <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
        <L.Col g={8}>
          <Font type={'BODY_REGULAR'}>습관 알림</Font>
          <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
            매일 설정한 시간에 습관을 알려 드려요.
          </Font>
        </L.Col>
        <Toggle
          value={setting?.mission === 'CHECKED'}
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
          value={setting?.friend === 'CHECKED'}
          onChange={(value) => handleUpdateAlarm('FRIEND', value)}
        />
      </L.Row>
      {/* NOTICE */}
      <L.Col ph={25} pv={20} w="100%">
        <Font type="BODY_REGULAR" color="GREY1">
          럭키즈 소식
        </Font>
        <L.Row w="100%" pv={20} justify={'space-between'} items={'center'}>
          <L.Col g={8}>
            <Font type={'BODY_REGULAR'}>공지사항</Font>
            <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>
              업데이트, 이벤트, 콘텐츠 관련 마케팅 알림이에요.
            </Font>
          </L.Col>
          <Toggle
            value={setting?.notice === 'CHECKED'}
            onChange={(value) => handleUpdateAlarm('NOTICE', value)}
          />
        </L.Row>
      </L.Col>
    </FrameLayout>
  );
};
