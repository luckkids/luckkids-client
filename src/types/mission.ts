export type Mission = {
  missionType: MissionType;
  missionDescription: string;
  alertTime: string;
};

export type MissionType =
  | 'HOUSEKEEPING'
  | 'SELF_CARE'
  | 'HEALTH'
  | 'WORK'
  | 'MINDSET'
  | 'SELF_DEVELOPMENT';
