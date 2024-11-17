import { MissionType } from './mission';

// APPLE, KAKAO, GOOGLE
export type SocialType = 'APPLE' | 'KAKAO' | 'GOOGLE' | 'NORMAL';

export type SettingStatus = 'COMPLETE' | 'INCOMPLETE';

export type InitialSettingAlertStatus = 'CHECKED' | 'UNCHECKED';

export type InitialSettingMission = {
  missionType: MissionType;
  missionDescription: string;
  alertTime: string;
  luckkidsMissionId: number | null;
};

export type InitialSetting = {
  alertSetting: {
    deviceId: string;
    alertStatus: InitialSettingAlertStatus;
  };
  character: {
    id: number;
    nickName: string;
  };
  missions: InitialSettingMission[];
};
