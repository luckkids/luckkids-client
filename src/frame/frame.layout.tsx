import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

interface IProps {
  children: React.ReactNode;
}

export const FrameLayout: React.FC<IProps> = (props) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};
