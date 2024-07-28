import React, { useRef, useState } from 'react';
import { Animated, Keyboard, StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { DEFAULT_MARGIN } from '@constants';
import { Font } from '@design-system';
import Colors from '../../../design-system/colors';
import { MissionRepairItem } from '@components/page/mission/misstion.repair.item';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { useFetch } from '@hooks/useFetch';
import { IMissionDataItem } from '@types-common/page.types';

interface IProps extends IMissionDataItem {
  isCheck?: boolean;
  isRepair?: boolean;
  isDisable?: boolean;
  onDeleteAfterFn: () => void;
}

const onDeleteSnackBar = () => {
  Keyboard.dismiss();
  return SnackBar.show({
    title: `습관이 삭제되었어요`,
    position: 'bottom',
    width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
    rounded: 25,
    offsetY: 110,
  });
};

export const MissionSwipeRepairItem: React.FC<IProps> = (props) => {
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const swipeableRef = useRef<Swipeable>(null);
  const [visible, setVisible] = useState<boolean>(true);
  const { onFetch: deleteFn } = useFetch({
    method: 'DELETE',
    url: `/missions/${props.id}`,
  });

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 1],
      extrapolate: 'clamp',
    });

    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          deleteFn();
          props.onDeleteAfterFn();
          onDeleteSnackBar();
          setVisible(false);
        }}
      >
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Font type={'BODY_REGULAR'} color={'WHITE'} textAlign={'center'}>
            삭제
          </Font>
        </Animated.Text>
      </RectButton>
    );
  };

  if (!visible) return <></>;
  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpenStartDrag={() => setIsSwiping(true)}
      onSwipeableClose={() => setIsSwiping(false)}
    >
      <MissionRepairItem
        isDisable={props.isDisable ?? false}
        {...props}
        isRepair={props.isRepair}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    justifyContent: 'center',
    backgroundColor: Colors.RED,
    width: 74,
  },
  actionText: {
    color: 'white',
    justifyContent: 'center',
  },
});
