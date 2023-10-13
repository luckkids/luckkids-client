import { ColorKeys } from '../../colors';

export type DefaultOrNumber = number | true;

export type MarginStyle = {
  m?: DefaultOrNumber;
  mh?: DefaultOrNumber;
  mv?: DefaultOrNumber;
  mt?: DefaultOrNumber;
  mb?: DefaultOrNumber;
  ml?: DefaultOrNumber;
  mr?: DefaultOrNumber;
};

export type PaddingStyle = {
  p?: DefaultOrNumber;
  ph?: DefaultOrNumber;
  pv?: DefaultOrNumber;
  pt?: DefaultOrNumber;
  pb?: DefaultOrNumber;
  pl?: DefaultOrNumber;
  pr?: DefaultOrNumber;
};

export type BoxStyle = {
  w?: DefaultOrNumber | string;
  h?: DefaultOrNumber | string;
  rounded?: number;
  outline?: ColorKeys;
  bg?: ColorKeys;
  g?: DefaultOrNumber;
};

export type FlexStyle = {
  'flex-1'?: boolean;
  items?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-evenly';
};
