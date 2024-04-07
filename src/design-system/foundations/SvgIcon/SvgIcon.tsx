import React from 'react';
import { SvgXml } from 'react-native-svg';
import * as icons from './icons';
import { IconNames } from './SvgIcon.types';

const SvgIcon = React.memo((props: SvgIconProps) => {
  const { name, color, width, height, size } = props;
  return (
    <SvgXml
      xml={Icons[name]}
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
  width?: number | string;
  height?: number | string;
  size?: number | string;
  color?: string;
  name: IconNames;
};

export default SvgIcon;
