import { useCallback } from 'react';
import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';

type LocalMessage = {
  title: string;
  body: string;
};

const useLocalMessage = () => {
  const hasNotificationPermission = useCallback(async () => {
    const settings = await notifee.getNotificationSettings();

    return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
  }, []);

  const initialize = useCallback(() => {
    notifee.onForegroundEvent((event) => {
      if (event.type === EventType.PRESS) {
        const url = event.detail.notification?.data?.url;
        if (typeof url !== 'string') return;
      }
    });
  }, []);

  const requestPermission = useCallback(async () => {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      // 알림 권한 필요 alert?
    }
  }, []);

  const displayNotification = useCallback(async (message: LocalMessage) => {
    const { title, body, ...data } = message;
    notifee.displayNotification({
      title,
      body,
      data,
    });
  }, []);

  return {
    initialize,
    requestPermission,
    displayNotification,
    hasNotificationPermission,
  };
};

export default useLocalMessage;
