export interface ILogin {
  accessToken: string;
  refreshToken: string;
}

export interface IResponse extends Response {
  statusCode?: number;
}

export interface IStringDictionary {
  [index: string]: string;
}

export interface IJoinInfo {
  email: string;
  password: string;
}
