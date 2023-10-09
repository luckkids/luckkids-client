import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Layout as L } from '@design-system';

/**
 * 임시로 any 타입 지정
 * todo: 세팅 후 타입 생성하기
 * */
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
