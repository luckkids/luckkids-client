import { Dispatch, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { Colors, Font, SvgIcon, L, Button } from '@design-system';
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
  isCheck: boolean;
  setRtnTime: Dispatch<string>;
  setIsCheckFn: Dispatch<boolean>;
  onConfirm: () => void;
}
export default function MissionItemTimePicker(props: IProps) {
  const [isChange, setIsChange] = useState(props.isCheck);
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fTime = `${
      tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()
    }:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    props.setRtnTime(fTime);
  };

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        알람 시간을 변경할 수 있어요
      </Font>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsChange(!isChange);
          props.setIsCheckFn(!isChange);
        }}
      >
        <S.disabledButton>
          <Font type={'BODY_REGULAR'} color={isChange ? 'GREY1' : 'WHITE'}>
            알림끄기
          </Font>
          <L.Row ml={12}>
            <SvgIcon
              name={isChange ? 'iconCheckAlarmOff' : 'iconCheckAlarmOn'}
              size={10}
            />
          </L.Row>
        </S.disabledButton>
      </TouchableWithoutFeedback>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        is24Hour={false}
        display="spinner"
        mode={'time'}
        onChange={onChange}
        textColor={Colors.WHITE}
        disabled={!isChange}
      />
      <S.buttonWrap>
        <Button
          type={'action'}
          text={'확인'}
          bgColor={'LUCK_GREEN'}
          onPress={() => {
            BottomSheet.hide().then(() => props.onConfirm());
          }}
        />
      </S.buttonWrap>
    </S.popupWrap>
  );
}
