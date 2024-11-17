import React from 'react';
import { ColorKeys, Colors, Font, L } from '@design-system';

interface TooltipProps {
  text: string;
  bgColor?: ColorKeys;
  textColor?: ColorKeys;
  opacity?: number;
  arrowPosition?: 'center' | 'left' | 'right'; // 화살표 위치 설정을 위한 prop
  arrowOffset?: number; // 화살표의 오프셋을 조정하기 위한 prop
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  bgColor = 'BLACK',
  textColor = 'WHITE',
  opacity = 0.6,
  arrowPosition = 'center',
  arrowOffset = 0,
}) => {
  if (!text) return null;

  const getArrowStyle = () => {
    const baseStyle = {
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
    };

    const positionStyle = {
      center: {},
      left: {
        marginLeft: arrowOffset,
      },
      right: {
        marginRight: -arrowOffset,
      },
    };

    return {
      ...baseStyle,
      ...positionStyle[arrowPosition],
    };
  };

  const getArrowContainerStyle = () => {
    const baseStyle = {
      width: '100%',
    };

    const positionStyle = {
      center: { justifyContent: 'center' },
      left: { justifyContent: 'flex-start' },
      right: { justifyContent: 'flex-end' },
    };

    return {
      ...baseStyle,
      ...positionStyle[arrowPosition],
    };
  };

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
      <L.Row
        w="100%"
        justify={(function () {
          switch (arrowPosition) {
            case 'center':
              return 'center';
            case 'left':
              return 'flex-start';
            case 'right':
              return 'flex-end';
            default:
              return 'center';
          }
        })()}
      >
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
            marginLeft: arrowPosition === 'left' ? arrowOffset : 0,
            marginRight: arrowPosition === 'right' ? -arrowOffset : 0,
          }}
        />
      </L.Row>
    </L.Col>
  );
};

export default Tooltip;
