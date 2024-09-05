import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getSettingQueryKey from './getSettingQueryKey';
import { GetAlertSettingResponse, settingApis } from '@apis/setting';
import { RecoilDevice } from '@recoil/recoil.device';

export const useSettingAlarmSetting = () => {
  const { deviceId } = useRecoilValue(RecoilDevice);

  return useQuery<GetAlertSettingResponse | null>(
    getSettingQueryKey('SETTING_NOTICES'),
    async () => {
      if (!deviceId) return null;
      const res = await settingApis.getAlertSetting(deviceId);
      return res.data;
    },
    {
      select: (response) => response,
    },
  );
};
