/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import BootSplash from 'react-native-bootsplash';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { DataStackScreen } from './src/data/data.stack.screen';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';
import useAsyncEffect from '@hooks/useAsyncEffect';  
import { IPage } from '@types-common/page.types';

const App: React.FC<IPage> = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        <SafeAreaProvider>
          <ThemeProvider theme={Colors}>
            <QueryClientProvider>
              <RootNavigator />
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

  useAsyncEffect(async () => {
    try {
      if (!initializing) {
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
    <NavigationContainer>
      <Stack.Navigator>
        {DataStackScreen.map((item, i) => {
          return (
            <Stack.Screen
              name={item.name}
              component={item.component}
              options={item.options ? item.options : { headerShown: false }}
              key={i}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
