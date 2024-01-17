import React from 'react';
import { Button } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import HomeCalendar from '@components/page/home/calendar/home.calendar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageHomeCalendar: React.FC = () => {
  const navigation = useNavigationService();
  return (
    <FrameLayout NavBar={<StackNavbar title="캘린더" />}>
      <HomeCalendar />
    </FrameLayout>
  );
};
