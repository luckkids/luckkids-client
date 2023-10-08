import React, { JSX } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text } from 'react-native';
import { RecoilRoot } from 'recoil';
import { Layout as L } from '@design-system';
import { QueryClientProvider } from '@queries';

function FrameLayout(): JSX.Element {
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

export default FrameLayout;
