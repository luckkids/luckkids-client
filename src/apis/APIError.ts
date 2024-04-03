export default class ApiError<T = unknown> extends Error {
  errorData: ApiErrorData<T>;

  static isApiError = <T>(error: any): error is ApiError<T> => {
    return error instanceof ApiError;
  };

  constructor(errorData: ApiErrorData<T>) {
    super();
    console.log('[ApiError]', errorData);
    this.errorData = errorData;
  }
}

export type ApiErrorData<Code> = {
  title: string;
  message: string;
  code: Code;
  statusCode: number;
  requestUrl: string;
  requestParams: string | null;
  requestData: string | null;
  method: string;
};
