import { Colors } from '@design-system';
import { useEffect } from 'react';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'ko';

const HomeWeekCalendar: React.FC = () => {
  return (
    <CalendarProvider
      date={'2024-01-08'}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      // showTodayButton
      // disabledOpacity={0.6}
      // theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      theme={{
        backgroundColor: 'transparent',
        calendarBackground: 'transparent',
      }}
    >
      <WeekCalendar
        testID={'WEEK-CALENDAR'}
        firstDay={0}
        // markedDates={marked.current}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: Colors.WHITE,
          selectedDayBackgroundColor: Colors.WHITE,
          selectedDayTextColor: 'transparent',
          // todayTextColor: theme.colors.onBackground,
          // todayBackgroundColor: theme.colors.primary,
          // dayTextColor: 'gray',
          // dotColor: theme.colors.primary,
          // selectedDotColor: theme.colors.onBackground,
          // monthTextColor: theme.colors.onBackground,
        }}
        calendarStyle={{}}
        markedDates={{
          '2024-01-09': {
            selected: true,
            marked: true,
            selectedColor: 'blue',
          },
          '2024-01-10': {
            marked: true,
          },
          '2024-01-11': {
            disabled: true,
            disableTouchEvent: true,
          },
        }}
      />
    </CalendarProvider>
  );
};

export default HomeWeekCalendar;
