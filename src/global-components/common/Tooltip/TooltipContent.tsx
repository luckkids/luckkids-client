import React from 'react';
import { L, SvgIcon, Font, IconNames, ColorKeys } from '@design-system';

interface TooltipContentProps {
  text: string;
  iconName?: IconNames;
  iconColor?: ColorKeys;
}

const TooltipContent: React.FC<TooltipContentProps> = ({
  text,
  iconName,
  iconColor,
}) => {
  return (
    <L.Row g={10}>
      <L.Col>
        <L.Row g={4} items="center">
          {iconName && <SvgIcon name={iconName} color={iconColor} size={16} />}
          <Font type="BODY_SEMIBOLD" color="BLACK">
            {text}
          </Font>
        </L.Row>
      </L.Col>
    </L.Row>
  );
};

export default TooltipContent;
