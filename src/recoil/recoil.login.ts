import { atom } from 'recoil';
import { ILogin } from '../types/recoil/types.recoil';

export const RecoilLogin = atom<ILogin>({
  key: 'recoil-login',
  default: {
    email: '',
    password: '',
    deviceId: '',
    pushKey: '',
  },
});
