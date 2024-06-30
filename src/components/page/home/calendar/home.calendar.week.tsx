import React from 'react';
import { L } from '@design-system';
import Day from './home.calendar.day';

interface WeekProps {
  week: (Date | null)[];
}

const Week: React.FC<WeekProps> = ({ week }) => {
  return (
    <L.Row justify="space-around" w="100%">
      {week.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </L.Row>
  );
};

export default Week;
