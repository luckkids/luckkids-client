import { useState } from 'react';
import WheelPicker from 'react-native-wheely';
import styled from 'styled-components/native';
import { Colors, Font, Button, L, FontSettings } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';

const S = {
  popupWrap: styled.View({
    backgroundColor: Colors.BG_SECONDARY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 25,
  }),
  buttonWrap: styled.View({
    marginTop: 35,
  }),
};

interface IProps {
  onConfirmTime: (time: number) => void;
  initialTime: number;
}

const MERIDIEM_OPTIONS = ['오전', '오후'];
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function SettingAlarmLuckTimePicker({
  onConfirmTime,
  initialTime,
}: IProps) {
  const [date, setDate] = useState(new Date(initialTime));

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        알림 허용 시간
      </Font>
      <L.Row w="100%" justify="center" g={30}>
        {/* meridiem */}
        <WheelPicker
          selectedIndex={
            date.getHours() > 12
              ? MERIDIEM_OPTIONS.indexOf('오후')
              : MERIDIEM_OPTIONS.indexOf('오전')
          }
          options={MERIDIEM_OPTIONS}
          onChange={(index) => {
            const tempDate = new Date(date);
            const newHour = date.getHours() + (index === 0 ? -12 : 12);
            tempDate.setHours(newHour);
            setDate(tempDate);
          }}
          itemTextStyle={{
            ...FontSettings.TITLE2_REGULAR,
            color: Colors.WHITE,
          }}
          containerStyle={{
            backgroundColor: Colors.TRANSPARENT,
          }}
          visibleRest={2}
          selectedIndicatorStyle={{
            backgroundColor: Colors.TRANSPARENT,
          }}
        />
        {/* 시간 */}
        <WheelPicker
          selectedIndex={HOUR_OPTIONS.indexOf(date.getHours() % 12 || 12)}
          options={HOUR_OPTIONS.map(String)}
          onChange={(index) => {
            const tempDate = new Date(date);
            tempDate.setHours(
              HOUR_OPTIONS[index] + (date.getHours() >= 12 ? 12 : 0),
            );
            setDate(tempDate);
          }}
          visibleRest={2}
          itemTextStyle={{
            ...FontSettings.TITLE2_REGULAR,
            color: Colors.WHITE,
          }}
          containerStyle={{
            backgroundColor: Colors.TRANSPARENT,
          }}
          selectedIndicatorStyle={{
            backgroundColor: Colors.TRANSPARENT,
          }}
        />
        {/* 분 : 00으로 고정 */}
        <WheelPicker
          selectedIndex={0}
          options={['00']}
          onChange={(index) => {
            //
          }}
          visibleRest={2}
          itemTextStyle={{
            ...FontSettings.TITLE2_REGULAR,
            color: Colors.WHITE,
          }}
          containerStyle={{
            backgroundColor: Colors.TRANSPARENT,
          }}
          selectedIndicatorStyle={{
            backgroundColor: Colors.TRANSPARENT,
          }}
        />
      </L.Row>
      <S.buttonWrap>
        <Button
          type={'action'}
          text={'확인'}
          bgColor={'LUCK_GREEN'}
          onPress={() => {
            BottomSheet.hide();
            onConfirmTime(date.getTime());
          }}
        />
      </S.buttonWrap>
    </S.popupWrap>
  );
}
