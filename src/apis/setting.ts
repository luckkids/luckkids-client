import API from './API';
import { ISettingAlarm, ISettingNotice } from '@types-common/page.types';
import { AlertStatus, AlertType } from '@types-common/setting.types';

export type GetAlertSettingResponse = ISettingAlarm;

const getAlertSetting = async (deviceId: string) => {
  const res = await API.get<GetAlertSettingResponse>(
    `/alertSetting?deviceId=${deviceId}`,
  );
  return res;
};

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

export type GetVersionResponse = {
  id: number;
  versionNum: string;
};

const getVersion = async () => {
  const res = await API.get<GetVersionResponse>('/versions/');
  return res;
};

type SetLuckMessageAlertTimeRequest = {
  deviceId: string;
  luckMessageAlertTime: string;
};

const setLuckMessageAlertTime = async (
  request: SetLuckMessageAlertTimeRequest,
) => {
  const res = await API.patch('/alertSetting/luckMessageAlertTime/update', {
    ...request,
  });
  return res;
};

export const settingApis = {
  getAlertSetting,
  updateAlertSetting,
  setLuckMessageAlertTime,
  getNotices,
  getVersion,
};
