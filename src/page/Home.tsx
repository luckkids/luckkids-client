import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Font } from '@design-system';
import HomeNavbar from '@components/page/home/home.navbar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const Home: React.FC = () => {
  const navigation = useNavigationService();

  const handlePressCalendar = () => {
    navigation.navigate('HomeCalendar');
  };

  return (
    <>
      <FrameLayout NavBar={<HomeNavbar />}>
        {/* 캘린더 */}
        <TouchableWithoutFeedback onPress={handlePressCalendar}>
          <Font type="BODY_SEMIBOLD">캘린더 이동</Font>
        </TouchableWithoutFeedback>
        {/* 캐릭터 메인 */}
        {/* 정보 */}
      </FrameLayout>
    </>
  );
};
