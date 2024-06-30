import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { ColorKeys, L } from '@design-system';
import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number;
  height?: number;
  backgroundColor?: ColorKeys;
  activeColor?: ColorKeys;
}

const ProgressBar = ({
  progress,
  height = 4,
  backgroundColor = 'LUCK_GREEN',
  activeColor = 'LUCK_GREEN',
}: ProgressBarProps) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, widthAnim]);

  return (
    <S.ProgressBarWrapper w={'100%'} h={height}>
      <L.Absolute
        w={'100%'}
        bg={backgroundColor}
        h={height}
        l={0}
        opacity={0.5}
        rounded={999}
      />
      <L.Absolute
        as={Animated.View}
        style={{
          width: widthAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}
        bg={activeColor ?? 'LUCK_GREEN'}
        h={height}
        l={0}
        opacity={1}
        rounded={999}
      />
    </S.ProgressBarWrapper>
  );
};

export default ProgressBar;
