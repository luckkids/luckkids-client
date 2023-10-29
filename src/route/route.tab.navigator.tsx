import React, { useRef } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Garden } from '../page/Garden';
import { Home } from '../page/Home';
import { Mission } from '../page/Mission';
import { My } from '../page/My';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { IPage } from '../types/common/page.types';
import { PageSetting } from '@page/setting/page.setting';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={'홈'} component={HomeStackScreen} />
      <Tab.Screen name={'미션'} component={Mission} />
      <Tab.Screen name={'가든'} component={Garden} />
      <Tab.Screen name={'설정'} component={PageSetting} />
    </Tab.Navigator>
  );
};

// HomeStack 스크린
// 이쪽에 HomeTab이 활성화 되었을 때의 스크린들을 넣어주면 됨
const HomeStackScreen = () => {
  const HomeTestComponent = () => {
    return <Text>with bottomtab</Text>;
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="HomeTest" component={HomeTestComponent} />
    </Stack.Navigator>
  );
};
