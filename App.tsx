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
import { DataStackScreen } from './src/data/data.stack.screen';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useLocalMessage from '@hooks/notification/useLocalMessage';
import useAsyncEffect from '@hooks/useAsyncEffect';
import NavigationService from '@libs/NavigationService';
import { AppScreensParamList } from '@types-common/page.types';

const App: React.FC = () => {
  const navigationRef = useNavigationContainerRef<AppScreensParamList>();
  const screenName = useRef<string | null>(null);

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <SafeAreaProvider>
          <ThemeProvider theme={Colors}>
            <QueryClientProvider>
              <NavigationContainer<AppScreensParamList>
                ref={navigationRef}
                onReady={() => {
                  console.log('onReady');
                  if (!navigationRef.current) return;
                  NavigationService.setNavigation(navigationRef.current);
                }}
                onStateChange={onStateChange}
              >
                <RootNavigator />
              </NavigationContainer>
            </QueryClientProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
};

const Stack = createNativeStackNavigator();

const RootNavigator = withGlobalComponents(() => {
  const [initializing, setInitializing] = useState(true);
  const {
    initialize: initializeFirebaseMessage,
    getToken,
    requestPermissionIfNot,
  } = useFirebaseMessage();
  const { initialize: initializeLocalMessage } = useLocalMessage();

  useAsyncEffect(async () => {
    try {
      if (!initializing) {
        console.log('App Reload');
        await initializeFirebaseMessage();
        initializeLocalMessage();
        // NavigationService.setNavigation();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitializing(false);
      await BootSplash.hide({ fade: true });
    }
  }, [initializing]);

  return (
    <Stack.Navigator>
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
