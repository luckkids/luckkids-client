import { atom } from 'recoil';
import { IJoinInfo } from '../types/recoil/types.recoil';

export const RecoilJoinInfo = atom<IJoinInfo>({
  key: 'recoil-join-info',
  default: {
    email: '',
    password: '',
  },
});
