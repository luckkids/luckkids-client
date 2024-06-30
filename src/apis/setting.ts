import { ISettingNotice } from '@types-common/page.types';
import API from './API';
import { AlertStatus, AlertType } from '@types-common/setting.types';

export type UpdateAlertStatusRequest = {
  alertType: AlertType;
  alertStatus: AlertStatus;
  deviceId: string;
};

export type UpdateAlertStatusResponse = {
  entire: AlertStatus;
  mission: AlertStatus;
  luck: AlertStatus;
  notice: AlertStatus;
};

const updateAlertSetting = async (request: UpdateAlertStatusRequest) => {
  const res = await API.patch<UpdateAlertStatusResponse>(
    '/alertSetting/update',
    request,
  );
  return res;
};

export type GetNoticesResponse = ISettingNotice[];

const getNotices = async () => {
  const res = await API.get<GetNoticesResponse>('/notices');
  return res;
};

export const settingApis = {
  updateAlertSetting,
  getNotices,
};
