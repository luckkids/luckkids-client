import styled, { css } from 'styled-components/native';
import { BgColor, Flex } from './layout.types';
import { LayoutBase } from './Flex';
import { getStyle } from './layout.utils';
import { SCREEN_WIDTH } from '../constants';

export const AbsoluteFill = styled.View<BgColor & { opacity?: number }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ theme, bgColor }) => theme[bgColor || 'TRANSPARENT']};
  ${({ opacity }) => css`
    ${getStyle('opacity', opacity)}
  `}
`;

export const AbsoluteFullScreen = styled.View<BgColor & Flex>`
  width: ${SCREEN_WIDTH}px;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ theme, bgColor }) => theme[bgColor || 'TRANSPARENT']};
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  ${({ opacity }) => css`
    ${getStyle('opacity', opacity)}
  `}
`;

type AbsoluteStyle = {
  flexDirection?: 'row' | 'column';
  b?: number | string;
  t?: number | string;
  l?: number | string;
  r?: number | string;
  opacity?: number;
};

export const Absolute = styled(LayoutBase)<AbsoluteStyle>`
  position: absolute;
  ${({ b, t, l, r, flexDirection, opacity }) => css`
    ${getStyle('flex-direction', flexDirection || 'row')}
    ${getStyle('bottom', b)}
    ${getStyle('top', t)}
    ${getStyle('left', l)}
    ${getStyle('right', r)}
    ${getStyle('opacity', opacity)}
  `}
`;
