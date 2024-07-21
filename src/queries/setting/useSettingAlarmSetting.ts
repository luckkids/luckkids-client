import { useQuery } from '@tanstack/react-query';
import getSettingQueryKey from './getSettingQueryKey';
import { GetAlertSettingResponse, settingApis } from '@apis/setting';

export const useSettingAlarmSetting = ({ deviceId }: { deviceId: string }) => {
  return useQuery<GetAlertSettingResponse>(
    getSettingQueryKey('SETTING_NOTICES'),
    async () => {
      const res = await settingApis.getAlertSetting(deviceId);
      return res.data;
    },
    {
      select: (response) => response,
      enabled: !!deviceId,
    },
  );
};
