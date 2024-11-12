import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import useAsyncEffect from '@hooks/useAsyncEffect';
import NavigationService from '@libs/NavigationService';
import { RecoilDevice } from '@recoil/recoil.device';
import { AppScreensParamList, InitialRoute } from '@types-common/page.types';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef<AppScreensParamList>();
  const screenName = useRef<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const { getToken } = useFirebaseMessage();

  const onStateChange = (state: NavigationState | undefined) => {
    if (!state) return;

    const routeName = navigationRef.current?.getCurrentRoute()?.name || null;

    NavigationService.setScreenContext({
      prevScreenName: screenName.current || 'never',
      currentScreenName: routeName || 'never',
    });

    screenName.current = routeName;
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

    if (!res) {
      return setInitialRoute({
        screenName: 'Login',
        screenParams: undefined,
      });
    } else {
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
        initializeFirebaseMessage();
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

    if (!storyTelling || !storyTelling.viewed) {
      setInitialRoute({
        screenName: 'StoryTelling',
        screenParams: undefined,
      });
    } else if (currentRememberMe && !!currentRememberMe.isEnabled) {
      console.log('[currentRememberMe]', currentRememberMe);

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
  }, [storyTelling, isLoadingRememberMe, isLoadingStoryTelling]);

  useAsyncEffect(async () => {
    // 최초에 한번 notification permission 요청
    // NOTE: 한번 거절하면 그 뒤로는 요청하지 않음
    await requestPermissionIfNot();
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

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={Colors}>
          <RecoilRoot>
            <WrappedRootNavigator />
          </RecoilRoot>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  </GestureHandlerRootView>
);

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

export default CodePush(codePushOptions)(App);
