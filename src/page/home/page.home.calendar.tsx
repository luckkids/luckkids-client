import React from 'react';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import HomeCalendar from '@components/page/home/calendar/home.calendar';
import { FrameLayout } from '@frame/frame.layout';
import { L } from '@design-system';
import { DEFAULT_MARGIN } from '@constants';

const bgImage = require('assets/images/home-calendar-bg.png');

export const PageHomeCalendar: React.FC = () => {
  return (
    <FrameLayout
      statusBarColor="HOME_CALENDAR_BG"
      backgroundImage={bgImage}
      NavBar={<StackNavbar title="캘린더" />}
    >
      <HomeCalendar />
    </FrameLayout>
  );
};
