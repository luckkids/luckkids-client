import { useQuery } from '@tanstack/react-query';
import getHomeQueryKey from './getHomeQueryKey';
import { GetCalendarInfoResponse, homeApis } from '@apis/home';

export const useHomeCalendar = ({ missionDate }: { missionDate?: string }) => {
  return useQuery<GetCalendarInfoResponse>(
    getHomeQueryKey('HOME_CALENDAR', {
      missionDate,
    }),
    async () => {
      const res = await homeApis.getCalendarInfo(missionDate);
      return res.data;
    },
    {
      select: (response) => response,
      refetchOnMount: 'always',
      refetchOnReconnect: true,
    },
  );
};
