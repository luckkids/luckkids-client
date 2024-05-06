import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { Button, Colors, Font, L, SvgIcon } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { IMissionDataItem } from '@types-common/page.types';
import { useFetch } from '@hooks/useFetch';

interface IProps extends IMissionDataItem {
  isCheck?: boolean;
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
  id,
  alertStatus,
  alertTime,
  missionType,
  isCheck,
}) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [rtnTime, setRtnTime] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(Boolean(isCheck));
  const { onFetch, isSuccess } = useFetch({
    method: 'PATCH',
    url: `/missions/${id}`,
    value: {
      missionType: missionType,
      missionDescription: missionDescription,
      alertStatus: isChecked ? 'CHECKED' : 'UNCHECKED',
      alertTime: alertTime,
    },
  });

  useEffect(() => {
    onFetch();
  }, [isChecked]);
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
          <TouchableWithoutFeedback onPress={() => setIsChecked(false)}>
            <S.disabledButton>
              <Font
                type={'BODY_REGULAR'}
                color={!isChecked ? 'GREY1' : 'WHITE'}
              >
                알림끄기
              </Font>
              <L.Row ml={12}>
                <SvgIcon
                  name={!isChecked ? 'iconCheckAlarmOff' : 'iconCheckAlarmOn'}
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
            disabled={!isChecked}
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
  }, [isChecked]);

  return (
    <L.Row ph={25} pv={15} items={'center'} justify={'space-between'}>
      <L.Row items={'center'} justify={'space-between'} w={'100%'}>
        <L.Row items={'center'}>
          <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'}>
            {missionDescription}
          </Font>
          <TouchableWithoutFeedback onPress={() => onTimePicker()}>
            {isChecked ? (
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
        <TouchableWithoutFeedback onPress={() => setIsChecked(!isChecked)}>
          <View>
            <SvgIcon
              name={isChecked ? 'lucky_check' : 'lucky_uncheck'}
              size={30}
            />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};
