/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import NavigationService from './src/libs/NavigationService';
import AppProviders from './App';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('[Firebase remote message on background] : ', remoteMessage);
});

notifee.onBackgroundEvent(async (event) => {
  console.log('[Notification on background] : ', event);
  if (event.type === EventType.PRESS) {
    console.log('onBackgroundEvent');
    console.log(event.detail.notification.data.screen);
    return NavigationService.navigate(event.detail.notification.data.screen);
  }
});

AppRegistry.registerComponent(appName, () => AppProviders);
