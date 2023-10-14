/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { Colors, L } from '@design-system';
import { QueryClientProvider } from '@queries';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import LoadingIndicator from '@global-components/common/LoadingIndicator/LoadingIndicator';

/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';
import { QueryClientProvider } from '@queries';
import { RouteTabNavigator } from './src/route/route.tab.navigator';

const Stack = createNativeStackNavigator();*/

function App(): JSX.Element {
    const handlePressBottomSheet = () => {
        BottomSheet.show({
            component: <Text>내용</Text>,
        });
    };

    const handlePressAlertPopup = () => {
        AlertPopup.show({
            title: '제목',
            body: '내용',
            noText: '취소',
            yesText: '확인',
        });
    };

    const handlePressLoadingIndicator = () => {
        LoadingIndicator.show({});
        setTimeout(() => {
            LoadingIndicator.hide();
        }, 3000);
    };

  return (
      <RecoilRoot>
          <ThemeProvider theme={Colors}>
              <QueryClientProvider>
                  <SafeAreaView>
                      <StatusBar />
                      <ScrollView contentInsetAdjustmentBehavior="automatic">
                          <L.Row p={24}>
                              <Text>Luck Maker</Text>
                          </L.Row>
                          <L.Row>
                              <TouchableWithoutFeedback onPress={handlePressBottomSheet}>
                                  <Text>Bottom Sheet</Text>
                              </TouchableWithoutFeedback>
                          </L.Row>
                          <L.Row>
                              <TouchableWithoutFeedback onPress={handlePressAlertPopup}>
                                  <Text>Alert Popup</Text>
                              </TouchableWithoutFeedback>
                          </L.Row>
                          <L.Row>
                              <TouchableWithoutFeedback onPress={handlePressLoadingIndicator}>
                                  <Text>Loading Indicator</Text>
                              </TouchableWithoutFeedback>
                          </L.Row>
                      </ScrollView>
                  </SafeAreaView>
              </QueryClientProvider>
          </ThemeProvider>
      </RecoilRoot>
    /*<RecoilRoot>
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
    </RecoilRoot>*/
  );
}

export default App;
