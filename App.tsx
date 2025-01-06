import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  NavigationContainer,
  NavigationState,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Sentry from '@sentry/react-native';
import LottieView from 'lottie-react-native';
import CodePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { SocialType } from '@types-index';
import { subscribeBranch } from '@utils';
import { DataStackScreen } from './src/data/data.stack.screen';
import FramePopup from '@frame/frame.popup';
import useAuth from '@hooks/auth/useAuth';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useLocalMessage from '@hooks/notification/useLocalMessage';
import { RememberMeType, StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAppStateEffect from '@hooks/useAppStateEffect';
import useAsyncEffect from '@hooks/useAsyncEffect';
import useGoogleAnalytics from '@hooks/useGoogleAnalytics';
import Logger from '@libs/LoggerService';
import NavigationService from '@libs/NavigationService';
import MaintenanceProvider from '@providers/MaintenanceProvider';
import { RecoilDevice } from '@recoil/recoil.device';
import { AppScreensParamList, InitialRoute } from '@types-common/page.types';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

GoogleSignin.configure({
  iosClientId:
    '564720223619-gvfibb7hfl1j6kktgmr2g9v9pbqs9lm7.apps.googleusercontent.com',
  webClientId:
    '564720223619-gvfibb7hfl1j6kktgmr2g9v9pbqs9lm7.apps.googleusercontent.com',
  offlineAccess: true,
});

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef<AppScreensParamList>();
  const screenName = useRef<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const { getToken } = useFirebaseMessage();
  const { logScreenView, logEvent } = useGoogleAnalytics();
  const screenEntryTime = useRef<number | null>(null);

  const onStateChange = (state: NavigationState | undefined) => {
    if (!state) return;

    const routeName = navigationRef.current?.getCurrentRoute()?.name || null;

    // 이전 화면의 조회 시간과 체류 시간을 함께 기록
    if (screenName.current && screenEntryTime.current) {
      const timeSpent = Date.now() - screenEntryTime.current;
      logEvent({
        eventName: 'VIEW_PAGE',
        params: {
          screen_name: screenName.current,
          duration: timeSpent,
        },
      });
    }

    // 새로운 화면 진입 시간 기록
    screenEntryTime.current = Date.now();
    screenName.current = routeName;

    if (routeName) {
      logScreenView(routeName);
    }

    NavigationService.setScreenContext({
      prevScreenName: screenName.current || 'never',
      currentScreenName: routeName || 'never',
    });
  };

  const { initialize: initializeFirebaseMessage, requestPermissionIfNot } =
    useFirebaseMessage();
  const { initialize: initializeLocalMessage } = useLocalMessage();
  const [initialRoute, setInitialRoute] = useState<InitialRoute>({
    screenName: 'Login',
    screenParams: undefined,
  });

  const {
    getCurrentValue: getCurrentRememberMe,
    loading: isLoadingRememberMe,
  } = useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const { storedValue: storyTelling, loading: isLoadingStoryTelling } =
    useAsyncStorage<StorageKeys.StoryTelling>(StorageKeys.StoryTelling);

  const { login, oauthLogin } = useAuth();
  const { deviceId } = useRecoilValue(RecoilDevice);

  const handleRememberMeLogin = async (rememberMe: RememberMeType) => {
    const pushKey = await getToken();

    Logger.info('handleRememberMeLogin', {
      deviceId: deviceId,
      rememberMe: rememberMe,
    });

    if (!deviceId) return;
    const res =
      rememberMe.snsType === 'NORMAL'
        ? await login({
            email: rememberMe.email || '',
            password: rememberMe.credential,
            pushKey,
            deviceId,
          })
        : await oauthLogin({
            snsType: rememberMe.snsType as SocialType,
            token: rememberMe.credential,
            pushKey,
            deviceId,
          });

    console.log('handleRememberMeLogin result', res);
    Logger.info('handleRememberMeLogin result', {
      res,
    });

    if (!res) {
      return setInitialRoute({
        screenName: 'Login',
        screenParams: undefined,
      });
    } else {
      console.log('typeof res', typeof res);

      if (typeof res === 'string') return;
      return setInitialRoute({
        screenName: res.settingStatus === 'COMPLETE' ? 'Home' : 'TutorialStart',
        screenParams: undefined,
      });
    }
  };

  useEffect(() => {
    console.log('__DEV__', __DEV__);
    // 코드 푸시 DEV 에서 테스트하는 경우 아니면 return 해두기
    if (__DEV__) return;

    CodePush.checkForUpdate().then((remotePackage) => {
      if (!remotePackage) {
        return console.log('[CodePush] package is up to date');
      }

      if (remotePackage.isMandatory) {
        return navigationRef.current?.reset({
          index: 0,
          routes: [{ name: 'UpdateScreen', params: { remotePackage } }],
        });
      }

      navigationRef.current?.navigate('UpdateScreen', {
        remotePackage,
      });
    });
  }, []);

  useAsyncEffect(async () => {
    try {
      if (!initializing) {
        // push 관련 initializing
        await initializeFirebaseMessage();
        initializeLocalMessage();

        // status bar 색은 항상 light-content
        // NEXT: 다크모드 테마 생기면 변경 필요
        StatusBar.setBarStyle('light-content', true);

        // Fast refresh 때 아래 로직 자꾸 도는거 방지
        return console.log('App Reload');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitializing(false);
    }
  }, [initializing]);

  useEffect(() => {
    if (isNavigationReady) {
      const unsubscribeBranch = subscribeBranch(navigationRef);

      return () => {
        if (unsubscribeBranch) {
          unsubscribeBranch();
        }
      };
    }
  }, [isNavigationReady]);

  useAsyncEffect(async () => {
    if (isLoadingRememberMe || isLoadingStoryTelling) return;
    const currentRememberMe = await getCurrentRememberMe();

    Logger.info('Arrived App.tsx & checking currentRememberMe', {
      email: currentRememberMe?.email,
      snsType: currentRememberMe?.snsType,
      isEnabled: currentRememberMe?.isEnabled,
      credential: currentRememberMe?.credential,
    });

    if (!storyTelling || !storyTelling.viewed) {
      setInitialRoute({
        screenName: 'StoryTelling',
        screenParams: undefined,
      });
    } else if (currentRememberMe && !!currentRememberMe.isEnabled) {
      console.log('[currentRemermberMe]', currentRememberMe);

      Logger.info('Arrived App.tsx & trying to login with rememberMe', {
        email: currentRememberMe?.email,
        snsType: currentRememberMe?.snsType,
        isEnabled: currentRememberMe?.isEnabled,
        credential: currentRememberMe?.credential,
      });

      await handleRememberMeLogin({
        ...currentRememberMe,
      });
    } else {
      setInitialRoute({
        screenName: 'Login',
        screenParams: undefined,
      });
    }

    // 로딩 화면 2초동안 보여줌
    setTimeout(() => {
      setIsNavigationReady(true);
    }, 2000);
  }, [storyTelling, isLoadingRememberMe, isLoadingStoryTelling, initializing]);

  useAsyncEffect(async () => {
    // 최초에 한번 notification permission 요청
    // NOTE: 한번 거절하면 그 뒤로는 요청하지 않음
    await requestPermissionIfNot();
  }, []);

  useAppStateEffect((event) => {
    if (event === 'background' || event === 'inactive') {
      if (screenName.current && screenEntryTime.current) {
        const timeSpent = Date.now() - screenEntryTime.current;
        // 현재 화면의 조회와 체류 시간 기록
        logEvent({
          eventName: 'VIEW_PAGE',
          params: {
            screen_name: screenName.current,
            duration: timeSpent,
          },
        });
        // 앱 종료 이벤트 기록
        logEvent({
          eventName: 'EXIT_APP',
          params: {
            screen_name: screenName.current,
          },
        });
      }
    } else if (event === 'active') {
      // 앱이 다시 활성화될 때 시간 리셋
      screenEntryTime.current = Date.now();
    }
  }, []);

  if (!isNavigationReady) {
    return (
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('assets/lotties/levelup-motion-2.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <NavigationContainer<AppScreensParamList>
      ref={navigationRef}
      onReady={async () => {
        if (!navigationRef.current) return;
        NavigationService.setNavigation(navigationRef.current);
      }}
      onStateChange={onStateChange}
    >
      <Stack.Navigator initialRouteName={initialRoute.screenName}>
        {DataStackScreen.map((item) => {
          return (
            <Stack.Screen
              name={item.name}
              component={item.component}
              options={{ ...item.options, headerShown: false }}
              key={item.name}
            />
          );
        })}
      </Stack.Navigator>
      <FramePopup />
    </NavigationContainer>
  );
};

const WrappedRootNavigator = withGlobalComponents(RootNavigator);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={Colors}>
            <RecoilRoot>
              <MaintenanceProvider>
                <WrappedRootNavigator />
              </MaintenanceProvider>
            </RecoilRoot>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    // 새로 추가된 스타일
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.LUCK_GREEN,
  },
});

export default Sentry.wrap(CodePush(codePushOptions)(App));
