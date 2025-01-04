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

export const getNicknameByFriendCode = async (code: string) => {
  try {
    const res = await API.get(`/friendcode/${code}/nickname`);
    return res;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const friendApis = {
  createFriendByCode,
  getNicknameByFriendCode,
};
