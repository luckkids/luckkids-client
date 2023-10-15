/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors } from '@design-system';
import { QueryClientProvider } from '@queries';
import { RouteTabNavigator } from './src/route/route.tab.navigator';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <ThemeProvider theme={Colors}>
        <QueryClientProvider>
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
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
