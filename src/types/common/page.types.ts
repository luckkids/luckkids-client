import React, { Dispatch } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SocialType } from '../user';

export const DefaultTypeUnit = {
  CHECKED: 'CHECKED',
  UNCHECKED: 'UNCHECKED',
};
export type TCheck = 'CHECKED' | 'UNCHECKED';

export type AppScreens = keyof AppScreensParamList;

export type AppScreensParamList = {
  Home: undefined;
  Mission: undefined;
  Garden: undefined;
  My: undefined;
  StoryTelling: undefined;
  Login: undefined;
  LoginAlready: { type: SocialType };
  LoginJoinEmailConfirm: undefined;
  LoginJoin: { step: 'Id' | 'Password' };
  LoginId: undefined;
  LoginJoinAgreement: undefined;
  CharacterMake: undefined;
  CharacterSelect: undefined;
  CharacterName: undefined;
  HomeCalendar: undefined;
  HomeAlarm: undefined;
  HomeLevel: undefined;
  HomeComment: undefined;
  HomeProfile: undefined;
  MissionRepair: undefined;
  MissionAdd: undefined;
  GardenAlbum: undefined;
  GardenRank: undefined;
  Setting: undefined;
  SettingProfile: undefined;
  SettingComment: undefined;
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

export interface IMissionRepair extends IMissionData {
  statusCode: number;
  httpStatus: string;
  message: string;
  data: IMissionData;
}

interface IMissionData {
  WORK: Array<IMissionDataItem>;
  SELF_DEVELOPMENT: Array<IMissionDataItem>;
  HEALTH: Array<IMissionDataItem>;
  HOUSEKEEPING: Array<IMissionDataItem>;
  MINDSET: Array<IMissionDataItem>;
  SELF_CARE: Array<IMissionDataItem>;
}

interface IMissionDataItem {
  id: number;
  missionType: string;
  missionDescription: null | string;
  alertStatus: string;
  alertTime: string;
}

export interface IMissionListData {
  missionStatus: string;
  alertTime: string;
  id: number;
  missionDescription: string;
  setCount: Dispatch<number>;
}

export interface IGarden {
  myProfile:IGardenItem,
  friendList:IGardenItem
}

export interface IGardenItem{
  onPress: () => void;
  isSelf?:boolean;
  fileUrl:string;
  nickname:string;
  myId?:number;
  friendId?:number;
  characterCount:number;
  luckPhrases:string;
}

export interface ISettingAlarm {
  entire: TCheck;
  mission: TCheck;
  luck: TCheck;
  notice: TCheck;
}

export interface ISettingNotice {
  title: string;
  createdDate: string;
}
