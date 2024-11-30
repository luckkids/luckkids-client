import { SocialType } from '@types-index';

// Define the keys as an enum
export enum StorageKeys {
  StoryTelling = 'story_telling',
  RememberMe = 'remember_me',
  AccessToken = 'access_token',
  MissionTimeRepairTooltip = 'mission_time_repair_tooltip',
  MissionDeleteTooltip = 'mission_delete_tooltip',
  MissionRepairAvailableTooltip = 'mission_repair_available_tooltip',
  // Add other keys here
}

// Define the type for each storage key
export interface RememberMeType {
  isEnabled: boolean;
  snsType: SocialType;
  /**
   * email
   * - email (일반) 로그인 : email
   * - oauth 로그인 : null
   */
  email: string | null;
  /**
   * credential
   * - email (일반) 로그인 : password
   * - oauth 로그인 : token
   */
  credential: string;
}

interface AccessToken {
  accessToken: string;
  refreshToken: string;
}

interface StoryTellingType {
  viewed: boolean;
}

interface MissionTimeRepairTooltipType {
  viewed: boolean;
}

interface MissionDeleteTooltipType {
  viewed: boolean;
}

interface MissionRepairAvailableTooltipType {
  viewed: boolean;
}

// Add types for other keys if needed
// interface OtherKeyType { ... }

// Map keys to their corresponding types
export type StorageValues = {
  [StorageKeys.RememberMe]: RememberMeType;
  [StorageKeys.AccessToken]: AccessToken;
  [StorageKeys.StoryTelling]: StoryTellingType;
  [StorageKeys.MissionTimeRepairTooltip]: MissionTimeRepairTooltipType;
  [StorageKeys.MissionDeleteTooltip]: MissionDeleteTooltipType;
  [StorageKeys.MissionRepairAvailableTooltip]: MissionRepairAvailableTooltipType;
  // Add other key-value mappings here
};

export const defaultValues = {
  [StorageKeys.RememberMe]: {
    isEnabled: false,
    snsType: 'NORMAL',
    email: null,
    credential: '',
  },
  [StorageKeys.AccessToken]: {
    accessToken: '',
    refreshToken: '',
  },
  [StorageKeys.StoryTelling]: {
    viewed: false,
  },
  [StorageKeys.MissionTimeRepairTooltip]: {
    viewed: false,
  },
  [StorageKeys.MissionDeleteTooltip]: {
    viewed: false,
  },
  [StorageKeys.MissionRepairAvailableTooltip]: {
    viewed: false,
  },
  // Add other default values here
};
