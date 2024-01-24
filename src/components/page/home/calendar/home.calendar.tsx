import React, { useCallback, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { CalendarList, DateData } from 'react-native-calendars';
import { Colors, Font, L } from '@design-system';

const RANGE = 24;
const initialDate = format(new Date(), 'yyyy-MM-dd');
const nextWeekDate = '2022-07-14';
const nextMonthDate = '2022-08-05';

const HomeCalendar = () => {
  const [selected, setSelected] = useState(initialDate);
  const marked = useMemo(() => {
    return {
      // [nextWeekDate]: {
      //   selected: selected === nextWeekDate,
      //   selectedTextColor: '#5E60CE',
      //   marked: true,
      // },
      // [nextMonthDate]: {
      //   selected: selected === nextMonthDate,
      //   selectedTextColor: '#5E60CE',
      //   marked: true,
      // },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#5E60CE',
        selectedTextColor: 'white',
      },
    };
  }, [selected]);

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  return (
    <CalendarList
      theme={theme}
      current={initialDate}
      pastScrollRange={RANGE}
      futureScrollRange={RANGE}
      onDayPress={onDayPress}
      markedDates={marked}
      renderHeader={renderCustomHeader}
      horizontal={false}
      pagingEnabled={false}
      staticHeader={false}
      calendarStyle={{
        backgroundColor: Colors.BLACK,
      }}
      contentContainerStyle={{
        backgroundColor: Colors.BLACK,
      }}
      style={{
        backgroundColor: Colors.BLACK,
      }}
    />
  );
};

const theme = {
  calendarBackground: Colors.BLACK,
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: '#48BFE3',
        },
      },
    },
  },
  'stylesheet.day.basic': {
    today: {
      borderColor: '#48BFE3',
      borderWidth: 0.8,
    },
    todayText: {
      color: '#5390D9',
      fontWeight: '800',
    },
  },
};

function renderCustomHeader(date: any) {
  const header = date.toString('MMMM yyyy');
  const [month, year] = header.split(' ');

  return (
    <L.Row w={'100%'} justify="center" mv={16}>
      <Font type="BODY_SEMIBOLD" color="WHITE">
        {`${month} ${year}`}
      </Font>
    </L.Row>
  );
}

export default HomeCalendar;
