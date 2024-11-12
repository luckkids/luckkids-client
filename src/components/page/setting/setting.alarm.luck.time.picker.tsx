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
  onConfirmTime: (time: string) => void;
  initialTime: string;
}

const MERIDIEM_OPTIONS = ['오전', '오후'];
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1); // 1 ~ 12

export default function SettingAlarmLuckTimePicker({
  onConfirmTime,
  initialTime,
}: IProps) {
  // Convert HH:mm:ss format to hour and meridiem
  const convertInitialTime = (timeString: string) => {
    const hour = parseInt(timeString.split(':')[0]);
    if (hour === 0) {
      return { meridiem: '오전', hour: 12 };
    } else if (hour === 12) {
      return { meridiem: '오후', hour: 12 };
    } else if (hour > 12) {
      return { meridiem: '오후', hour: hour - 12 };
    } else {
      return { meridiem: '오전', hour: hour };
    }
  };

  const initialValues = convertInitialTime(initialTime);
  const [meridiem, setMeridiem] = useState<string>(initialValues.meridiem);
  const [hour, setHour] = useState(initialValues.hour);

  const handleConfirmTime = () => {
    let finalHour;
    if (meridiem === '오후' && hour !== 12) {
      finalHour = hour + 12;
    } else if (meridiem === '오전' && hour === 12) {
      finalHour = 0;
    } else {
      finalHour = hour;
    }

    // Pad with leading zeros to ensure HH format
    const timeString = `${finalHour.toString().padStart(2, '0')}:00:00`;
    onConfirmTime(timeString);
    BottomSheet.hide();
  };

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        알림 허용 시간
      </Font>
      <L.Row w="100%" justify="center" g={30}>
        {/* meridiem */}
        <WheelPicker
          selectedIndex={MERIDIEM_OPTIONS.indexOf(meridiem)}
          options={MERIDIEM_OPTIONS}
          onChange={(index) => {
            setMeridiem(MERIDIEM_OPTIONS[index]);
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
          selectedIndex={hour - 1}
          options={HOUR_OPTIONS.map(String)}
          onChange={(index) => {
            setHour(index + 1);
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
          onChange={() => {}}
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
          onPress={handleConfirmTime}
        />
      </S.buttonWrap>
    </S.popupWrap>
  );
}
