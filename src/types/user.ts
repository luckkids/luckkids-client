import { Mission } from './mission';

// APPLE, KAKAO, GOOGLE
export type SocialType = 'APPLE' | 'KAKAO' | 'GOOGLE' | 'NORMAL';

export type SettingStatus = 'COMPLETE' | 'INCOMPLETE';

export type InitialSetting = {
  alertSetting: {
    deviceId: string;
    alertStatus: 'CHECKED' | 'UNCHECKED';
  };
  character: {
    id: number;
    nickName: string;
  };
  missions: Mission[];
};
