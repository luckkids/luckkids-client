import { atom } from 'recoil';

export const exampleAtom = atom<boolean | null>({
  key: 'exampleAtom',
  default: null,
});
