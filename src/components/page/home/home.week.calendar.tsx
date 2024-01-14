import React from 'react';
import { format } from 'date-fns';
import { LocaleConfig } from 'react-native-calendars';
import { Font, L } from '@design-system';
import { TouchableWithoutFeedback } from 'react-native';
import useNavigationService from '@hooks/navigation/useNavigationService';

LocaleConfig.locales.ko = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};

LocaleConfig.defaultLocale = 'ko';

const HomeWeekCalendar: React.FC = () => {
  const navigation = useNavigationService();
  const today = new Date();
  const weekDates = [];
  const koreanDays = ['일', '월', '화', '수', '목', '금', '토'];

  const dayOfWeek = today.getDay();

  for (let i = -dayOfWeek; i <= 6 - dayOfWeek; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    const dayInKorean = koreanDays[currentDate.getDay()];

    weekDates.push({
      text: dayInKorean,
      day: format(currentDate, 'd'),
      date: format(currentDate, 'yyyy-MM-dd'),
    });
  }

  const handlePressCalendar = () => {
    navigation.navigate('HomeCalendar');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressCalendar}>
      <L.Row mt={8} ph={30} w="100%" g={8} justify="center" items="center">
        {weekDates.map((item) => {
          const isToday = item.day === format(today, 'd');
          const isFuture = item.date > format(today, 'yyyy-MM-dd');
          return (
            <L.Col
              g={12.5}
              key={item.day}
              flex-1
              items="center"
              justify="center"
            >
              <L.Row
                w={23}
                h={23}
                bg={isToday ? 'WHITE' : 'TRANSPARENT'}
                rounded={100}
                justify="center"
                items="center"
              >
                <Font
                  type="BODY_SEMIBOLD"
                  color={isToday ? 'HOME_TODAY_TEXT' : 'WHITE'}
                >
                  {item.text}
                </Font>
              </L.Row>
              <Font type="BODY_SEMIBOLD" color={isFuture ? 'WHITE' : 'BLACK'}>
                {item.day}
              </Font>
            </L.Col>
          );
        })}
      </L.Row>
    </TouchableWithoutFeedback>
  );
};

export default HomeWeekCalendar;
