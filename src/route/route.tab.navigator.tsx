import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';
import { CONSTANTS, Colors, FontSettings, SvgIcon } from '@design-system';
import { Garden } from '@page/Garden';
import { Home } from '@page/Home';
import { Mission } from '@page/Mission';
import { PageSetting } from '@page/setting/page.setting';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const BottomTabNavigator = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.TAB_BAR_BORDER_TOP,
          backgroundColor: Colors.TAB_BAR_BG,
          height: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.75,
          paddingBottom: bottom,
        },
        tabBarActiveTintColor: Colors.LUCK_GREEN,
        tabBarInactiveTintColor: Colors.GREY1,
        tabBarLabelStyle: {
          ...FontSettings['CAPTION2_SEMIBOLD'],
        },
        tabBarItemStyle: {
          marginBottom: 35,
          marginTop: 7,
          height: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
        },
      }}
    >
      <Tab.Screen
        name={'홈'}
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon name={focused ? 'iconHomeOn' : 'iconHomeOff'} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name={'습관'}
        component={Mission}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon
              name={focused ? 'iconMissionOn' : 'iconMissionOff'}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'가든'}
        component={Garden}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon
              name={focused ? 'iconGardenOn' : 'iconGardenOff'}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'설정'}
        component={PageSetting}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIcon
              name={focused ? 'iconSettingOn' : 'iconSettingOff'}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// HomeStack 스크린
// 이쪽에 HomeTab이 활성화 되었을 때의 스크린들을 넣어주면 됨
const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
