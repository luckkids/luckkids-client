import React from 'react';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import HomeCalendar from '@components/page/home/calendar/home.calendar';
import { FrameLayout } from '@frame/frame.layout';

export const PageHomeCalendar: React.FC = () => {
  return (
    <FrameLayout NavBar={<StackNavbar title="캘린더" />}>
      <HomeCalendar />
    </FrameLayout>
  );
};
