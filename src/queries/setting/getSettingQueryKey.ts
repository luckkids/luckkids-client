import { createQueryKeyFactory } from '../queries.utils';

export type SettingQueryList = {
  SETTING_NOTICES: undefined;
  SETTING_ALARM_SETTING: { deviceId: string };
};

export default createQueryKeyFactory<SettingQueryList>();
