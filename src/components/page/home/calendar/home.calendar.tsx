import React, { useCallback, useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { CalendarList, DateData } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_LAUNCH_DATE } from '@constants';
import { Colors, Font, FontSettings, L } from '@design-system';
import { useHomeCalendar } from '@queries';
import HomeCalendarDetail from './home.calendar.detail';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';

const HomeCalendar = () => {
  const [activatedDates, setActivatedDates] = useState<string[]>([]);
  const today = format(new Date(), 'yyyy-MM-dd');
  const { bottom } = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState<string>(today);

  const PAST_RANGE = Math.abs(
    new Date(APP_LAUNCH_DATE).getMonth() - new Date(today).getMonth(),
  );

  const { data: homeCalendarInfo } = useHomeCalendar({
    missionDate: currentDate,
  });

  const onDayPress = useCallback((day: DateData) => {
    BottomSheet.show({
      component: <HomeCalendarDetail selectedDate={day.dateString} />,
    });
  }, []);

  const renderDayComponent = useCallback(
    (date?: DateData) => {
      if (!date) return <></>;
      const isActivated = activatedDates.includes(date?.dateString || '');

      return (
        <TouchableWithoutFeedback onPress={() => date && onDayPress(date)}>
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
        </TouchableWithoutFeedback>
      );
    },
    [activatedDates],
  );

  const handleCurrentDateChange = useCallback((months: DateData[]) => {
    // 마지막 달의 마지막 날짜를 기준으로 currentDate를 설정
    const lastMonth = months[months.length - 1];
    const lastDate = new Date(
      lastMonth.year,
      lastMonth.month - 1,
      lastMonth.day,
    );
    setCurrentDate(format(lastDate, 'yyyy-MM-dd'));
  }, []);

  useEffect(() => {
    if (!homeCalendarInfo) return;
    setActivatedDates((prevDates) => {
      const newDates = homeCalendarInfo.calendar
        .filter((c) => c.hasSucceed)
        .map((c) => c.missionDate);
      return [...prevDates, ...newDates];
    });
  }, [homeCalendarInfo]);

  return (
    <CalendarList
      theme={theme}
      current={currentDate}
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
      }}
      style={{
        backgroundColor: Colors.TRANSPARENT,
      }}
      bounces={false}
      dayComponent={({ date }) => renderDayComponent(date)}
      onVisibleMonthsChange={handleCurrentDateChange}
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
        paddingBottom: 100,
      },
      paddingBottom: 200,
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
