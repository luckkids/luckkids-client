import styled, { css } from 'styled-components/native';
import { Layout } from './Layout';
import { toStyle } from './Layout.utils';

type AbsoluteStyle = {
  flexDirection?: 'row' | 'column';
  b?: number | string;
  t?: number | string;
  l?: number | string;
  r?: number | string;
  opacity?: number;
};

export const Absolute = styled(Layout)<AbsoluteStyle>`
  position: absolute;
  ${({ b, t, l, r, flexDirection, opacity }) => css`
    ${toStyle('flex-direction', flexDirection || 'row')}
    ${toStyle('bottom', b)}
    ${toStyle('top', t)}
    ${toStyle('left', l)}
    ${toStyle('right', r)}
    ${toStyle('opacity', opacity, false)}
  `}
`;
