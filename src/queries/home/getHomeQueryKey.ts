import { createQueryKeyFactory } from '../queries.utils';

export type HomeQueryList = {
  HOME_INFO: undefined;
  HOME_CALENDAR: {
    missionDate?: string;
  };
  HOME_CALENDAR_DETAIL: {
    missionDate?: string;
  };
  HOME_NOTIFICATION: {
    deviceId: string;
  };
};

export default createQueryKeyFactory<HomeQueryList>();
