export type Mission = {
  missionType:
    | 'HOUSEKEEPING'
    | 'SELF_CARE'
    | 'HEALTH'
    | 'WORK'
    | 'MINDSET'
    | 'SELF_DEVELOPMENT';
  missionDescription: string;
  alertTime: string;
};
