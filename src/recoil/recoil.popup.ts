import { atom } from 'recoil';
import { IPopupState } from '../types/recoil/types.recoil';

export const RecoilPopupState = atom<IPopupState>({
  key: 'recoil-popup-state',
  default: {
    isShow: false,
    title: undefined,
    txt: undefined,
    onClick: undefined,
    onCancel: {
      label: '',
    },
  },
});
