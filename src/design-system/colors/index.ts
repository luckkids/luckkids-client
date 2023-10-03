import * as shadow from './shadow';

const Colors = {
  BASIC_BLACK: '#000000',
  BASIC_WHITE: '#FFFFFF',

  SHADOW: shadow,

  TRANSPARENT: 'transparent',
};

export type ColorType = typeof Colors;
export type ColorKeys = Exclude<keyof ColorType, 'SHADOW'>;
export type ColorMode = 'dark' | 'light';

export default Colors;
