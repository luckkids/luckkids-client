import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Garden } from '../page/Garden';
import { Home } from '../page/Home';
import { Mission } from '../page/Mission';
import { My } from '../page/My';

const Tab = createBottomTabNavigator();
export const RouteTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'홈'} component={Home} />
      <Tab.Screen name={'미션'} component={Mission} />
      <Tab.Screen name={'가든'} component={Garden} />
      <Tab.Screen name={'마이'} component={My} />
    </Tab.Navigator>
  );
};
