import API from './API';
import { IGarden } from '@types-common/page.types';

export type GetGardenListRequest = {
  page: number;
  size: number;
};

export type GetGardenListResponse = IGarden;

export const getGardenList = async (data: GetGardenListRequest) => {
  const res = await API.get<GetGardenListResponse>('/garden/list', {
    params: data,
  });
  return res;
};

export const gardenApis = {
  getGardenList,
};
