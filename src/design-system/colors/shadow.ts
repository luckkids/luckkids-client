import { Platform } from 'react-native';
import { css } from 'styled-components/native';

export const shadow01 = Platform.select({
  ios: css`
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  `,
  android: css`
    elevation: 10;
    shadow-color: ${({ theme }) => theme.BASIC_BLACK}90;
  `,
  default: css`
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  `,
});
