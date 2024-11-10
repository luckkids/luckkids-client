import React, { useCallback, useMemo, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { format, isAfter, startOfDay } from 'date-fns';
import { useRecoilValue } from 'recoil';
import { Colors, Font, L } from '@design-system';
import HomeCalendarDetail from './home.calendar.detail';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import { activatedDatesState } from '@recoil/recoil.calendar';

interface DayProps {
  day: Date | null;
}

const Day: React.FC<DayProps> = ({ day }) => {
  const activatedDates = useRecoilValue(activatedDatesState);
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);

  const handleDayPress = useCallback((day: Date) => {
    BottomSheet.show({
      component: (
        <HomeCalendarDetail selectedDate={format(day, 'yyyy-MM-dd')} />
      ),
    });
  }, []);

  if (!day) {
    return (
      <L.Row
        w={DAY_ITEM_SIZE}
        h={DAY_ITEM_SIZE}
        items="center"
        justify="center"
      />
    );
  }

  const dateString = format(day, 'yyyy-MM-dd');
  const isActivated = activatedDates.includes(dateString);
  const isAfterToday = isAfter(startOfDay(day), today);

  const getFontColor = () => {
    if (isActivated) {
      return 'WHITE';
    } else if (isAfterToday) {
      return 'WHITE';
    } else {
      return 'GREY1';
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => day && handleDayPress(day)}>
      <L.Row
        w={DAY_ITEM_SIZE}
        h={DAY_ITEM_SIZE}
        items="center"
        justify="center"
        rounded={DAY_ITEM_SIZE / 2}
        style={{
          backgroundColor: isActivated
            ? `${Colors.LUCK_GREEN}40`
            : Colors.TRANSPARENT,
        }}
      >
        <Font type={'BODY_SEMIBOLD'} color={getFontColor()}>
          {day?.getDate()}
        </Font>
      </L.Row>
    </TouchableWithoutFeedback>
  );
};

const DAY_ITEM_SIZE = 45;

export default Day;
