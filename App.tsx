/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { BottomTabNavigator } from './src/route/route.tab.navigator';
import withGlobalComponents from '@hooks/hoc/withGlobalComponents';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Colors}>
        <QueryClientProvider>
          <RootNavigator />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

const RootNavigator = withGlobalComponents(() => {
  const TestComponent = () => {
    return <Text>without bottomtab</Text>;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        {/* 바텀탭 필요없는 스크린들 */}
        <Stack.Screen
          name="Test"
          component={TestComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
