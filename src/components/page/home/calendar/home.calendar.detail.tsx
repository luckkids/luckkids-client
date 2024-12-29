import React from 'react';
import { ScrollView } from 'react-native';
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mission_categories } from '@constants';
import { CONSTANTS, Font, L, SvgIcon } from '@design-system';
import { useHomeCalendarDetail } from '@queries';
import { getDayOfWeek } from '@utils';

type HomeCalendarDetailProps = {
  selectedDate: string;
};

const HomeCalendarDetail = ({ selectedDate }: HomeCalendarDetailProps) => {
  const { bottom } = useSafeAreaInsets();

  const day = getDayOfWeek(selectedDate);
  const date = new Date(selectedDate).getDate();

  const { data: homeCalendarDetailInfo } = useHomeCalendarDetail({
    missionDate: selectedDate,
  });

  if (!homeCalendarDetailInfo) return null;
  return (
    <L.Col
      items="flex-start"
      pt={32}
      ph={25}
      style={{
        maxHeight: SCREEN_HEIGHT - CONSTANTS.BOTTOM_TABBAR_HEIGHT,
      }}
    >
      <L.Row w={'100%'} justify="space-between">
        <Font type="TITLE2_BOLD">
          {date}일 {day}요일
        </Font>
        <Font type="TITLE1_REGULAR" color="LUCK_GREEN">
          +{homeCalendarDetailInfo.length}
        </Font>
      </L.Row>
      <Font
        textAlign="center"
        type="SUBHEADLINE_REGULAR"
        color="GREY1"
        mt={15}
        mb={35}
      >
        {`${homeCalendarDetailInfo.length}개 완료했어요!`}
      </Font>
      <ScrollView
        style={{
          width: '100%',
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          paddingBottom: bottom + 50,
        }}
      >
        <L.Col g={30}>
          {homeCalendarDetailInfo.map((info, index) => {
            const missionIcon = mission_categories.find(
              (m) => m.type === info.missionType,
            )?.icon;
            return (
              <L.Row key={index} w={'100%'} g={15}>
                {missionIcon && <SvgIcon name={missionIcon} size={24} />}
                <Font type="BODY_REGULAR">{info.missionDescription}</Font>
              </L.Row>
            );
          })}
        </L.Col>
      </ScrollView>
    </L.Col>
  );
};

export default HomeCalendarDetail;
