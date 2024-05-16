import React, { Dispatch } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SocialType } from '../user';

export const DefaultTypeUnit = {
  CHECKED: 'CHECKED',
  UNCHECKED: 'UNCHECKED',
};
export type TCheck = 'CHECKED' | 'UNCHECKED';

export type AppScreens = keyof AppScreensParamList;

export type InitialRoute = {
  screenName: AppScreens | undefined;
  screenParams: AppScreensParamList[AppScreens] | undefined;
};

export type AppScreensParamList = {
  StoryTelling: undefined;
  Login: undefined;
  LoginAlready: { type: SocialType };
  LoginJoin: { step: 'Id' | 'Password' };
  LoginJoinEmailConfirm: undefined;
  LoginId: undefined;
  LoginJoinAgreement: undefined;
  TutorialStart: undefined;
  TutorialGuide: undefined;
  TutorialSettingCharacter: undefined;
  TutorialSettingMission: undefined;
  TutorialSettingNoti: undefined;
  CharacterMake: undefined;
  CharacterSelect: undefined;
  CharacterName: undefined;
  Home: undefined;
  HomeAlarm: undefined;
  HomeCalendar: undefined;
  HomeLevel: undefined;
  HomeProfile: undefined;
  Mission: undefined;
  MissionRepair: undefined;
  MissionAdd: undefined;
  GardenAlbum: undefined;
  GardenRank: undefined;
  Setting: undefined;
  SettingProfile: undefined;
  SettingComment: undefined;
  SettingAlarm: undefined;
  SettingInfo: undefined;
  SettingNotice: undefined;
  SettingSecurityPass: undefined;
  SettingAccount: undefined;
  WebView: { url: string; title?: string };
  Garden: undefined;
  My: undefined;
  HomeComment: undefined;
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

export interface IMissionData {
  HOUSEKEEPING: Array<IMissionDataItem>;
  SELF_CARE: Array<IMissionDataItem>;
  HEALTH: Array<IMissionDataItem>;
  WORK: Array<IMissionDataItem>;
  MINDSET: Array<IMissionDataItem>;
  SELF_DEVELOPMENT: Array<IMissionDataItem>;
}

export interface IMissionDataItem {
  id: number;
  missionType: string;
  missionDescription: null | string;
  alertStatus: string;
  alertTime: string;
}

export interface IMissionCategoryItem {
  isAddButton?: boolean;
  onPress: () => void;
  label: string;
}

export interface IMissionListData {
  missionStatus: string;
  alertTime: string;
  id: number;
  missionDescription: string;
}

export interface IGarden {
  myProfile: IGardenItem;
  friendList: {
    content: IGardenItem[];
  };
}

export interface IGardenItem {
  onPress?: () => void;
  isSelf?: boolean;
  imageFileUrl: string;
  nickname: string;
  myId?: number;
  friendId?: number;
  characterCount?: number;
  luckPhrase: string;
  isShow?: boolean;
}

export interface IGardenLeagueItem {
  nickname: string;
  imageFileUrl: string;
  characterCount: number;
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
