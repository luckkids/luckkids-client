import React from 'react';
import { ColorKeys, Colors, Font, L } from '@design-system';

interface TooltipProps {
  text: string;
  bgColor?: ColorKeys;
  textColor?: ColorKeys;
  opacity?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  bgColor = 'BLACK',
  textColor = 'WHITE',
  opacity = 0.6,
}) => {
  if (!text) return null;
  return (
    <L.Col items="center">
      {/* container */}
      <L.Row
        pv={6}
        ph={12}
        rounded={20}
        style={{
          backgroundColor: `${Colors[bgColor]}`,
          opacity,
        }}
      >
        <Font type="BODY_SEMIBOLD" color={textColor}>
          {text}
        </Font>
      </L.Row>
      {/* arrow */}
      <L.Row w="100%" justify="center">
        <L.Row
          bg={bgColor}
          style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 6,
            borderRightWidth: 6,
            borderTopWidth: 10,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: Colors[bgColor],
            opacity,
          }}
        />
      </L.Row>
    </L.Col>
  );
};

export default Tooltip;
