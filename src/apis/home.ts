import { format } from 'date-fns';
import { MissionType } from '@types-index';
import API from './API';
import { CharacterType } from '@types-common/character.types';
import { NotificationItem } from '@types-common/noti.types';

export interface GetHomeInfoResponse {
  luckkidsAchievementRate: number;
  userCharacterSummaryResponse: UserCharacterSummaryResponse;
  missionOutcomeForWeekResponse: MissionOutcomeForWeekResponse;
  hasUncheckedAlerts: boolean;
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

export interface GetCalendarInfoResponse {
  startDate: string;
  endDate: string;
  calendar: Calendar[];
}

export const getCalendarInfo = async (missionDate?: string) => {
  const _missionDate = missionDate || format(new Date(), 'yyyy-MM-dd');
  const res = await API.get<GetCalendarInfoResponse>(`/home/calendar`, {
    params: {
      missionDate: _missionDate,
    },
  });
  return res;
};

export type GetCalendarDetailInfoResponse = {
  missionType: MissionType;
  missionDescription: string;
}[];

export const getCalenderDetailInfo = async (missionDate: string) => {
  const res = await API.get<GetCalendarDetailInfoResponse>(
    `/home/calendar/${missionDate}`,
  );
  return res;
};

export type GetNotificationListRequest = {
  deviceId: string;
  page?: number;
  size?: number;
};

export type GetNotificationListResponse = {
  content: NotificationItem[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
};

export const getNotificationList = async (
  request: GetNotificationListRequest,
) => {
  const res = await API.get<GetNotificationListResponse>('/alertHistories', {
    params: request,
  });
  return res;
};

export const readNotification = async (id: number) => {
  const res = await API.patch(`/alertHistories/${id}`);
  return res;
};

export const homeApis = {
  getHomeInfo,
  getCalendarInfo,
  getCalenderDetailInfo,
  getNotificationList,
  readNotification,
};
