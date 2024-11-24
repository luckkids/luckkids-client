import React from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RemotePackage } from 'react-native-code-push';
import { CharacterType } from './character.types';
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
  LoginAlready: { type: SocialType; email: string | null };
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
  Home: { friendCode?: string };
  HomeAlarm: undefined;
  HomeCalendar: undefined;
  HomeLevel: {
    level: number;
    type: CharacterType;
  };
  HomeProfile: undefined;
  HomeProfileShare: undefined;
  Mission: undefined;
  MissionRepair: undefined;
  MissionAdd: undefined;
  GardenAlbum: undefined;
  GardenRank: undefined;
  GardenFriendProfile: {
    friendId: number;
  };
  Setting: undefined;
  SettingProfile: undefined;
  SettingComment: undefined;
  SettingAlarm: undefined;
  SettingInfo: undefined;
  SettingNotice: undefined;
  SettingInfoPassword: undefined;
  SettingAccount: undefined;
  WebView: { url: string; title?: string };
  Garden: { isAddFriend?: boolean };
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
  id: number;
  luckkidsMissionId: number;
  missionType: string;
  missionDescription: string;
  missionActive?: 'TRUE' | 'FALSE'; // luckkidsMission의 경우 없을 수 있음
  alertTime: string;
  alertStatus: 'CHECKED' | 'UNCHECKED';
  isLuckkidsMission?: boolean;
}

export interface IMissionCategoryItem {
  isAddButton?: boolean;
  onPress: () => void;
  label: string;
}

export interface IMissionListData {
  id: number;
  missionType: string;
  missionDescription: string;
  alertStatus: 'CHECKED' | 'UNCHECKED';
  alertTime: string;
  missionStatus: 'SUCCEED' | 'FAILED';
}

export interface IGarden {
  myProfile: IGardenItem;
  friendList: {
    content: IGardenItem[];
  };
}

export interface IGardenItem {
  myId?: number;
  friendId?: number;
  nickname: string;
  luckPhrase: string;
  characterType: CharacterType;
  level: number;
  characterCount: number;
}

export interface IGardenLeagueItem {
  nickname?: string;
  characterCount: number;
  characterType: CharacterType;
  level: number;
}

export interface ISettingAlarm {
  entire: TCheck;
  mission: TCheck;
  luck: TCheck;
  notice: TCheck;
  friend: TCheck;
  luckMessageAlertTime: string;
}

export interface ISettingNotice {
  id: number;
  title: string;
  createdDate: string;
  url: string;
}
