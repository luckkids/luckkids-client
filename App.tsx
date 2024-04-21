import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigationState,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { rememberMeStorage } from '@storage';
import { DataStackScreen } from './src/data/data.stack.screen';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useLocalMessage from '@hooks/notification/useLocalMessage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { useFetch } from '@hooks/useFetch';
import NavigationService from '@libs/NavigationService';
import { AppScreensParamList, InitialRoute } from '@types-common/page.types';

const App: React.FC = () => {
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

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider>
        <RecoilRoot>
          <SafeAreaProvider>
            <ThemeProvider theme={Colors}>
              <NavigationContainer<AppScreensParamList>
                ref={navigationRef}
                onReady={async () => {
                  console.log('onReady');
                  if (!navigationRef.current) return;
                  NavigationService.setNavigation(navigationRef.current);
                }}
                onStateChange={onStateChange}
              >
                <RootNavigator />
              </NavigationContainer>
            </ThemeProvider>
          </SafeAreaProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const Stack = createNativeStackNavigator();

const RootNavigator = withGlobalComponents(() => {
  const { initialize: initializeFirebaseMessage } = useFirebaseMessage();
  const { initialize: initializeLocalMessage } = useLocalMessage();
  const [initialRoute, setInitialRoute] = useState<InitialRoute>({
    screeName: undefined,
    screenParams: undefined,
  });

  const { onFetch: login } = useFetch({
    method: 'POST',
    url: '/auth/login',
    onSuccessCallback: () => {
      setInitialRoute({
        screeName: 'Home',
        screenParams: undefined,
      });
    },
    onFailCallback: () => {
      return;
    },
  });

  useEffect(() => {
    initializeFirebaseMessage();
    initializeLocalMessage();
  }, []);

  useEffect(() => {
    // 자동 로그인
    const rememberMeInfo = rememberMeStorage.getItem();
    console.log('rememberMeInfo ====>', rememberMeInfo);
    if (rememberMeInfo) {
      login(rememberMeInfo);
    }
  }, []);

  return (
    <Stack.Navigator initialRouteName={initialRoute.screeName}>
      {DataStackScreen.map((item) => {
        return (
          <Stack.Screen
            name={item.name}
            component={item.component}
            options={{ headerShown: false, ...item.options }}
            key={item.name}
          />
        );
      })}
    </Stack.Navigator>
  );
});

export default App;
