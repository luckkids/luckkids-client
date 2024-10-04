import React, { useMemo, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font, IconNames, L, SvgIcon } from '@design-system';
import { useMissionOutcomeCount, useMissionOutcomeList } from '@queries';
import { formatMissionTime } from '@utils';
import { missionApis } from '@apis/mission';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { IMissionListData } from '@types-common/page.types';

const S = {
  item: styled.View({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  Title: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  }),
  iconRound: styled.View({
    position: 'relative',
    width: '22px',
    height: '22px',
    borderRadius: '22px',
    border: `2px solid ${Colors.GREY1}`,
    marginRight: '16px',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  dot: styled.View({
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    backgroundColor: Colors.LUCK_GREEN,
  }),
  iconType: styled.View({
    marginRight: '16px',
  }),
};

interface IProps extends IMissionListData {}

export const MissionItem: React.FC<IProps> = (props) => {
  const { ...item } = props;
  const {
    missionStatus,
    alertTime: _alertTime,
    alertStatus: _alertStatus,
    id,
  } = item;
  const navigation = useNavigationService();

  const [alertTime, setAlertTime] = useState<string>(_alertTime);
  const [alertStatus, setAlertStatus] = useState<'CHECKED' | 'UNCHECKED'>(
    _alertStatus,
  );

  const [missionState, setMissionState] = useState<string>(missionStatus);

  const { refetch: refetchMissionOutcomeData } = useMissionOutcomeList();

  const { refetch: refetchMissionOutcomeCountData } = useMissionOutcomeCount();

  const iconType = useMemo((): IconNames => {
    switch (props.missionType) {
      case 'HOUSEKEEPING':
        return 'iconCategoryHouseKeeping';
      case 'SELF_CARE':
        return 'iconCategorySelfCare';
      case 'HEALTH':
        return 'iconCategoryHealth';
      case 'WORK':
        return 'iconCategoryWork';
      case 'MINDSET':
        return 'iconCategoryMineSet';
      case 'SELF_DEVELOPMENT':
        return 'iconCategorySelfDevelopment';
      default:
        return 'iconCategoryHouseKeeping';
    }
  }, [props]);

  const bullet = useMemo(() => {
    return missionState === 'SUCCEED' ? <S.dot /> : null;
  }, [missionState]);

  const handleChangeMissionState = async () => {
    const updatedState = missionState === 'SUCCEED' ? 'FAILED' : 'SUCCEED';
    const { data } = await missionApis.patchMissionOutcome(id, {
      missionStatus: updatedState,
    });

    setMissionState(updatedState);

    if (data.levelUpResult) {
      // 레벨업 화면
      const { level, characterType } = data;

      navigation.push('HomeLevel', {
        level,
        type: characterType,
      });
    }

    // refetch
    refetchMissionOutcomeData();
    refetchMissionOutcomeCountData();
  };

  return (
    <L.Row ph={25} pv={20} justify={'space-between'} items="center">
      <TouchableWithoutFeedback onPress={handleChangeMissionState}>
        <S.Title>
          <S.iconRound>{bullet}</S.iconRound>
          <S.iconType>
            <SvgIcon name={iconType} size={24} />
          </S.iconType>
          <L.Row mr={12} flex-1>
            <Font
              type={'BODY_SEMIBOLD'}
              color={missionState === 'SUCCEED' ? 'GREY1' : 'WHITE'}
            >
              {props.missionDescription}
            </Font>
          </L.Row>
        </S.Title>
      </TouchableWithoutFeedback>
      <Font type={'SUBHEADLINE_REGULAR'} color="GREY2">
        {alertStatus === 'CHECKED' ? formatMissionTime(alertTime) : '알림 끔'}
      </Font>
    </L.Row>
  );
};
