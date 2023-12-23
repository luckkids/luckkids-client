import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { CONSTANTS, FontSettings, SvgIcon } from '@design-system';
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
          borderTopWidth: 1,
          borderTopColor: theme.TAB_BAR_BORDER_TOP,
          backgroundColor: theme.TAB_BAR_BG,
          height: CONSTANTS.BOTTOM_TABBAR_HEIGHT,
        },
        tabBarActiveTintColor: theme.LUCK_GREEN,
        tabBarInactiveTintColor: theme.GREY1,
        tabBarLabelStyle: {
          ...FontSettings['CAPTION2_SEMIBOLD'],
        },
        tabBarItemStyle: {
          marginBottom: 35,
          marginTop: 7,
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
