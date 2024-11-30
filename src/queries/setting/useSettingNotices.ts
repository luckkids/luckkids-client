import { useQuery } from '@tanstack/react-query';
import getSettingQueryKey from './getSettingQueryKey';
import { GetNoticesResponse, settingApis } from '@apis/setting';

export const useSettingNotices = () => {
  return useQuery<GetNoticesResponse>(
    getSettingQueryKey('SETTING_NOTICES'),
    async () => {
      const res = await settingApis.getNotices();
      return res.data;
    },
  );
};
