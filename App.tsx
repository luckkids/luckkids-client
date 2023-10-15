/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { RouteTabNavigator } from './src/route/route.tab.navigator';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flexGrow: 1 }}>
      <RecoilRoot>
        <ThemeProvider theme={Colors}>
          <QueryClientProvider>
            <RootNavigator />
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}

const RootNavigator = withGlobalComponents(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={RouteTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Misstion"
          component={RouteTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
