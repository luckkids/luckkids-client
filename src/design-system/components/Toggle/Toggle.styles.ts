import styled from 'styled-components/native';
import { ColorKeys } from '@design-system';

export const Indicator = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 26px;
  background-color: ${({ theme }) => theme.WHITE};
  position: absolute;
`;

export const BgView = styled.View<{
  bgColor: ColorKeys;
}>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${({ bgColor, theme }) => theme[bgColor]};
`;

export const Container = styled.View`
  width: 50px;
  height: 30px;
  border-radius: 30px;
  overflow: hidden;
  justify-content: center;
`;
