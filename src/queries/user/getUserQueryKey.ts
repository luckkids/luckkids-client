import { createQueryKeyFactory } from '../queries.utils';

export type UserQueryList = {
  ME: undefined;
  //
};

export default createQueryKeyFactory<UserQueryList>();
