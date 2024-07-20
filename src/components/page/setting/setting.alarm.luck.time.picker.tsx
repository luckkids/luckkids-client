import { useState } from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { Colors, Font, Button } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';

const S = {
  disabledButton: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  }),
  popupWrap: styled.View({
    backgroundColor: Colors.BG_SECONDARY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 25,
  }),
  popupItemContainer: styled.View({
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  popupItemWrap: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  popupItemLogo: styled.View({
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREY4,
    borderRadius: 50,
  }),
  buttonWrap: styled.View({
    marginTop: 35,
  }),
};

interface IProps {
  onConfirmTime: (time: number) => void;
  initialTime: number;
}

export default function SettingAlarmLuckTimePicker({
  onConfirmTime,
  initialTime,
}: IProps) {
  const [date, setDate] = useState(new Date(initialTime));

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    onConfirmTime(tempDate.getTime());
  };

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        알림 허용 시간
      </Font>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        is24Hour={false}
        display="spinner"
        mode={'time'}
        onChange={onChange}
        textColor={Colors.WHITE}
        locale="ko"
        minuteInterval={30}
      />
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
