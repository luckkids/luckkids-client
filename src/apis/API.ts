import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAccessToken } from '@utils';

export const API_BASE_URL = 'https://api-luckkids.kro.kr/api/v1';

const JSON_DEFAULT_OPTIONS: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

const API: AxiosInstance = axios.create(JSON_DEFAULT_OPTIONS);

API.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    console.log('request ====>', config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    console.log('response ====>', response.data);
    return response.data;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default API;
