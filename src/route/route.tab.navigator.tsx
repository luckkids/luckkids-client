import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { CONSTANTS, FontSettings } from '@design-system';
import { Garden } from '@page/Garden';
import { Home } from '@page/Home';
import { Mission } from '@page/Mission';
import { PageSetting } from '@page/setting/page.setting';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.BG_PRIMARY,
          height: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
        },
        tabBarActiveTintColor: theme.LUCK_GREEN,
        tabBarInactiveTintColor: theme.GREY1,
        tabBarLabelStyle: {
          ...FontSettings['CAPTION2_SEMIBOLD'],
        },
      }}
    >
      <Tab.Screen name={'홈'} component={HomeStackScreen} />
      <Tab.Screen name={'습관'} component={Mission} />
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
