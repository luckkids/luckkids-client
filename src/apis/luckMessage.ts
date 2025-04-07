import API from './API';

export type GetLuckMessageHistoryResponse = {
  messageDescription: string;
};

const getLuckMessageHistory = async (deviceId: string) => {
  const res = await API.get<GetLuckMessageHistoryResponse>(
    `/luckMessageHistory?deviceId=${deviceId}`,
  );
  return res;
};

export const luckMessageApis = {
  getLuckMessageHistory,
};
