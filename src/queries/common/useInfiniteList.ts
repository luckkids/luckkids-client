import { useInfiniteQuery } from '@tanstack/react-query';
import { InfiniteQueryHookOptions } from '@types-index';
import { getNextPageParam, withTypedInfiniteLoad } from '@utils';
import getQueryKey from './getQueryKey';

type GetInfiniteListParams = {
  offset: number;
  limit: number;
};

type GetInfiniteListResponse = {
  isEnd: boolean;
  items: any[];
};

export const getInfiniteList = async (
  params: GetInfiniteListParams,
): Promise<GetInfiniteListResponse> => {
  console.log(params);
  return {
    isEnd: true,
    items: [],
  };
};

// infinite query with typed params (example)
export const useInfiniteList = (
  options?: InfiniteQueryHookOptions<typeof getInfiniteList>,
) => {
  return useInfiniteQuery(
    getQueryKey('GET_INFINITE_LIST'),
    withTypedInfiniteLoad(getInfiniteList, {}, 20),
    {
      getNextPageParam,
      ...options,
    },
  );
};
