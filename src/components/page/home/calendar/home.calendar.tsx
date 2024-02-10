import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { CalendarList, DateData } from 'react-native-calendars';
import { Colors, Font, FontSettings, L } from '@design-system';

const initialDate = '2024-02-10'; // 앱 출시 날짜

const HomeCalendar = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [activatedDates, setActivatedDates] = useState<string[]>([
    '2024-02-01',
    '2024-02-06',
  ]);
  const today = format(new Date(), 'yyyy-MM-dd');

  const PAST_RANGE = Math.abs(
    new Date(initialDate).getMonth() - new Date(today).getMonth(),
  );

  const onDayPress = useCallback((day: DateData) => {
    setSelected(day.dateString);
  }, []);

  const renderDayComponent = useCallback(
    (date?: DateData) => {
      if (!date) return <></>;
      const isSelected = selected === date?.dateString;
      const isActivated = activatedDates.includes(date?.dateString || '');

      return (
        <TouchableWithoutFeedback onPress={() => date && onDayPress(date)}>
          {isSelected ? (
            <L.Row
              w={DAY_ITEM_SIZE}
              h={DAY_ITEM_SIZE}
              items="center"
              justify="center"
              bg={isSelected ? 'LUCK_GREEN' : 'TRANSPARENT'}
              rounded={DAY_ITEM_SIZE / 2}
            >
              <Font type={'BODY_SEMIBOLD'} color={'BLACK'}>
                {date?.day}
              </Font>
            </L.Row>
          ) : (
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
              <Font
                type={'BODY_SEMIBOLD'}
                color={isActivated ? 'LUCK_GREEN' : 'GREY1'}
              >
                {date?.day}
              </Font>
            </L.Row>
          )}
        </TouchableWithoutFeedback>
      );
    },
    [selected, activatedDates],
  );

  return (
    <CalendarList
      theme={theme}
      current={initialDate}
      pastScrollRange={PAST_RANGE}
      futureScrollRange={0}
      onDayPress={onDayPress}
      renderHeader={renderCustomHeader}
      horizontal={false}
      pagingEnabled={false}
      staticHeader={false}
      initialNumToRender={2}
      keyExtractor={(item) => item.toString()}
      calendarStyle={{
        // 캘린더 하나당 스타일
        backgroundColor: Colors.TRANSPARENT,
      }}
      contentContainerStyle={{
        backgroundColor: Colors.TRANSPARENT,
        paddingBottom: 20,
      }}
      style={{
        backgroundColor: Colors.TRANSPARENT,
        height: '100%',
      }}
      bounces={false}
      dayComponent={({ date }) => renderDayComponent(date)}
    />
  );
};

const DAY_ITEM_SIZE = 45;

const theme = {
  calendarBackground: Colors.TRANSPARENT,
  textDayStyle: {
    ...FontSettings['BODY_SEMIBOLD'],
  },
  stylesheet: {
    calendar: {
      header: {
        dayHeader: {
          fontWeight: '600',
          color: Colors.RED,
        },
      },
      main: {
        backgroundColor: Colors.TRANSPARENT,
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
