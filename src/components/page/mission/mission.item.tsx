import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Colors, Font, L } from '@design-system';
import { useFetch } from '@hooks/useFetch';
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
};

export const MissionItem: React.FC<IMissionListData> = (props) => {
  const [missionState, setMissionState] = useState(
    props.missionStatus === 'SUCCEED',
  );
  const { onFetch: isSuccessCount, isSuccess: isSuccessCounterState } =
    useFetch({
      method: 'PATCH',
      url: `/missionOutcomes/${props.id}`,
      value: {
        missionStatus: missionState ? 'SUCCEED' : 'FAILED',
      },
      onSuccessCallback: (rtn) => {
        if (props.setCount) {
          props.setCount(rtn);
        }
      },
    });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setMissionState(!missionState);
        isSuccessCount();
      }}
    >
      <L.Row ph={25} pv={20} justify={'space-between'}>
        <S.Title>
          <S.iconRound>{missionState ? <S.dot /> : null}</S.iconRound>
          <Font type={'BODY_SEMIBOLD'}>{props.missionDescription}</Font>
        </S.Title>
        <Font type={'SUBHEADLINE_REGULAR'}>{props.alertTime}</Font>
      </L.Row>
    </TouchableWithoutFeedback>
  );
};
