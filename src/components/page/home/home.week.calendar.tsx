import { Colors, FontSettings } from '@design-system';
import React, { useEffect } from 'react';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { format, addDays } from 'date-fns';
import { MarkedDates } from 'react-native-calendars/src/types';

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
  const today = new Date();
  const markedDates: MarkedDates = {};

  // 오늘의 요일을 가져옵니다 (0: 일요일, 1: 월요일, ..., 6: 토요일).
  const dayOfWeek = today.getDay();

  for (let i = -dayOfWeek; i <= 6 - dayOfWeek; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = format(date, 'yyyy-MM-dd');

    const isSelected = i <= 0;

    markedDates[formattedDate] = {
      type: 'custom',
      selected: isSelected,
      marked: false,
      customStyles: isSelected
        ? {
            container: {
              opacity: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 9,
            },
            text: {
              ...FontSettings['BODY_SEMIBOLD'],
              color: Colors.BLACK,
            },
          }
        : {
            container: {
              marginTop: 8,
            },
            text: {
              ...FontSettings['BODY_SEMIBOLD'],
              color: Colors.WHITE,
            },
          },
    };
  }

  return (
    <CalendarProvider
      date={format(new Date(), 'yyyy-MM-dd')}
      theme={{
        backgroundColor: Colors.TRANSPARENT,
        calendarBackground: Colors.TRANSPARENT,
      }}
    >
      <WeekCalendar
        testID={'WEEK-CALENDAR'}
        firstDay={0}
        disabledDaysIndexes={[0]}
        theme={{
          backgroundColor: Colors.TRANSPARENT,
          textSectionTitleColor: Colors.WHITE,
          selectedDayBackgroundColor: 'rgba(255, 255, 255, 0.5)',
          selectedDayTextColor: Colors.BLACK,
          calendarBackground: Colors.TRANSPARENT,
          textSectionTitleDisabledColor: Colors.WHITE,
        }}
        calendarStyle={{
          backgroundColor: Colors.TRANSPARENT,
        }}
        style={{
          backgroundColor: Colors.TRANSPARENT,
          ...FontSettings['BODY_SEMIBOLD'],
        }}
        markingType={'custom'}
        markedDates={{
          // 미션 완료한 날짜
          // 오늘 날짜
          // 아직 오지 않은 날짜
          ...markedDates,
        }}
      />
    </CalendarProvider>
  );
};

export default HomeWeekCalendar;
