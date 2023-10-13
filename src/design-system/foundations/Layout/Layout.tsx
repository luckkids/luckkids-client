import styled, { css } from 'styled-components/native';
import { BoxStyle, FlexStyle, MarginStyle, PaddingStyle } from './Layout.types';
import { toMarginPaddingStyle, toStyle } from './Layout.utils';

export const Layout = styled.View<LayoutStyles>`
  ${({
    theme,
    p,
    ph,
    pv,
    pt,
    pr,
    pb,
    pl,
    m,
    mh,
    mv,
    mt,
    mr,
    mb,
    ml,
    w,
    h,
    g,
    'flex-1': flex,
    rounded,
    outline,
    items,
    justify,
    bg,
  }) => css`
    ${toStyle('padding', toMarginPaddingStyle(p, ph, pv, pt, pr, pb, pl))}
    ${toStyle('margin', toMarginPaddingStyle(m, mh, mv, mt, mr, mb, ml))}
    ${toStyle('width', w)}
    ${toStyle('height', h)}
    ${toStyle('gap', g)}
    ${toStyle('border-radius', rounded)}
    ${toStyle('border-color', outline ? theme[outline] : undefined)}
    ${typeof rounded === 'number' ? 'overflow: hidden;' : ''}
    ${typeof outline === 'string' ? 'border-width: 1.5px;' : ''}
    align-items: ${items || 'flex-start'};
    justify-content: ${justify || 'flex-start'};
    background-color: ${theme[bg || 'TRANSPARENT']};
    ${flex ? `flex: 1;` : ''};
  `}
`;

export const Col = styled(Layout)`
  flex-direction: column;
`;

export const Row = styled(Layout)`
  flex-direction: row;
`;

export type LayoutStyles = BoxStyle & FlexStyle & MarginStyle & PaddingStyle;
