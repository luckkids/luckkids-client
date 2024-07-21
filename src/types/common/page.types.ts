import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RemotePackage } from 'react-native-code-push';
import { SocialType } from '../user';
import { CharacterType } from './character.types';

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
  LoginJoinEmailConfirm: {
    authKey: string;
  };
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
  HomeLevel: {
    level: number;
    type: CharacterType;
  };
  HomeProfile: undefined;
  HomeProfileShare: undefined;
  Mission: undefined;
  MissionRepair: {
    type?: 'INITIAL_SETTING' | 'MISSION_REPAIR';
  };
  MissionRepairPublic: undefined;
  MissionAdd: undefined;
  GardenAlbum: undefined;
  GardenRank: undefined;
  Setting: undefined;
  SettingProfile: undefined;
  SettingComment: undefined;
  SettingAlarm: undefined;
  SettingInfo: undefined;
  SettingNotice: undefined;
  SettingInfoPassword: undefined;
  SettingAccount: undefined;
  WebView: { url: string; title?: string };
  Garden: undefined;
  My: undefined;
  HomeComment: undefined;
  UpdateScreen: { remotePackage: RemotePackage };
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
  id: number | undefined;
  luckkidsMissionId: number;
  missionType: string;
  missionDescription: null | string;
  missionActive: 'TRUE' | 'FALSE';
  alertTime: string;
  alertStatus?: 'CHECKED' | 'UNCHECKED';
}

export interface IMissionCategoryItem {
  isAddButton?: boolean;
  onPress: () => void;
  label: string;
}

export interface IMissionListData {
  missionStatus: string;
  alertTime: string;
  alertStatus?: 'CHECKED' | 'UNCHECKED';
  id: number;
  missionDescription: string;
  missionType: string;
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
  id: number;
  title: string;
  createdDate: string;
  url: string;
}
