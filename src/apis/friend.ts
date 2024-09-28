import API from './API';

export type CreateFriendByCodeRequest = {
  code: string;
};

export type CreateFriendByCodeResponse = {
  requester: string;
  receiver: string;
};

export const createFriendByCode = async (data: CreateFriendByCodeRequest) => {
  const res = await API.post<CreateFriendByCodeResponse>(
    '/friendcode/create',
    data,
  );
  return res;
};

export const friendApis = {
  createFriendByCode,
};
