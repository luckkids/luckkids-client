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
  TutorialStart = 'tutorial.start',
  TutorialSurvey = 'tutorial.survey',
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
  options: NativeStackNavigationOptions | undefined;
}

export interface IPage {
  navigation: NativeStackNavigationProp<AppScreensParamList>;
}
