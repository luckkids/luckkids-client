import React, { useEffect, useMemo, useState } from 'react';
import {
  LayoutRectangle,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  createPopup,
  useFadeAnimationStyle,
  usePopupContext,
} from 'react-native-global-components';
import Animated from 'react-native-reanimated';
import { timer } from 'rxjs';
import { L } from '@design-system';

const ARROW_SIZE = 10;

interface TooltipProps {
  component: React.ReactNode;
  parentRef: React.RefObject<View> | React.MutableRefObject<View>;
  direction?: 'top' | 'bottom' | 'auto';
  hideAfter?: number;
  hideOnPressOutside?: boolean;

  leftFromParent?: number;
  rightFromParent?: number;

  // 툴팁이 이 영역을 벗어나지 않음
  // ___FromParent 값이 지정되지 않은 경우에만 사용
  screenPadding?: number;
}

const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  component,
  parentRef,
  direction: propsDirection = 'auto',
  hideAfter,
  screenPadding = 10,
  leftFromParent,
  rightFromParent,
}) => {
  const { style: fade } = useFadeAnimationStyle();
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const [parentRect, setRect] = useState<LayoutRectangle | null>(null);
  const [contentRect, setContentRect] = useState<LayoutRectangle | null>(null);

  const { hide } = usePopupContext();

  useEffect(() => {
    parentRef.current!.measure((x, y, width, height, pageX, pageY) => {
      setRect({ x: pageX, y: pageY, width, height });
    });
  }, []);

  const direction = useMemo<'top' | 'bottom'>(() => {
    if (propsDirection === 'auto') {
      return (parentRect?.y || 0) + (parentRect?.height || 0) > deviceHeight / 2
        ? 'top'
        : 'bottom';
    } else {
      return propsDirection;
    }
  }, [propsDirection]);

  const measuredPosition = useMemo<{
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  }>(() => {
    // don't show beofre the size is not measured
    if (!parentRect || !contentRect) return { top: deviceHeight };

    return new PositionCalculator({
      parentRect,
      contentRect,
      deviceWidth,
      deviceHeight,
      direction,
      screenPadding,
      leftFromParent,
      rightFromParent,
    }).calculate();
  }, [parentRect, contentRect, leftFromParent, rightFromParent]);

  useEffect(() => {
    if (typeof hideAfter !== 'number') return;
    const subscribe = timer(hideAfter!).subscribe(() => hide());

    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  if (!parentRect) return null;
  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            ...measuredPosition,
          },
          fade,
        ]}
        {...measuredPosition}
        onLayout={(e) => {
          setContentRect(e.nativeEvent.layout);
        }}
      >
        <L.Layout
          mt={direction === 'bottom' ? ARROW_SIZE : 0}
          mb={direction === 'top' ? ARROW_SIZE : 0}
          items="flex-start"
          rounded={15}
          ph={12}
          pv={6}
          g={10}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <View
            onTouchEnd={(e) => {
              e.stopPropagation();
            }}
          >
            {component}
          </View>
        </L.Layout>
      </Animated.View>
      <Animated.View
        onTouchEnd={(e) => e.stopPropagation()}
        style={[
          {
            position: 'absolute',
            top: measuredPosition.top,
            bottom: measuredPosition.bottom,
            left: parentRect.x + parentRect.width / 2 - ARROW_SIZE / 2,
          },
          defaultStyles.arrow,
          fade,
          direction === 'top'
            ? { transform: [{ rotate: '180deg' }] }
            : undefined,
        ]}
      />
    </>
  );
};

const defaultStyles = StyleSheet.create({
  arrow: {
    borderColor: 'transparent',
    borderBottomColor: 'rgba(0, 0, 0, 0.8)',
    borderTopWidth: 0,
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE / 2,
    borderRightWidth: ARROW_SIZE / 2,
  },
});

class PositionCalculator {
  parentRect: LayoutRectangle;
  contentRect: LayoutRectangle;
  deviceWidth: number;
  deviceHeight: number;
  direction: 'top' | 'bottom';
  screenPadding: number;
  leftFromParent?: number;
  rightFromParent?: number;

  constructor({
    parentRect,
    contentRect,
    deviceWidth,
    deviceHeight,
    direction,
    screenPadding,
    leftFromParent,
    rightFromParent,
  }: {
    parentRect: LayoutRectangle;
    contentRect: LayoutRectangle;
    deviceWidth: number;
    deviceHeight: number;
    direction: 'top' | 'bottom';
    screenPadding: number;
    leftFromParent?: number;
    rightFromParent?: number;
  }) {
    this.parentRect = parentRect;
    this.contentRect = contentRect;
    this.deviceWidth = deviceWidth;
    this.deviceHeight = deviceHeight;
    this.direction = direction;
    this.screenPadding = screenPadding;
    this.leftFromParent = leftFromParent;
    this.rightFromParent = rightFromParent;
  }

  calculate(): {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  } {
    let res = {
      top: this.calculateTop(),
      bottom: this.calculateBottom(),
      left: this.calculateLeft(),
      right: this.calculateRight(),
    };

    // adjust left/right only when leftFromParent and rightFromParent are not set
    if (
      typeof this.leftFromParent === 'undefined' &&
      typeof this.rightFromParent === 'undefined'
    ) {
      res = {
        ...res,
        ...this.applyScreenPadding(res),
      };
    }

    return res;
  }

  private calculateTop() {
    return this.direction === 'bottom'
      ? this.parentRect.y + this.parentRect.height
      : undefined;
  }

  private calculateBottom() {
    return this.direction === 'top'
      ? this.deviceHeight - this.parentRect.y
      : undefined;
  }

  private calculateLeft() {
    if (typeof this.leftFromParent === 'number') {
      return this.parentRect.x + this.leftFromParent;
    } else if (typeof this.rightFromParent === 'number') {
      return undefined;
    } else {
      return (
        this.parentRect.x + (this.parentRect.width - this.contentRect.width) / 2
      );
    }
  }

  private calculateRight() {
    if (typeof this.rightFromParent === 'number') {
      return (
        this.deviceWidth -
        (this.parentRect.x + this.parentRect.width - this.rightFromParent)
      );
    } else {
      return undefined;
    }
  }

  private applyScreenPadding({
    left,
    right,
  }: {
    left?: number;
    right?: number;
  }): { left?: number; right?: number } {
    if (typeof left === 'undefined') {
      return { left, right };
    }

    if (left < this.screenPadding) {
      left = this.screenPadding;
      right = undefined;
    }

    if (left + this.contentRect.width > this.deviceWidth - this.screenPadding) {
      right = this.screenPadding;
      left = undefined;
    }
    return { left, right };
  }
}

export default createPopup(Tooltip);
