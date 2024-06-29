import React, { useEffect, useRef, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { APP_LAUNCH_DATE } from '@constants';
import { useHomeCalendar } from '@queries';
import Month from './home.calendar.month';
import { activatedDatesState } from '@recoil/recoil.calendar';

interface MonthData {
  month: number;
  year: number;
}

const HomeCalendar: React.FC = () => {
  const flashListRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activatedDates, setActivatedDates] =
    useRecoilState(activatedDatesState);

  const today = format(new Date(), 'yyyy-MM-dd');
  const startMonth = new Date(APP_LAUNCH_DATE);
  startMonth.setMonth(startMonth.getMonth() + 1);
  const endMonth = new Date(today);
  endMonth.setMonth(endMonth.getMonth() + 10);

  const months = getMonthsInRange(startMonth, endMonth);

  const { data: homeCalendarInfo } = useHomeCalendar({
    missionDate: format(currentDate, 'yyyy-MM-dd'),
  });

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2);
      const middleVisibleItem = viewableItems[middleIndex]?.item;
      if (middleVisibleItem) {
        const newDate = new Date(
          middleVisibleItem.year,
          middleVisibleItem.month,
          1,
        );
        setCurrentDate(newDate);
      }
    }
  };

  useEffect(() => {
    if (!homeCalendarInfo) return;
    const newDates = homeCalendarInfo.calendar
      .filter((c) => c.hasSucceed)
      .map((c) => c.missionDate);
    setActivatedDates((prevDates) => [...prevDates, ...newDates]);
  }, [homeCalendarInfo, setActivatedDates]);

  return (
    <FlashList
      ref={flashListRef}
      data={months}
      renderItem={({ item }) => <Month month={item.month} year={item.year} />}
      estimatedItemSize={200}
      onViewableItemsChanged={handleViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
    />
  );
};

const getMonthsInRange = (start: Date, end: Date): MonthData[] => {
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  const months: MonthData[] = [];

  while (current <= end) {
    months.push({ month: current.getMonth(), year: current.getFullYear() });
    current.setMonth(current.getMonth() + 1);
  }

  return months;
};

export default HomeCalendar;
