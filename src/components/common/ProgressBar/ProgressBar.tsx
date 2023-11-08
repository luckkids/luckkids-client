import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { L } from '@design-system';
import * as S from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, widthAnim]);

  return (
    <S.ProgressBarWrapper w={'100%'} h={4}>
      <L.Absolute
        w={'100%'}
        bg="LUCK_GREEN"
        h={4}
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
        bg="LUCK_GREEN"
        h={4}
        l={0}
        opacity={1}
        rounded={999}
      />
    </S.ProgressBarWrapper>
  );
};

export default ProgressBar;
