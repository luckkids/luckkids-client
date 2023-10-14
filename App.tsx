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
  );
}

export default App;
