import React, {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
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
import Tooltip from '@components/common/Tooltip/Tooltip';
import MissionItemTimePicker from '@components/page/mission/mission.item.time.picker';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import { StorageKeys } from '@hooks/storage/keys';
import useAsyncStorage from '@hooks/storage/useAsyncStorage';
import { IMissionDataItem } from '@types-common/page.types';

interface IProps extends IMissionDataItem {
  isSelected: boolean;
  onSelect?: (isSelected: boolean) => void;
  showAlarmSettingTooltip?: boolean;
}

export const MissionRepairItem: React.FC<IProps> = ({
  isSelected,
  onSelect,
  showAlarmSettingTooltip = false,
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

  const [alertTextLayout, setAlertTextLayout] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const hasLayoutBeenMeasured = useRef(false);

  const { refetch: refetchMissionData } = useMissionList();
  const { refetch: refetchMissionOutcomeData } = useMissionOutcomeList();

  const { setValue: setMissionTimeRepairTooltip } =
    useAsyncStorage<StorageKeys.MissionTimeRepairTooltip>(
      StorageKeys.MissionTimeRepairTooltip,
    );

  const handleToggleSelect = () => {
    onSelect && onSelect(!isSelected);
  };

  const handleDelete = async () => {
    if (!item) return;
    try {
      await missionApis.deleteMission(id);
      SnackBar.show({
        title: '습관이 삭제되었어요',
        rounded: 15,
        position: 'bottom',
        offsetY: 24,
        pv: 20,
        ph: 20,
        backgroundColor: '#444444',
      });

      setIsSwiping(false);
    } catch (e) {
      console.error(e);
    }

    await refetchMissionData();
    await refetchMissionOutcomeData();
  };

  // 알림 설정 바텀 시트
  const handlePressAlertTime = useCallback(
    async (event: GestureResponderEvent) => {
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

      await setMissionTimeRepairTooltip({ viewed: true });
    },
    [item],
  );

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

  const handleAlertTextLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!showAlarmSettingTooltip || hasLayoutBeenMeasured.current) return;

      const { layout } = event.nativeEvent;
      if (layout.width > 0 && layout.height > 0) {
        setAlertTextLayout({
          x: layout.x,
          y: layout.y,
          width: layout.width,
          height: layout.height,
        });
        hasLayoutBeenMeasured.current = true;
      }
    },
    [showAlarmSettingTooltip],
  );

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
          <View onLayout={handleAlertTextLayout}>
            <Font type={'BODY_SEMIBOLD'} color={'WHITE'}>
              {missionDescription}
            </Font>
          </View>
          {showAlarmSettingTooltip && alertTextLayout.width > 0 && (
            <TouchableWithoutFeedback onPress={handlePressAlertTime}>
              <L.Absolute
                b={alertTextLayout.height}
                l={alertTextLayout.width}
                style={{
                  transform: [{ translateX: -50 }],
                }}
              >
                <Tooltip
                  text={'알림 시간을 설정할 수 있어요'}
                  bgColor="LUCK_GREEN"
                  opacity={1}
                  textColor="BLACK"
                />
              </L.Absolute>
            </TouchableWithoutFeedback>
          )}
          {/* 알림 */}
          <TouchableWithoutFeedback onPress={handlePressAlertTime}>
            <L.Col ml={13}>
              <Font
                type={'FOOTNOTE_REGULAR'}
                color={'GREY2'}
                style={{
                  flexWrap: 'wrap',
                }}
              >
                {getAlertText()}
              </Font>
            </L.Col>
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

  // Reset layout measurement when tooltip visibility changes
  useEffect(() => {
    if (showAlarmSettingTooltip) {
      hasLayoutBeenMeasured.current = false;
    }
  }, [showAlarmSettingTooltip]);

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
