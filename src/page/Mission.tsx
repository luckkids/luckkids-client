import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Colors, CONSTANTS, Font, L, SvgIcon } from '@design-system';
import {
  useLuckMessageHistory,
  useMissionOutcomeCount,
  useMissionOutcomeList,
} from '@queries';
import ButtonText from '../design-system/components/Button/ButtonText';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import Tooltip from '@components/common/Tooltip/Tooltip';
import { MissionItem } from '@components/page/mission/mission.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { IMissionListData } from '@types-common/page.types';

export const Mission: React.FC = () => {
  const navigation = useNavigationService();
  const [hide, setHide] = useState(false);

  const { data: missionOutcomeData, isLoading } = useMissionOutcomeList();
  const { data: missionOutcomeCount } = useMissionOutcomeCount();
  const { data: luckMessageHistory } = useLuckMessageHistory();
  const accumulatedCount = missionOutcomeCount?.count ?? 0;
  const total = missionOutcomeData?.length || 0;
  const count = missionOutcomeData?.filter(
    (item: IMissionListData) => item.missionStatus === 'SUCCEED',
  ).length;

  const missionOutcomeList = hide
    ? missionOutcomeData?.filter(
        (item: IMissionListData) => item.missionStatus === 'FAILED',
      ) || []
    : missionOutcomeData || [];

  console.log(luckMessageHistory);

  return (
    <>
      <FrameLayout>
        <L.Row ph={24} justify={'flex-end'}>
          <Font type={'FOOTNOTE_REGULAR'}>
            누적된 수행 습관 {accumulatedCount}
          </Font>
        </L.Row>
        {/* 행운의 한마디 */}
        <L.Row
          mh={25}
          mt={12}
          style={{
            backgroundColor: 'rgba(128, 244, 102, 0.15)',
          }}
          rounded={15}
          p={15}
        >
          <L.Row w={'100%'} items={'center'} g={10}>
            <SvgIcon name={'luck_message'} width={26} height={20} />
            <Font type={'SUBHEADLINE_REGULAR'}>행운의 한마디</Font>
          </L.Row>
        </L.Row>
        <L.Row ph={24} mt={40} justify={'space-between'}>
          <Font type={'LARGE_TITLE_BOLD'}>오늘의 습관</Font>
          <Font type={'LARGE_TITLE_REGULAR'} color={'LUCK_GREEN'}>
            {count}/{total}
          </Font>
        </L.Row>
        <L.Row ph={24} pt={50} pb={10} justify={'space-between'}>
          <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
            지금까지 {count}개 완료했어요!
          </Font>
          <ButtonText
            text={hide ? '보기' : '숨기기'}
            onPress={() => {
              setHide(!hide);
            }}
            fontType={'SUBHEADLINE_REGULAR'}
            textColor={'LUCK_GREEN'}
          />
        </L.Row>
        <ScrollView
          contentInset={{
            bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT + 35 + 50,
          }}
        >
          {missionOutcomeList?.length === 0 && (
            <L.Col w={'100%'} items={'center'} mt={190}>
              <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>
                아직 선택한 습관이 없어요.
              </Font>
            </L.Col>
          )}
          {missionOutcomeList.map((item, i) => {
            return <MissionItem {...item} key={item.id} />;
          })}
        </ScrollView>
      </FrameLayout>
      <L.Absolute
        b={CONSTANTS.BOTTOM_TABBAR_HEIGHT + 35}
        w="100%"
        justify={'center'}
      >
        <L.Col g={50}>
          {!isLoading && missionOutcomeList?.length === 0 && (
            <L.Row w="100%" justify="center">
              <Tooltip
                text={'습관을 추가해보세요!'}
                bgColor={'LUCK_GREEN'}
                opacity={1}
                textColor="BLACK"
              />
            </L.Row>
          )}
          <FloatingButton
            onPress={() => navigation.push('MissionRepair')}
            containerStyle={{
              width: 36,
              height: 36,
              paddingVertical: 0,
              paddingHorizontal: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.WHITE,
            }}
            paddingBottom={0}
          >
            <SvgIcon name={'iconPlusDark'} size={'16.6'} />
          </FloatingButton>
        </L.Col>
      </L.Absolute>
    </>
  );
};
