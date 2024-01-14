import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Colors, Font } from '@design-system';
import HomeNavbar from '@components/page/home/home.navbar';
import HomeWeekCalendar from '@components/page/home/home.week.calendar';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
const bgImage = require('assets/images/home-bg.png');

export const Home: React.FC = () => {
  const navigation = useNavigationService();

  const handlePressCalendar = () => {
    navigation.navigate('HomeCalendar');
  };

  const handleEditComment = () => {
    navigation.navigate('HomeComment');
  };

  return (
    <>
      <FrameLayout
        statusBarColor={'KAKAO_YELLOW'}
        NavBar={<HomeNavbar />}
        backgroundImage={bgImage}
      >
        {/* 캘린더 */}

        {/* 캘린터 테스트 */}
        <HomeWeekCalendar />
        {/* <TouchableWithoutFeedback onPress={handlePressCalendar}>
          <Font type="BODY_SEMIBOLD">캘린더 이동</Font>
        </TouchableWithoutFeedback> */}
        {/* 캐릭터 메인 */}
        {/* <TouchableWithoutFeedback onPress={handleEditComment}>
          <Font type="BODY_SEMIBOLD">행운 문구 수정</Font>
        </TouchableWithoutFeedback> */}
        {/* 정보 */}
      </FrameLayout>
    </>
  );
};
