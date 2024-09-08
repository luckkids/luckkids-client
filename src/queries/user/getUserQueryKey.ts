import { createQueryKeyFactory } from '../queries.utils';

export type UserQueryList = {
  ME: undefined;
  USER_INFO: { userId: number };
  //
};

export default createQueryKeyFactory<UserQueryList>();
