import React from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

/**
 * 임시로 any 타입 지정
 * todo: 세팅 후 타입 생성하기
 * */

export const FrameLayout = (props: any) => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
};
