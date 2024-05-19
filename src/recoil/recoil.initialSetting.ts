import { atom } from 'recoil';
import { IInitialSetting } from '../types/recoil/types.recoil';

export const RecoilInitialSetting = atom<IInitialSetting>({
  key: 'recoil-initial-setting',
  default: {
    missions: [],
    alertSetting: {
      deviceId: '',
      alertStatus: 'UNCHECKED',
    },
    character: {
      id: 0,
      nickName: '',
    },
  },
});
