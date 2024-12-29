import { useQuery } from '@tanstack/react-query';
import getHomeQueryKey from './getHomeQueryKey';
import { GetCalendarDetailInfoResponse, homeApis } from '@apis/home';

export const useHomeCalendarDetail = ({
  missionDate,
}: {
  missionDate: string;
}) => {
  return useQuery<GetCalendarDetailInfoResponse>(
    getHomeQueryKey('HOME_CALENDAR_DETAIL', {
      missionDate,
    }),
    async () => {
      const res = await homeApis.getCalenderDetailInfo(missionDate);
      return res.data;
    },
    {
      select: (response) => response,
      refetchOnMount: 'always',
    },
  );
};
