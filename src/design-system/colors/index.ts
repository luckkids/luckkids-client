import * as shadow from './shadow';

const Colors = {
  // LUCK
  LUCK_GREEN: '#80F466',

  // SYSTEM
  BLACK: '#000000',
  GREY0: '#AFB2BA',
  GREY1: '#8E8E8E',
  GREY2: '#636363',
  GREY3: '#484848',
  GREY4: '#3A3A3A',
  GREY5: '#2C2C2C',
  GREY6: '#1C1C1C',
  WHITE: '#FFFFFF',
  RED: '#E84747',

  // BG
  BG_PRIMARY: '#111111',
  BG_SECONDARY: '#1C1C1C',
  BG_TERTIARY: '#2C2C2C',

  // LABEL
  LABEL_PRIMRAY: '#FFFFFF',
  LABEL_SECONDARY: '#7F7F7F80',
  LABEL_TERTIARY: '#7F7F7F66',
  LABEL_QUATERNARY: '#7F7F7F33',

  // FILL
  FILL_PRIMARY: '#7F7F7F80',
  FILL_SECONDARY: '#7F7F7F66',
  FILL_TERTIARY: '#7F7F7F33',

  // ETC
  SHADOW: shadow,
  TRANSPARENT: 'transparent',

  //TAB BOTTOM
  TAB_BAR_BG: '#000000',
  TAB_BAR_BORDER_TOP: 'rgba(142,142,142,0.3)',

  //KAKAO
  KAKAO_YELLOW: '#FAE100',
  KAKAO_LOGO: '#371D1E',

  // HOME
  HOME_BG: '#A5E2FD',
  HOME_TODAY_TEXT: '#91CFE0',
  HOME_INFO_TEXT: '#DCFEC1',
  HOME_PROFILE_BG: '#223A37',
};

export type ColorType = typeof Colors;
export type ColorKeys = Exclude<keyof ColorType, 'SHADOW'>;
export type ColorMode = 'dark' | 'light';

export default Colors;
