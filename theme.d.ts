import { ColorType } from './src/design-system/colors';
declare module 'styled-components/native' {
  export interface DefaultTheme extends ColorType {
    //
  }
}
