import API from './API';
import { CharacterType } from '@types-common/character.types';

export interface GetHomeInfoResponse {
  luckkidsAchievementRate: number;
  userCharacterSummaryResponse: UserCharacterSummaryResponse;
  missionOutcomeForWeekResponse: MissionOutcomeForWeekResponse;
}

export interface UserCharacterSummaryResponse {
  inProgressCharacter: InProgressCharacter;
  completedCharacterCount: CompletedCharacterCount;
}

export interface InProgressCharacter {
  characterType: CharacterType;
  level: number;
  characterProgressStatus: string;
}

export interface CompletedCharacterCount {
  RABBIT: number;
  SUN: number;
  STONE: number;
  CLOVER: number;
  CLOUD: number;
}

export interface MissionOutcomeForWeekResponse {
  startDate: string;
  endDate: string;
  calendar: Calendar[];
}

export interface Calendar {
  missionDate: string;
  hasSucceed: boolean;
}

export const getHomeInfo = async () => {
  const res = await API.get<GetHomeInfoResponse>('/home/main');
  return res;
};

export const homeApis = {
  getHomeInfo,
};
