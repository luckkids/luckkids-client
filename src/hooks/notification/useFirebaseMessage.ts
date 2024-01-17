import { useCallback } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import useLocalMessage from './useLocalMessage';

const useFirebaseMessage = () => {
  const { displayNotification } = useLocalMessage();

  const handleOnMessage = useCallback(
    (e: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('[Firebase Remote Message] : ', e);

      const { notification, data } = e;

      if (!notification) return;

      displayNotification({
        title: notification.title || '',
        body: notification.body || '',
        ...data,
      });
    },
    [],
  );

  // ref: https://rnfirebase.io/messaging/usage
  const isPermitted = (
    status: FirebaseMessagingTypes.AuthorizationStatus,
  ): boolean => {
    return (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  // permission 이 없으면 요청한다. 있으면 패스니까 언제든지 불러도 괜찮다.
  const requestPermissionIfNot = async (): Promise<boolean> => {
    let enabled = isPermitted(await messaging().hasPermission());
    if (!enabled) {
      enabled = isPermitted(await messaging().requestPermission());
    }

    return enabled;
  };

  const hasPermission = async (): Promise<boolean> =>
    isPermitted(await messaging().hasPermission());

  const initialize = useCallback(async () => {
    messaging().onMessage(handleOnMessage);
  }, []);

  const updatePushToken = useCallback(async () => {
    if (await DeviceInfo.isEmulator()) return;
    try {
      if (!(await requestPermissionIfNot())) {
        return console.log(
          '[Firebase Device Token]: user rejected push permission',
        );
      }
      const pushToken = await messaging().getToken();
      console.log('[Firebase Device Token] : ', pushToken);
      // TODO push token update api
    } catch (e) {
      console.log(e);
    }
  }, []);

  const deletePushToken = useCallback(async () => {
    if (await DeviceInfo.isEmulator()) return;
    try {
      // TODO push token delete api
      await messaging().deleteToken();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return {
    initialize,
    hasPermission,
    requestPermissionIfNot,
    deletePushToken,
    updatePushToken,
  };
};

export default useFirebaseMessage;
