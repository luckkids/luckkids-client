import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { SvgIcon, L, Font, ButtonText } from '@design-system';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import HomeAlarmItem from '@components/page/home/home.alarm.item';
import { FrameLayout } from '@frame/frame.layout';
import { Noti } from '@types-common/noti.types';

export const PageHomeAlarm: React.FC = () => {
  const notiList: Noti[] = [
    {
      id: 1,
      title: 'title',
      createdAt: '20시간 전',
    },
    {
      id: 2,
      title: 'title',
      createdAt: '20시간 전',
    },
  ];

  const handlePressAllowAlarm = () => {};

  return (
    <FrameLayout NavBar={<StackNavbar title="알림" />}>
      {/* 알림 허용 정보 */}
      <L.Row w="100%" ph={25} pv={30} justify="flex-start">
        <SvgIcon name="bell" size={20} />
        <L.Col ml={16} g={20}>
          <Font type="BODY_REGULAR" color="GREY0">
            알림을 놓치지 마세요
          </Font>
          {/* TODO ChipButton으로 바꾸기 */}
          <ButtonText
            textColor="LUCK_GREEN"
            onPress={handlePressAllowAlarm}
            text="알림 사용"
          />
        </L.Col>
      </L.Row>
      {/* 알림 리스트 */}
      <ScrollView>
        {notiList.map((noti) => (
          <HomeAlarmItem
            key={noti.id}
            title={noti.title}
            createdAt={noti.createdAt}
          />
        ))}
      </ScrollView>
    </FrameLayout>
  );
};
