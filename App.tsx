/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { QueryClientProvider } from '@queries';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import { Layout as L } from '@design-system';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      {/* <ThemeProvider theme={Colors}> */}
      <QueryClientProvider>
        <SafeAreaView>
          <StatusBar />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <L.FlexRow>
              <Text>Luck Maker</Text>
            </L.FlexRow>
          </ScrollView>
        </SafeAreaView>
      </QueryClientProvider>
      {/* </ThemeProvider> */}
    </RecoilRoot>
  );
}

export default App;
