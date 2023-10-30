import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { ColorKeys, IconNames, L, SvgIcon } from '@design-system';

interface TopNavigationIconProps {
  name: IconNames;
  onPress?: () => void;
  color?: ColorKeys;
  size?: number;
}

const TopNavigationIcon: React.FC<TopNavigationIconProps> = ({
  name,
  onPress,
  color,
  size = 24,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <L.Row>
        <SvgIcon name={name} size={size} color={color} />
      </L.Row>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(TopNavigationIcon);
