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
import { DataStackScreen } from './src/data/data.stack.screen';
import { IPage } from './src/types/common/page.types';

const App: React.FC<IPage> = () => {
  const Stack = createNativeStackNavigator();
  return (
    <RecoilRoot>
      <ThemeProvider theme={Colors}>
        <QueryClientProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {DataStackScreen.map((item, i) => {
                return (
                  <Stack.Screen
                    name={item.name}
                    component={item.component}
                    options={item.options}
                    key={i}
                  />
                );
              })}
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
