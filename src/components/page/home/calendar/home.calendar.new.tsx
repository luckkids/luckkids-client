import React, { useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import Month from './home.calendar.month';

interface CalendarProps {
  startMonth: Date;
  endMonth: Date;
}

interface MonthData {
  month: number;
  year: number;
}

const Calendar: React.FC<CalendarProps> = ({ startMonth, endMonth }) => {
  const months = getMonthsInRange(startMonth, endMonth);
  const flashListRef = useRef(null);

  return (
    <FlashList
      ref={flashListRef}
      data={months}
      renderItem={({ item }) => <Month month={item.month} year={item.year} />}
      estimatedItemSize={200}
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

export default Calendar;
