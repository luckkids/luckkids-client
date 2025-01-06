import React, { useEffect, useState } from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import FastImage from 'react-native-fast-image';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L } from '@design-system';
import { FrameLayout } from '@frame/frame.layout';

const DEFAULT_VALUES = {
  maintenance_on: false,
  maintenance_message:
    '더 나은 서비스를 위해 시스템 점검을 진행 중이에요.\n조금만 기다려주시면 빠르게 돌아올게요!',
  maintenance_start_at: '',
  maintenance_end_at: '',
};

const bgImage = require('assets/images/home-calendar-bg.png');
const systemCheckerIcon = require('assets/images/system-checker-icon.png');

const MaintenanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const initializeRemoteConfig = async () => {
      try {
        // 기본값 설정
        await remoteConfig().setDefaults(DEFAULT_VALUES);

        // 빠른 fetch를 위한 설정 (개발 환경에서는 0으로 설정)
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: __DEV__ ? 0 : 900000, // 프로덕션에서 1시간
        });

        // Remote Config 데이터 가져오기
        await remoteConfig().fetchAndActivate();

        // 값 적용
        const maintenance = remoteConfig()
          .getValue('maintenance_on')
          .asBoolean();
        const message = remoteConfig()
          .getValue('maintenance_message')
          .asString();
        const startTime = remoteConfig()
          .getValue('maintenance_start_at')
          .asString();
        const endTime = remoteConfig()
          .getValue('maintenance_end_at')
          .asString();

        setIsInMaintenance(maintenance);
        setMaintenanceMessage(message);
        setStartTime(startTime);
        setEndTime(endTime);
      } catch (error) {
        console.error('Remote config fetch failed:', error);
      }
    };

    initializeRemoteConfig();
  }, []);

  if (isInMaintenance) {
    return (
      <FrameLayout statusBarColor="HOME_CALENDAR_BG" backgroundImage={bgImage}>
        <L.Col ph={DEFAULT_MARGIN} items="center" justify="center" mt={200}>
          <L.Row w={80} h={60}>
            <FastImage
              source={systemCheckerIcon}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </L.Row>
          <Font type="TITLE2_BOLD" color="WHITE" mt={30} mb={20}>
            럭키즈는 점검 중
          </Font>
          <Font type="SUBHEADLINE_REGULAR" color="GREY0" textAlign="center">
            {maintenanceMessage}
          </Font>
          {startTime && endTime && (
            <Font type="SUBHEADLINE_REGULAR" color="GREY0" mt={20}>
              {'점검 시간 : ' + startTime + ' ~ ' + endTime}
            </Font>
          )}
        </L.Col>
      </FrameLayout>
    );
  }

  return children;
};

export default MaintenanceProvider;
