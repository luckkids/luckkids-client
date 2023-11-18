import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Font, L, SvgIcon } from '@design-system';

interface missionState {
  isCheck?: boolean;
  isSetAlarm?: boolean;
}

export const MisstionRepairItem: React.FC<missionState> = ({
  isCheck,
  isSetAlarm = false,
}) => {
  const [alarm, setAlarm] = useState(isSetAlarm);
  return (
    <L.Row ph={25} pv={15} items={'center'} justify={'space-between'}>
      <L.Row items={'center'}>
        <TouchableWithoutFeedback onPress={() => console.log('추가')}>
          <SvgIcon name={isCheck ? 'lucky_check' : 'lucky_uncheck'} size={22} />
        </TouchableWithoutFeedback>
        <L.Col pl={25}>
          <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'}>
            자전거타기
          </Font>
          {alarm && (
            <Font
              type={'FOOTNOTE_REGULAR'}
              color={'GREY1'}
              style={StyleSheet.flatten({
                marginTop: 4,
              })}
            >
              오전 8:00
            </Font>
          )}
        </L.Col>
      </L.Row>
      {!alarm && (
        <TouchableWithoutFeedback onPress={() => setAlarm(!alarm)}>
          <SvgIcon name={'bell_off'} size={18} />
        </TouchableWithoutFeedback>
      )}
    </L.Row>
  );
};
