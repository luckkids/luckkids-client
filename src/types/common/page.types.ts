import React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export type AppScreens = keyof AppScreensParamList;

export type AppScreensParamList = {
  Home: undefined;
  Mission: undefined;
  Garden: undefined;
  My: undefined;
  StoryTelling: undefined;
  Login: undefined;
  LoginJoin: undefined;
  LoginId: undefined;
  LoginAgreement: undefined;
  CharacterMake: undefined;
  CharacterSelect: undefined;
  CharacterName: undefined;
  HomeCalendar: undefined;
  HomeAlarm: undefined;
  HomeLevel: undefined;
  HomeComment: undefined;
  MissionRepair: undefined;
  MissionAdd: undefined;
  GardenAlbum: undefined;
  GardenRank: undefined;
  Setting: undefined;
  SettingProfile: undefined;
  SettingAlarm: undefined;
  SettingInfo: undefined;
  SettingSecurity: undefined;
  SettingSecurityPass: undefined;
  SettingNotice: undefined;
  SettingAccount: undefined;
  WebView: { url: string; title?: string };
};

export interface IStackScreen {
  name: AppScreens;
  component: React.FC;
  options?: NativeStackNavigationOptions | undefined;
}

export interface IPage<
  T extends keyof AppScreensParamList = keyof AppScreensParamList,
> {
  navigation: NativeStackNavigationProp<AppScreensParamList, T>;
  route: RouteProp<AppScreensParamList, T>;
}
