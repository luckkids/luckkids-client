import React, { createElement, useCallback, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { DEFAULT_MARGIN } from '@constants';
import { Colors, Font, L, SvgIcon } from '@design-system';
import { useMissionList, useMissionOutcomeList } from '@queries';
import { formatMissionTime } from '@utils';
import { missionApis } from '@apis/mission';
import MissionItemTimePicker from '@components/page/mission/mission.item.time.picker';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { IMissionDataItem } from '@types-common/page.types';

interface IProps extends IMissionDataItem {
  isSelected: boolean;
  onSelect?: (isSelected: boolean) => void;
}

export const MissionRepairItem: React.FC<IProps> = ({
  isSelected,
  onSelect,
  ...item
}) => {
  const {
    missionActive,
    missionDescription,
    missionType,
    luckkidsMissionId,
    alertTime,
    alertStatus,
    id,
  } = item;

  // 수정 data (수정 시 사용)
  const swipeableRef = useRef<Swipeable>(null);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  const { refetch: refetchMissionData } = useMissionList();
  const { refetch: refetchMissionOutcomeData } = useMissionOutcomeList();

  const handleToggleSelect = () => {
    onSelect && onSelect(!isSelected);
  };

  const handleDelete = async () => {
    if (!item) return;
    await missionApis.deleteMission(id);

    await refetchMissionData();
    await refetchMissionOutcomeData();

    SnackBar.show({
      title: `습관이 삭제되었습니다.`,
      width: SCREEN_WIDTH - DEFAULT_MARGIN * 2,
      position: 'bottom',
      rounded: 25,
      offsetY: 110,
    });
  };

  // 알림 설정 바텀 시트
  const handlePressAlertTime = useCallback(() => {
    if (!item) return;
    BottomSheet.show({
      component: (
        <MissionItemTimePicker
          alertTime={item?.alertTime}
          alertStatus={item?.alertStatus}
          onConfirm={async ({ alertTime, alertStatus }) => {
            if (id) {
              await missionApis.editMission({
                missionId: id,
                data: {
                  alertStatus,
                  alertTime,
                },
              });
            } else {
              await missionApis.createMission({
                luckkidsMissionId: luckkidsMissionId,
                missionType: missionType,
                missionDescription: missionDescription,
                alertStatus: alertStatus,
                alertTime: alertTime,
              });
            }

            SnackBar.show({
              leftElement: createElement(SvgIcon, {
                name: 'lucky_check',
                size: 20,
              }),
              width: 280,
              title: `습관 알림 시간이 변경되었습니다.`,
              position: 'bottom',
            });

            await refetchMissionData();
            await refetchMissionOutcomeData();
          }}
        />
      ),
    });
  }, [item]);

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
      <RectButton style={styles.rightAction} onPress={handleDelete}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Font type={'BODY_REGULAR'} color={'WHITE'} textAlign={'center'}>
            삭제
          </Font>
        </Animated.Text>
      </RectButton>
    );
  };

  const MissionContent = () => (
    <L.Row
      ph={25}
      pv={22}
      items={'center'}
      justify={'space-between'}
      bg={!luckkidsMissionId ? 'LABEL_QUATERNARY' : 'BG_PRIMARY'}
    >
      <L.Row items={'center'} justify={'space-between'} w={'100%'}>
        <L.Row items={'center'} w={'69%'}>
          <View>
            <Font type={'BODY_SEMIBOLD'} color={'WHITE'}>
              {missionDescription}
            </Font>
          </View>
          {/* 알림 */}
          <TouchableWithoutFeedback onPress={handlePressAlertTime}>
            <Font
              type={'FOOTNOTE_REGULAR'}
              color={'GREY2'}
              ml={13}
              style={{
                flexWrap: 'wrap',
              }}
            >
              {getAlertText()}
            </Font>
          </TouchableWithoutFeedback>
        </L.Row>
        <TouchableWithoutFeedback onPress={handleToggleSelect}>
          <View>
            <SvgIcon
              name={!isSelected ? 'lucky_uncheck' : 'lucky_check'}
              size={30}
            />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );

  const getAlertText = () => {
    if (item.isLuckkidsMission) {
      return formatMissionTime(item.alertTime);
    }
    if (item?.alertStatus === 'CHECKED') {
      return formatMissionTime(item.alertTime);
    }
    return '알림 끔';
  };

  return luckkidsMissionId ? (
    <MissionContent />
  ) : (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpenStartDrag={() => setIsSwiping(true)}
      onSwipeableClose={() => setIsSwiping(false)}
    >
      <MissionContent />
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
