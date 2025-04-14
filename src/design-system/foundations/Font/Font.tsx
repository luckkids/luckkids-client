import React, { PropsWithChildren } from 'react';
import { TextProps } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ColorKeys } from '@design-system';
import fontSettings from './Font.constants';
import { MarginStyle } from '../Layout/Layout.types';
import { toMarginPaddingStyle, toStyle } from '../Layout/Layout.utils';

const Font: React.FC<PropsWithChildren<FontProps>> = ({
  children,
  type,
  ...props
}) => {
  const { color, hexColor, underline, textAlign, ...restProps } = props;

  return (
    <StyledFont
      {...fontSettings[type]}
      color={color}
      hexColor={hexColor}
      underline={underline}
      textAlign={textAlign}
      lineBreakStrategyIOS={'hangul-word'}
    >
      {children}
    </StyledFont>
  );
};

type FontType = keyof typeof fontSettings;

export interface FontProps extends FontStyle, TextProps, MarginStyle {
  type: FontType;
  underline?: boolean;
}

interface FontStyle {
  color?: ColorKeys;
  hexColor?: string;
  underline?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  lineBreakStrategyIOS?: 'none' | 'standard' | 'hangul-word' | 'push-out';
}

const StyledFont = styled.Text<
  {
    fontSize: number;
    lineHeight: number;
    fontFamily: string;
  } & MarginStyle &
    FontStyle
>`
  letter-spacing: -0.5px;
  font-size: ${({ fontSize }) => fontSize}px;
  font-family: ${({ fontFamily }) => fontFamily};
  ${({ m, mh, mv, mt, mr, mb, ml }) =>
    toStyle('margin', toMarginPaddingStyle(m, mh, mv, mt, mr, mb, ml))}
  line-height: ${({ lineHeight }) => lineHeight}px;
  text-align: ${({ textAlign = 'left' }) => textAlign};
  color: ${({ color, theme, hexColor }) => {
    if (hexColor) return hexColor;
    return theme[color || 'WHITE'];
  }};
  ${({ theme, color, underline = false }) =>
    underline
      ? css`
          text-decoration-style: solid;
          text-decoration-line: underline;
          text-decoration-color: ${theme[color || 'WHITE']};
        `
      : undefined}
`;

export { fontSettings };
export type { FontType };

export default Font;
