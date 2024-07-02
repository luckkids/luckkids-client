import { InitialSetting } from '../user';

export interface ILogin {
  accessToken: string;
  refreshToken: string;
}

export interface IResponse extends Response {
  statusCode?: number;
}

export interface IStringDictionary {
  [index: string]: string | null;
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

export interface IInitialSetting extends InitialSetting {}
