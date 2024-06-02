import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import CodePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { DataStackScreen } from './src/data/data.stack.screen';
import { LoginRequest } from '@apis/auth';
import useAuth from '@hooks/auth/useAuth';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useLocalMessage from '@hooks/notification/useLocalMessage';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import NavigationService from '@libs/NavigationService';
import { AppScreensParamList, InitialRoute } from '@types-common/page.types';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef<AppScreensParamList>();
  const screenName = useRef<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  const onStateChange = (state: NavigationState | undefined) => {
    if (!state) return;

    const routeName = navigationRef.current?.getCurrentRoute()?.name || null;

    NavigationService.setScreenContext({
      prevScreenName: screenName.current || 'never',
      currentScreenName: routeName || 'never',
    });

    screenName.current = routeName;
  };

  const { initialize: initializeFirebaseMessage } = useFirebaseMessage();
  const { initialize: initializeLocalMessage } = useLocalMessage();
  const [initialRoute, setInitialRoute] = useState<InitialRoute>({
    screenName: 'Login',
    screenParams: undefined,
  });

  const { storedValue: rememberMe, loading: isLoadingRememberMe } =
    useAsyncStorage<StorageKeys.RememberMe>(StorageKeys.RememberMe);

  const { storedValue: storyTelling, loading: isLoadingStoryTelling } =
    useAsyncStorage<StorageKeys.StoryTelling>(StorageKeys.StoryTelling);

  const { login } = useAuth();

  const handleLogin = async (loginInfo: LoginRequest) => {
    const res = await login(loginInfo);
    if (!res) {
      return setInitialRoute({
        screenName: 'Login',
        screenParams: undefined,
      });
    } else {
      return navigationRef.current?.reset({
        index: 0,
        routes: [
          { name: res.settingStatus === 'COMPLETE' ? 'Home' : 'TutorialStart' },
        ],
      });
    }
  };

  useEffect(() => {
    initializeFirebaseMessage();
    initializeLocalMessage();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  useEffect(() => {
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
        // Fast refresh 때 아래 로직 자꾸 도는거 방지
        return console.log('App Reload');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitializing(false);
      await BootSplash.hide({ fade: true });
    }
  }, [initializing]);

  useAsyncEffect(async () => {
    if (isLoadingRememberMe || isLoadingStoryTelling) return;

    // 스토리텔링
    console.log('storyTelling ====>', storyTelling);
    if (!storyTelling || !storyTelling.viewed) {
      return navigationRef.current?.reset({
        index: 0,
        routes: [{ name: 'StoryTelling' }],
      });
    }

    // 자동 로그인
    console.log('rememberMe ====>', rememberMe);
    if (rememberMe) {
      handleLogin({
        email: rememberMe.email,
        password: rememberMe.password,
        deviceId: rememberMe.deviceId,
        pushKey: rememberMe.pushKey,
      });
    } else {
      setInitialRoute({
        screenName: 'Login',
        screenParams: undefined,
      });
    }
  }, [rememberMe, storyTelling, isLoadingRememberMe, isLoadingStoryTelling]);

  return (
    <NavigationContainer<AppScreensParamList>
      ref={navigationRef}
      onReady={async () => {
        console.log('onReady');
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

export default App;
