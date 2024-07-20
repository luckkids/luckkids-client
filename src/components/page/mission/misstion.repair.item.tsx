import React, { useEffect, useMemo, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { Font, L, SvgIcon } from '@design-system';
import MissionItemTimePicker from '@components/page/mission/mission.item.time.picker';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { useFetch } from '@hooks/useFetch';
import { IMissionDataItem } from '@types-common/page.types';

interface IProps extends IMissionDataItem {
  isCheck?: boolean;
  isActive: boolean;
  isSwipeOpen?: boolean;
  isRepair?: boolean;
}

const S = {
  description: styled.View({}),
};
export const MissionRepairItem: React.FC<IProps> = ({
  missionDescription,
  luckkidsMissionId,
  id,
  alertTime,
  alertStatus,
  missionType,
  isActive,
  isRepair = false,
  isCheck,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(Boolean(isCheck));
  const [rtnTime, setRtnTime] = useState(alertTime);
  const { onFetch: onRepairFn, isSuccess } = useFetch({
    method: 'PATCH',
    url: `/missions/${id}`,
    value: {
      missionType: missionType,
      missionDescription: missionDescription,
      alertStatus: isChecked ? 'CHECKED' : 'UNCHECKED',
      alertTime: rtnTime,
    },
  });

  const { onFetch: onCopyFn } = useFetch({
    method: 'POST',
    url: '/missions/new',
    value: {
      missionType: missionType,
      missionDescription: missionDescription,
      alertStatus: 'CHECKED',
      alertTime: alertTime,
    },
  });

  useEffect(() => {
    console.log('change!!!');
    if (isRepair && isCheck !== isChecked) onRepairFn();
  }, [isChecked]);

  const timePickerHandler = useMemo(() => {
    if (isRepair) {
      return (
        <TouchableWithoutFeedback
          onPress={() =>
            BottomSheet.show({
              component: (
                <MissionItemTimePicker
                  isCheck={isChecked}
                  setRtnTime={setRtnTime}
                  setIsCheckFn={() => setIsChecked(!isChecked)}
                  isOnFetchFn={() => onRepairFn()}
                />
              ),
            })
          }
        >
          {isChecked ? (
            <Font
              type={'FOOTNOTE_REGULAR'}
              color={'WHITE'}
              style={{ marginLeft: 13 }}
            >
              {rtnTime}
            </Font>
          ) : (
            <Font
              type={'FOOTNOTE_REGULAR'}
              color={'GREY1'}
              style={{ marginLeft: 13 }}
            >
              알림 끔
            </Font>
          )}
        </TouchableWithoutFeedback>
      );
    }

    return (
      <Font
        type={'FOOTNOTE_REGULAR'}
        color={'WHITE'}
        style={{ marginLeft: 13 }}
      >
        {alertTime}
      </Font>
    );
  }, []);

  return (
    <L.Row
      ph={25}
      pv={15}
      items={'center'}
      justify={'space-between'}
      bg={luckkidsMissionId !== null ? 'LABEL_QUATERNARY' : 'TRANSPARENT'}
    >
      <L.Row items={'center'} justify={'space-between'} w={'100%'}>
        <L.Row items={'center'} w={'69%'}>
          <S.description>
            <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'}>
              {missionDescription}
            </Font>
          </S.description>
          {timePickerHandler}
        </L.Row>
        <TouchableWithoutFeedback
          onPress={() => {
            if (isRepair) return setIsChecked(!isChecked);
            return onCopyFn();
          }}
        >
          <View>
            <SvgIcon
              name={isActive ? 'lucky_check' : 'lucky_uncheck'}
              size={30}
            />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};
