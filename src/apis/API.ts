import { Platform } from 'react-native';
import { getUniqueIdSync, getVersion } from 'react-native-device-info';
import { useRecoilValue } from 'recoil';
import ApiError from './ApiError';
import { RecoilToken } from '@recoil/recoil.token';

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
  const accessToken = useRecoilValue(RecoilToken);

  const requestInterceptor = (
    url: string,
    config: RequestInit,
  ): RequestInit => {
    const headers: { [key: string]: string | number } = {
      'Client-Version': getVersion(),
      'Client-Platform': Platform.OS,
      'Client-Device': getUniqueIdSync(),
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
      config = requestInterceptor(url, config || {});
      return fetch(url, config).then((response) => {
        return response.json();
      });
    },
    get: <T>(url: string, config?: RequestInit): Promise<T> => {
      config = requestInterceptor(url, config || {});
      return fetch(url, config).then((response) => {
        return response.json();
      });
    },
    delete: (url: string, config?: RequestInit) => {
      config = requestInterceptor(url, config || {});
      return fetch(url, { ...config, method: 'DELETE' }).then((response) => {
        return response.json();
      });
    },
    head: (url: string, config?: RequestInit) => {
      config = requestInterceptor(url, config || {});
      return fetch(url, { ...config, method: 'HEAD' }).then((response) => {
        return response.json();
      });
    },
    options: (url: string, config?: RequestInit) => {
      config = requestInterceptor(url, config || {});
      return fetch(url, { ...config, method: 'OPTIONS' }).then((response) => {
        return response.json();
      });
    },
    post: (url: string, data?: any, config?: RequestInit) => {
      config = requestInterceptor(url, config || {});
      return fetch(url, {
        ...config,
        method: 'POST',
        body: JSON.stringify(data),
      }).then();
    },
    put: (url: string, data?: any, config?: RequestInit) => {
      config = requestInterceptor(url, config || {});
      return fetch(url, {
        ...config,
        method: 'PUT',
        body: JSON.stringify(data),
      }).then((response) => {
        return response.json();
      });
    },
    patch: (url: string, data?: any, config?: RequestInit) => {
      config = requestInterceptor(url, config || {});
      return fetch(url, {
        ...config,
        method: 'PATCH',
        body: JSON.stringify(data),
      }).then((response) => {
        return response.json();
      });
    },
  };

  return apiInstance;
})();

type AxiosCustomConfig = {
  requestAt: string;
};

export default API;
