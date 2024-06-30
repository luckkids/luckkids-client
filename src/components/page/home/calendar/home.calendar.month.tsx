// home.calendar.month.tsx
import React from 'react';
import { Font, L } from '@design-system';
import Week from './home.calendar.week';

interface MonthProps {
  month: number;
  year: number;
}

const Month: React.FC<MonthProps> = ({ month, year }) => {
  const weeks = getWeeksInMonth(year, month);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <>
      <L.Row w={'100%'} justify="center" mv={16}>
        <Font type="BODY_SEMIBOLD" color="WHITE">
          {`${month + 1}월 ${year}`}
        </Font>
      </L.Row>
      <L.Row w={'100%'} justify="space-around" mv={8}>
        {dayNames.map((dayName, index) => (
          <Font key={index} type="FOOTNOTE_SEMIBOLD" color="WHITE">
            {dayName}
          </Font>
        ))}
      </L.Row>
      {weeks.map((week, index) => (
        <Week key={index} week={week} />
      ))}
    </>
  );
};

const getWeeksInMonth = (year: number, month: number): (Date | null)[][] => {
  const weeks: (Date | null)[][] = [];
  const current = new Date(year, month, 1);

  while (current.getMonth() === month) {
    const week: (Date | null)[] = [];
    for (let i = 0; i < 7; i++) {
      if (current.getMonth() === month && current.getDay() === i) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      } else {
        week.push(null);
      }
    }
    weeks.push(week);
  }

  return weeks;
};

export default Month;
