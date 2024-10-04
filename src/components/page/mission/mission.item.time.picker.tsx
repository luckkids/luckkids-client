import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styled from 'styled-components/native';
import { Colors, Font, SvgIcon, L, Button } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';

interface IProps {
  onConfirm: ({
    alertTime,
    alertStatus,
  }: {
    alertTime: string;
    alertStatus: 'CHECKED' | 'UNCHECKED';
  }) => void;
  alertTime: string;
  alertStatus: 'CHECKED' | 'UNCHECKED';
}

export default function MissionItemTimePicker({
  onConfirm,
  alertTime,
  alertStatus,
}: IProps) {
  const [newAlertTime, setNewAlertTime] = useState(alertTime);
  const [isDisabled, setIsDisabled] = useState<boolean>(
    alertStatus === 'UNCHECKED',
  );

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (!selectedDate) return;

    const formattedTime = format(selectedDate, 'HH:mm:00');

    setNewAlertTime(formattedTime);
  };

  const handleConfirm = () => {
    onConfirm({
      alertTime: newAlertTime,
      alertStatus: isDisabled ? 'UNCHECKED' : 'CHECKED',
    });
    BottomSheet.hide();
  };

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        알람 시간을 변경할 수 있어요
      </Font>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsDisabled(!isDisabled);
        }}
      >
        <S.disabledButton>
          <Font type={'BODY_REGULAR'} color={isDisabled ? 'GREY1' : 'WHITE'}>
            알림 끄기
          </Font>
          <L.Row ml={12}>
            <SvgIcon
              name={isDisabled ? 'iconCheckAlarmOff' : 'iconCheckAlarmOn'}
              size={10}
              color={isDisabled ? 'GREY1' : 'LUCK_GREEN'}
            />
          </L.Row>
        </S.disabledButton>
      </TouchableWithoutFeedback>
      <DateTimePicker
        testID="dateTimePicker"
        value={
          newAlertTime ? new Date(`2021-01-01T${newAlertTime}`) : new Date()
        }
        is24Hour={false}
        display="spinner"
        mode={'time'}
        onChange={handleChange}
        textColor={Colors.WHITE}
        disabled={isDisabled}
        minuteInterval={5}
      />
      <S.buttonWrap>
        <Button
          type={'action'}
          text={'확인'}
          bgColor={'LUCK_GREEN'}
          onPress={handleConfirm}
        />
      </S.buttonWrap>
    </S.popupWrap>
  );
}

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
