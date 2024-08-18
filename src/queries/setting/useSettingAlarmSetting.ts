import { useQuery } from '@tanstack/react-query';
import DeviceInfo from 'react-native-device-info';
import getSettingQueryKey from './getSettingQueryKey';
import { GetAlertSettingResponse, settingApis } from '@apis/setting';

export const useSettingAlarmSetting = () => {
  return useQuery<GetAlertSettingResponse>(
    getSettingQueryKey('SETTING_NOTICES'),
    async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      const res = await settingApis.getAlertSetting(deviceId);
      return res.data;
    },
    {
      select: (response) => response,
    },
  );
};
