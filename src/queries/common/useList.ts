import { useQuery } from '@tanstack/react-query';
import getQueryKey from './getQueryKey';

type GetListResponse = {
  items: any[];
};

export const getList = async (): Promise<GetListResponse> => {
  return {
    items: [],
  };
};

// query with typed params (example)
export const useList = () => {
  return useQuery(getQueryKey('GET_LIST'), getList, {
    select: (res) => res.items || [],
  });
};
