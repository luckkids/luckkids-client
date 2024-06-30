import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { format } from 'date-fns';
import { Font, L } from '@design-system';
import { useHomeInfo } from '@queries';
import useNavigationService from '@hooks/navigation/useNavigationService';

const HomeWeekCalendar: React.FC = () => {
  const navigation = useNavigationService();
  const today = new Date();
  const weekDates = [];
  const koreanDays = ['일', '월', '화', '수', '목', '금', '토'];
  const { data: homeInfo } = useHomeInfo();
  const { missionOutcomeForWeekResponse } = homeInfo || {};

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
          const isSucceedDate = !!missionOutcomeForWeekResponse?.calendar.find(
            (r) => r.missionDate === item.date,
          )?.hasSucceed;

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
              <L.Row
                style={{
                  position: 'relative',
                }}
                w={45}
                h={45}
              >
                <L.Row
                  bg={isSucceedDate ? 'WHITE' : 'TRANSPARENT'}
                  w={'100%'}
                  h={'100%'}
                  rounded={22.5}
                  items="center"
                  justify="center"
                  style={{
                    opacity: isSucceedDate ? 0.25 : 1,
                  }}
                />
                <L.Absolute
                  w={'100%'}
                  h={'100%'}
                  items="center"
                  justify="center"
                >
                  <Font
                    type="BODY_SEMIBOLD"
                    color={isFuture ? 'WHITE' : 'BLACK'}
                  >
                    {item.day}
                  </Font>
                </L.Absolute>
              </L.Row>
            </L.Col>
          );
        })}
      </L.Row>
    </TouchableWithoutFeedback>
  );
};

export default HomeWeekCalendar;
