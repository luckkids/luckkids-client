import { useInfiniteQuery } from '@tanstack/react-query';
import { getNextPageParam, withTypedInfiniteLoad } from '@utils';
import getHomeQueryKey from './getHomeQueryKey';
import { GetNotificationListResponse, getNotificationList } from '@apis/home';

const PAGE_SIZE = 15;

export const useInfiniteHomeNotification = (deviceId: string | null) => {
  return useInfiniteQuery<
    GetNotificationListResponse,
    Error,
    GetNotificationListResponse,
    ReturnType<typeof getHomeQueryKey>
  >(
    getHomeQueryKey('HOME_NOTIFICATION', { deviceId }),
    withTypedInfiniteLoad(
      async ({
        deviceId,
        offset,
        limit,
      }: {
        deviceId: string;
        offset: number;
        limit: number;
      }) => {
        if (!deviceId) {
          return {
            content: [],
            pageInfo: {
              currentPage: 0,
              totalPage: 0,
              totalElement: 0,
            },
            isEnd: true,
          };
        }
        const res = await getNotificationList({
          deviceId,
          page: offset + 1,
          size: limit,
        });
        const data = res.data;
        return {
          content: data.content,
          pageInfo: data.pageInfo,
          isEnd: data.pageInfo.currentPage >= data.pageInfo.totalPage,
        };
      },
      { deviceId },
      PAGE_SIZE,
    ),
    {
      getNextPageParam: (lastPage) => getNextPageParam(lastPage),
      refetchOnReconnect: true,
      enabled: !!deviceId,
      refetchOnWindowFocus: true,
      refetchOnMount: 'always',
      staleTime: 0,
    },
  );
};
