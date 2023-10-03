import React from 'react';
import { SvgXml } from 'react-native-svg';
import { IconNames } from './SvgIcon.types';
import * as icons from './icons';

const SvgIcon = React.memo((props: SvgIconProps) => {
  const { name, color, width, height, size } = props;
  const Icon: any = Icons[name];
  return (
    <SvgXml
      xml={Icon || null}
      color={color}
      width={size || width || 0}
      height={size || height || 0}
    />
  );
});

const Icons = {
  ...(icons || {}),
};

type SvgIconProps = {
  width?: number;
  height?: number;
  size?: number;
  color?: string;
  name: IconNames;
};

export default SvgIcon;
