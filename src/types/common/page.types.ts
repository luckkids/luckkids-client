import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

export enum AppScreens {
  Home = 'Home',
  Mission = 'Mission',
  Garden = 'Garden',
  My = 'My',
  Tutorial = 'tutorial',
  Login = 'login',
  LoginJoinId = 'login.join.id',
  LoginJoinPass = 'login.join.pass',
  LoginId = 'login.id',
  CharacterMake = 'character.make',
  CharacterSelect = 'character.select',
  CharacterName = 'character.name',
  HomeCalendar = 'home.calendar',
  HomeLevel = 'home.level',
  MissionRepair = 'mission.repair',
  GardenAlbum = 'garden.album',
  GardenRank = 'garden.rank',
  Setting = 'setting',
  SettingProfile = 'setting.profile',
  SettingAlarm = 'setting.alarm',
  SettingInfo = 'setting.info',
  SettingSecurity = 'setting.security',
  SettingSecurityPass = 'setting.security.pass',
  SettingAccount = 'setting.account',
}

type AppScreensParamList = ParamListBase & {
  Home: undefined;
  Mission: undefined;
  Garden: undefined;
  My: undefined;
  TutorialStart: undefined;
  TutorialSurvey: undefined;
};

export interface IStackScreen {
  name: AppScreens;
  component: React.FC<IPage>;
  options?: NativeStackNavigationOptions | undefined;
}

export interface IPage {
  navigation: NativeStackNavigationProp<AppScreensParamList>;
}
