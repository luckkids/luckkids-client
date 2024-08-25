import { InitialSetting } from '../user';
import { IPopup } from '@frame/frame.popup';

export interface ILogin {
  accessToken: string;
  refreshToken: string;
}

export interface IResponse extends Response {
  statusCode?: number;
}

export interface IStringDictionary {
  [index: string]: string | number | null;
}

export interface IJoinInfo {
  email: string;
  password: string;
}

export interface ILoginInfo {
  email: string;
  password: string;
  deviceId: string;
  pushKey: string | null;
}

export interface IPopupState extends IPopup {
  isShow: boolean;
}

export interface IInitialSetting extends InitialSetting {}
