import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CONSTANTS, Colors, FontSettings, SvgIcon } from '@design-system';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import useHapticFeedback from '@hooks/useHapticFeedback';
import { Garden } from '@page/Garden';
import { Home } from '@page/Home';
import { Mission } from '@page/Mission';
import { PageSetting } from '@page/setting/page.setting';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const BottomTabNavigator = () => {
  const { bottom } = useSafeAreaInsets();

  const { haptic } = useHapticFeedback();

  const { setValue: setMissionRepairAvailableTooltip } =
    useAsyncStorage<StorageKeys.MissionRepairAvailableTooltip>(
      StorageKeys.MissionRepairAvailableTooltip,
    );

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
          opacity: 0.8,
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
        listeners={{
          tabPress: haptic,
        }}
      />
      <Tab.Screen
        name={'Mission'}
        component={Mission}
        options={{
          tabBarLabel: '습관',
          tabBarIcon: ({ focused }) => (
            <SvgIcon
              name={focused ? 'iconMissionOn' : 'iconMissionOff'}
              size={20}
            />
          ),
        }}
        listeners={{
          tabPress: async (e) => {
            haptic();
            await setMissionRepairAvailableTooltip({
              viewed: true,
            });
          },
        }}
      />
      <Tab.Screen
        name={'Garden'}
        component={Garden}
        options={{
          tabBarLabel: '가든',
          tabBarIcon: ({ focused }) => (
            <SvgIcon
              name={focused ? 'iconGardenOn' : 'iconGardenOff'}
              size={20}
            />
          ),
        }}
        listeners={{
          tabPress: haptic,
        }}
      />
      <Tab.Screen
        name={'Setting'}
        component={PageSetting}
        options={{
          tabBarLabel: '설정',
          tabBarIcon: ({ focused }) => (
            <SvgIcon
              name={focused ? 'iconSettingOn' : 'iconSettingOff'}
              size={20}
            />
          ),
        }}
        listeners={{
          tabPress: haptic,
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
