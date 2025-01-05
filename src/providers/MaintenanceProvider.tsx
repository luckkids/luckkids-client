import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';

const DEFAULT_VALUES = {
  is_maintenance: false,
  maintenance_message: '',
};

const MaintenanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');

  useEffect(() => {
    const initializeRemoteConfig = async () => {
      try {
        // 기본값 설정
        await remoteConfig().setDefaults(DEFAULT_VALUES);

        // 빠른 fetch를 위한 설정 (개발 환경에서는 0으로 설정)
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: __DEV__ ? 0 : 3600000, // 프로덕션에서 1시간
        });

        // Remote Config 데이터 가져오기
        await remoteConfig().fetchAndActivate();

        // 값 적용
        const maintenance = remoteConfig()
          .getValue('is_maintenance')
          .asBoolean();
        const message = remoteConfig()
          .getValue('maintenance_message')
          .asString();

        setIsInMaintenance(maintenance);
        setMaintenanceMessage(message);
        setIsLoading(false);
      } catch (error) {
        console.error('Remote config fetch failed:', error);
        setIsLoading(false);
      }
    };

    initializeRemoteConfig();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isInMaintenance) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>시스템 점검 안내</Text>
        <Text style={styles.message}>{maintenanceMessage}</Text>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  endTime: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
});

export default MaintenanceProvider;
