import { Platform } from 'react-native';
import { getUniqueIdSync, getVersion } from 'react-native-device-info';
import { useRecoilValue } from 'recoil';
import ApiError from './ApiError';
import { RecoilToken } from '@recoil/recoil.token';
import { accessTokenStorage } from '@storage';

interface APIInstance {
  getUri(config?: RequestInit): string;
  request<T>(url: string, config?: RequestInit): Promise<T>;
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  head<T>(url: string, config?: RequestInit): Promise<T>;
  options<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: any, config?: RequestInit): Promise<T>;
  put<T>(url: string, data?: any, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: any, config?: RequestInit): Promise<T>;
}

const API_BASE_URL = 'http://api-luckkids.kro.kr/api/v1';

const API = (() => {
  const accessToken = accessTokenStorage.getItem();
  console.log(24, accessToken);

  const requestInterceptor = (
    url: string,
    config: RequestInit,
  ): RequestInit => {
    const headers: { [key: string]: string | number } = {
      'Client-Version': getVersion(),
      'Client-Platform': Platform.OS,
      'Client-Device': getUniqueIdSync(),
      'Content-Type': 'application/json',
    };

    config.headers = {
      ...config.headers,
      ...headers,
    } as HeadersInit_;

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    if (__DEV__) {
      config.headers = {
        ...config.headers,
        requestAt: Date.now().toString(),
      };
    }

    console.log(53, config);

    return config;
  };

  const apiInstance: APIInstance = {
    getUri: () => {
      return API_BASE_URL;
    },
    request: <T>(url: string, config?: RequestInit): Promise<T> => {
      config = requestInterceptor(API_BASE_URL + url, config || {});
      return fetch(API_BASE_URL + url, config)
        .then((response) => response.json())
        .then((res) => res.data);
    },
    get: <T>(url: string, config?: RequestInit): Promise<T> => {
      return apiInstance.request<T>(url, { ...config, method: 'GET' });
    },
    delete: (url: string, config?: RequestInit) => {
      return apiInstance.request(url, { ...config, method: 'DELETE' });
    },
    head: (url: string, config?: RequestInit) => {
      return apiInstance.request(url, { ...config, method: 'HEAD' });
    },
    options: (url: string, config?: RequestInit) => {
      return apiInstance.request(url, { ...config, method: 'OPTIONS' });
    },
    post: (url: string, data?: any, config?: RequestInit) => {
      config = { ...config, method: 'POST', body: JSON.stringify(data) };
      return apiInstance.request(url, config);
    },
    put: (url: string, data?: any, config?: RequestInit) => {
      config = { ...config, method: 'PUT', body: JSON.stringify(data) };
      return apiInstance.request(url, config);
    },
    patch: (url: string, data?: any, config?: RequestInit) => {
      config = { ...config, method: 'PATCH', body: JSON.stringify(data) };
      return apiInstance.request(url, config);
    },
  };

  return apiInstance;
})();

export default API;
