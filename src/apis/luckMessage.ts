import API from './API';

export type GetLuckMessageHistoryResponse = {
  messageDescription: string;
};

const getLuckMessageHistory = async (deviceId: string) => {
  const { data } = await API.get<GetLuckMessageHistoryResponse>(
    `/luckMessageHistory?deviceId=${deviceId}`,
  );
  return data;
};

export const luckMessageApis = {
  getLuckMessageHistory,
};
