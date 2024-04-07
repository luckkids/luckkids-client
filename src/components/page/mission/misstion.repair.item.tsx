import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { Button, Colors, Font, L, SvgIcon } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { IMissionDataItem, IMissionListData } from '@types-common/page.types';

interface IProps extends IMissionDataItem {
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
export const MisstionRepairItem: React.FC<IProps> = ({
  missionDescription,
  alertStatus,
  alertTime,
  isCheck,
  isSetAlarm = false,
}) => {
  const [alarm, setAlarm] = useState(isSetAlarm);
  const [date, setDate] = useState(new Date(1598051730000));
  const [isDisabled, setIsDisabled] = useState(false);
  const [rtnTime, setRtnTime] = useState('');

  useEffect(() => {
    setRtnTime(alertTime);
  }, []);
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fTime = `${
      tempDate.getHours() < 10 ? `0${tempDate.getHours()}` : tempDate.getHours()
    }:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    setRtnTime(fTime);
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
                알림끄기
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
            is24Hour={false}
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
            {missionDescription}
          </Font>
          <TouchableWithoutFeedback onPress={() => onTimePicker()}>
            {alarm ? (
              <Font
                type={'FOOTNOTE_REGULAR'}
                color={'GREY1'}
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
                알림끔
              </Font>
            )}
          </TouchableWithoutFeedback>
        </L.Row>
        <View>
          <SvgIcon name={isCheck ? 'lucky_check' : 'lucky_uncheck'} size={30} />
        </View>
      </L.Row>
    </L.Row>
  );
};
