import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  LinkingOptions,
  NavigationContainer,
  NavigationState,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import BootSplash from 'react-native-bootsplash';
import CodePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { SocialType } from '@types-index';
import { DataStackScreen } from './src/data/data.stack.screen';
import useAuth from '@hooks/auth/useAuth';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useLocalMessage from '@hooks/notification/useLocalMessage';
import { RememberMeType, StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import NavigationService from '@libs/NavigationService';
import { AppScreensParamList, InitialRoute } from '@types-common/page.types';
import useAppStateEffect from '@hooks/useAppStateEffect';
import { DEEP_LINK_BASE_URL } from '@utils';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef<AppScreensParamList>();
  const screenName = useRef<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isNavigationReady, setIsNavigatorReady] = useState(false);

  const [deviceId, setDeviceId] = useState('');
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

  const { login, oauthLogin } = useAuth();

  const handleRememberMeLogin = async (rememberMe: RememberMeType) => {
    const pushKey = await getToken();
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
      return setInitialRoute({
        screenName: res.settingStatus === 'COMPLETE' ? 'Home' : 'TutorialStart',
        screenParams: undefined,
      });
    }
  };

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
    await BootSplash.hide({ fade: false });
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

  useAsyncEffect(async () => {
    if (isLoadingRememberMe || isLoadingStoryTelling) return;

    if (!storyTelling || !storyTelling.viewed) {
      setInitialRoute({
        screenName: 'StoryTelling',
        screenParams: undefined,
      });
    } else if (rememberMe) {
      await handleRememberMeLogin({
        ...rememberMe,
      });
    } else {
      setInitialRoute({
        screenName: 'Login',
        screenParams: undefined,
      });
    }

    // 로딩 화면 3초동안 보여줌
    setTimeout(() => {
      setIsNavigatorReady(true);
    }, 3000);
  }, [rememberMe, storyTelling, isLoadingRememberMe, isLoadingStoryTelling]);

  useAsyncEffect(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    setDeviceId(deviceId);
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

  const linking: LinkingOptions<AppScreensParamList> = {
    prefixes: [DEEP_LINK_BASE_URL], // 앱의 URL 스킴과 도메인을 여기에 지정
    config: {
      screens: {
        //TODO 여기에 각 화면의 이름과 경로를 지정
        // Home: 'home',
      },
    },
  };

  return (
    <NavigationContainer<AppScreensParamList>
      ref={navigationRef}
      onReady={async () => {
        if (!navigationRef.current) return;
        NavigationService.setNavigation(navigationRef.current);
      }}
      onStateChange={onStateChange}
      linking={linking}
    >
      {initializing ? ( // 초기화 중일 때 LottieView를 보여줌
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('assets/lotties/levelup-motion-2.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      ) : (
        // 초기화가 완료되면 Stack.Navigator를 보여줌
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
      )}
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
    backgroundColor: '#fff', // BootSplash 배경색과 동일하게 설정
  },
});

export default App;
