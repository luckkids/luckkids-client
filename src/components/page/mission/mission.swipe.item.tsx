import React, { Dispatch } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { MissionItem } from '@components/page/mission/mission.item';
import { IMissionListData } from '@types-common/page.types';

interface IProps extends IMissionListData {
  prevCount: number;
  setCount: Dispatch<number>;
}
const renderRightActions = (
  progress: Animated.AnimatedInterpolation<number>,
  dragX: Animated.AnimatedInterpolation<number>,
) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <RectButton
      style={styles.rightAction}
      onPress={() => console.log('delete')}
    >
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Delete
      </Animated.Text>
    </RectButton>
  );
};

export const MissionSwipeItem: React.FC<IProps> = (props) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <MissionItem {...props} />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  rightAction: {
    justifyContent: 'center',
    backgroundColor: 'red',
    flex: 0.2,
  },
  actionText: {
    color: 'white',
    fontWeight: '600',
    padding: 20,
  },
});
