import React, { JSX } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text } from 'react-native';
import { Layout as L } from '@design-system';

export const FrameLayout = (props: any) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <L.FlexRow>{props.children}</L.FlexRow>
      </ScrollView>
    </SafeAreaView>
  );
};
