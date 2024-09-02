import React, { useEffect, useMemo, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { Font, L, SvgIcon } from '@design-system';
import MissionItemTimePicker from '@components/page/mission/mission.item.time.picker';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { useFetch } from '@hooks/useFetch';
import { IMissionDataItem } from '@types-common/page.types';
import { formatMissionTime } from '@utils';

interface IProps extends IMissionDataItem {
  isCheck?: boolean;
  isDisable: boolean;
  isRepair?: boolean;
  onClick?: () => void;
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
  isDisable,
  onClick,
  isRepair = false,
  isCheck,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(Boolean(isCheck));
  const [isDisabled, setIsDisabled] = useState<boolean>(isDisable);
  const [rtnTime, setRtnTime] = useState(alertTime);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { onFetch: onRepairFn } = useFetch({
    method: 'PATCH',
    url: `/missions/${id}`,
    value: {
      missionType: missionType,
      missionActive: isDisabled ? 'FALSE' : 'TRUE',
      missionDescription: missionDescription,
      alertStatus: isChecked ? 'CHECKED' : 'UNCHECKED',
      alertTime: rtnTime,
    },
  });

  const { onFetch: onCopyFn } = useFetch({
    method: 'POST',
    url: '/missions/new',
    value: {
      luckkidsMissionId: isRepair ? luckkidsMissionId : null,
      missionType: missionType,
      missionDescription: missionDescription,
      alertStatus: 'CHECKED',
      alertTime: alertTime,
    },
  });

  useEffect(() => {
    if (isRepair && isDisable !== isDisabled && id) onRepairFn();
  }, [isDisabled]);

  useEffect(() => {
    if (buttonClicked) {
      onRepairFn();
      setButtonClicked(false);
    }
  }, [isChecked, buttonClicked]);

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
                  setIsCheckFn={(value: boolean) => {
                    setIsChecked(value);
                  }}
                  onConfirm={() => {
                    // onRepairFn();
                    setButtonClicked(true);
                  }}
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
              {formatMissionTime(rtnTime)}
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
  }, [isChecked, rtnTime]);

  return (
    <L.Row
      ph={25}
      pv={22}
      items={'center'}
      justify={'space-between'}
      bg={luckkidsMissionId !== null ? 'LABEL_QUATERNARY' : 'BG_PRIMARY'}
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
            if (isRepair) {
              setIsDisabled(!isDisabled);

              if (onClick) {
                onCopyFn();
                onClick();
              }
            }
          }}
        >
          <View>
            <SvgIcon
              name={isDisabled ? 'lucky_uncheck' : 'lucky_check'}
              size={30}
            />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};
