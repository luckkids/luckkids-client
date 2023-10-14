import { DefaultOrNumber } from './Layout.types';
import { DEFAULT_MARGIN } from '../../constants';

export const toStyle = (
  key: string,
  value: DefaultOrNumber | undefined | string,
  px = true,
) => {
  if (value === undefined) return '';
  if (typeof value === 'string' || !px) return `${key}: ${value};`;
  return `${key}: ${toPx(value)}px;`;
};

export const toPx = (value: true | number) =>
  value === true ? DEFAULT_MARGIN : value;

export const toMarginPaddingStyle = (
  ...[all = 0, h = 0, v = 0, t = 0, r = 0, b = 0, l = 0]: (
    | DefaultOrNumber
    | undefined
  )[]
) => {
  const top = toPx(t) || toPx(v) || toPx(all);
  const right = toPx(r) || toPx(h) || toPx(all);
  const bottom = toPx(b) || toPx(v) || toPx(all);
  const left = toPx(l) || toPx(h) || toPx(all);
  return `${top}px ${right}px ${bottom}px ${left}px;`;
};
