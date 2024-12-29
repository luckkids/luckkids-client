import { useInfiniteQuery } from '@tanstack/react-query';
import { getNextPageParam, withTypedInfiniteLoad } from '@utils';
import getGardenQueryKey from './getGardenQueryKey';
import { GetGardenListResponse, getGardenList } from '@apis/garden';

interface GardenListParams {
  size?: number;
}

export const useInfiniteGardenList = (
  params: GardenListParams = { size: 12 },
) => {
  const { size = 12 } = params;

  return useInfiniteQuery<
    GetGardenListResponse,
    Error,
    GetGardenListResponse,
    ReturnType<typeof getGardenQueryKey>
  >(
    getGardenQueryKey('GARDEN_LIST', { size }),
    withTypedInfiniteLoad(
      async ({ offset, limit }: { offset: number; limit: number }) => {
        const res = await getGardenList({
          page: offset + 1,
          size: limit,
        });
        const data = res.data;
        return {
          friendList: data.friendList,
          myProfile: data.myProfile,
          isEnd:
            data.friendList.pageInfo.currentPage >=
            data.friendList.pageInfo.totalPage,
        };
      },
      {},
      size,
    ),
    {
      getNextPageParam: (lastPage) => getNextPageParam(lastPage.friendList),
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchOnMount: 'always',
      staleTime: 0,
    },
  );
};
