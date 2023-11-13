import { atom } from 'recoil';
import { ILogin } from '../types/recoil/types.recoil';

export const RecoilToken = atom<ILogin>({
  key: 'recoil-token',
  default: {
    accessToken: '',
    refreshToken: '',
  },
});
