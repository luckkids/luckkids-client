import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { ColorKeys } from '@design-system';
import * as S from './Toggle.styles';

const Toggle = (props: ToggleProps) => {
  const { value, onChange, disabled = false } = props;
  const animVal = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handlePress = useCallback(() => {
    if (disabled) return;
    const next = !value;
    onChange && onChange(next);
  }, [disabled, value]);

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.elastic(0),
    }).start();
  }, [value]);

  const toggleColor: ColorKeys = useMemo(() => {
    switch (true) {
      case !disabled && value:
        return 'LUCK_GREEN';
      default:
        return 'GREY5';
    }
  }, [disabled, value]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <S.Container>
        <S.BgView as={Animated.View} bgColor={toggleColor} />
        <S.Indicator
          as={Animated.View}
          style={{
            transform: [
              {
                translateX: animVal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [3, 50 - 3 - 26],
                }),
              },
            ],
          }}
        />
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

type ToggleProps = {
  disabled?: boolean;
  onChange?: (value: boolean) => void;
  value: boolean;
};

export default React.memo(Toggle);
