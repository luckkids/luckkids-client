import { atom } from 'recoil';

export const activatedDatesState = atom<string[]>({
  key: 'activatedDatesState',
  default: [],
});
