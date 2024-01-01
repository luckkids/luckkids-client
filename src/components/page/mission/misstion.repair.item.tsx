import React, { useCallback, useState } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Colors, Font, L, SvgIcon } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import styled from 'styled-components/native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface missionState {
  isCheck?: boolean;
  isSetAlarm?: boolean;
}

const S = {
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
  disabledButton: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  }),
};
export const MisstionRepairItem: React.FC<missionState> = ({
  isCheck,
  isSetAlarm = false,
}) => {
  const [alarm, setAlarm] = useState(isSetAlarm);
  const [date, setDate] = useState(new Date(1598051730000));
  const [isDisabled, setIsDisabled] = useState(false);
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const onTimePicker = useCallback(() => {
    BottomSheet.show({
      component: (
        <S.popupWrap>
          <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
            알람 시간을 변경할 수 있어요
          </Font>
          <TouchableWithoutFeedback onPress={() => setIsDisabled(!isDisabled)}>
            <S.disabledButton>
              <Font
                type={'BODY_REGULAR'}
                color={isDisabled ? 'GREY1' : 'WHITE'}
              >
                알람 끄기
              </Font>
              <L.Row ml={12}>
                <SvgIcon
                  name={isDisabled ? 'iconCheckAlarmOff' : 'iconCheckAlarmOn'}
                  size={10}
                />
              </L.Row>
            </S.disabledButton>
          </TouchableWithoutFeedback>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            is24Hour={true}
            display="spinner"
            mode={'time'}
            onChange={onChange}
            textColor={Colors.WHITE}
            disabled={isDisabled}
          />
          <S.buttonWrap>
            <Button
              type={'action'}
              text={'확인'}
              bgColor={'LUCK_GREEN'}
              onPress={BottomSheet.hide}
            />
          </S.buttonWrap>
        </S.popupWrap>
      ),
    });
  }, [isDisabled]);
  return (
    <L.Row ph={25} pv={15} items={'center'} justify={'space-between'}>
      <L.Row items={'center'} justify={'space-between'} w={'100%'}>
        <L.Row items={'center'}>
          <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'}>
            자전거타기
          </Font>
          {alarm ? (
            <Font
              type={'FOOTNOTE_REGULAR'}
              color={'GREY1'}
              style={{ marginLeft: 13 }}
            >
              오전 8:00
            </Font>
          ) : (
            <Font
              type={'FOOTNOTE_REGULAR'}
              color={'GREY1'}
              style={{ marginLeft: 13 }}
            >
              알림끔
            </Font>
          )}
        </L.Row>
        <TouchableWithoutFeedback onPress={() => onTimePicker()}>
          <View>
            <SvgIcon
              name={isCheck ? 'lucky_check' : 'lucky_uncheck'}
              size={30}
            />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};
