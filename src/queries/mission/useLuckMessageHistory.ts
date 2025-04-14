import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import getMissionQueryKey from './getMissionQueryKey';
import {
  GetLuckMessageHistoryResponse,
  luckMessageApis,
} from '@apis/luckMessage';
import { RecoilDevice } from '@recoil/recoil.device';

export const useLuckMessageHistory = () => {
  const { deviceId } = useRecoilValue(RecoilDevice);

  return useQuery<GetLuckMessageHistoryResponse | null>(
    getMissionQueryKey('LUCK_MESSAGE_HISTORY'),
    async () => {
      if (!deviceId) return null;
      const res = await luckMessageApis.getLuckMessageHistory(deviceId);
      return res;
    },
    {
      select: (response) => response,
      enabled: !!deviceId,
      refetchOnMount: true,
    },
  );
};
