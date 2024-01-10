import React from 'react';
import { ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Font, L, SvgIcon } from '@design-system';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MisstionRepairItem } from '@components/page/mission/misstion.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { DataDummyMissionRepair } from '../../data/dummy/data.dummy.mission.repair';
import { IMissionRepair } from '@types-common/page.types';

export const PageMissionRepair = () => {
  const navigation = useNavigationService();
  const list = { ...DataDummyMissionRepair } as IMissionRepair;
  return (
    <>
      <FrameLayout NavBar={<StackNavBar useBackButton />}>
        <ScrollView>
          <L.Row p={24}>
            <Font type={'TITLE2_BOLD'}>
              행운의 습과을 선택하고 알림을 설정해 보세요!
            </Font>
          </L.Row>
          <L.Row ph={25} pv={15}>
            <TouchableWithoutFeedback onPress={() => console.log('추가')}>
              <L.Row>
                <L.Row pr={25}>
                  <SvgIcon name={'lucky_uncheck'} size={22} />
                </L.Row>
                <Font type={'HEADLINE_SEMIBOLD'} color={'GREY1'}>
                  추가하기
                </Font>
              </L.Row>
            </TouchableWithoutFeedback>
          </L.Row>
          {list.data.HOUSEKEEPING && list.data.HOUSEKEEPING.length !== 0 && (
            <>
              <L.Row items={'center'} mt={40} mb={30} ph={25}>
                <SvgIcon name={'iconHomeCare'} size={62} />
                <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                  집 정돈
                </Font>
              </L.Row>
              {list.data.HOUSEKEEPING.map((item, i) => {
                return (
                  <MisstionRepairItem
                    isCheck={item.alertStatus === 'CHECKED'}
                    isSetAlarm={true}
                    key={i}
                  />
                );
              })}
            </>
          )}
          {list.data.SELF_CARE && list.data.SELF_CARE.length !== 0 && (
            <>
              <L.Row items={'center'} mt={40} mb={30} ph={25}>
                <SvgIcon name={'iconSelfCare'} size={62} />
                <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                  셀프 케어
                </Font>
              </L.Row>
              {list.data.SELF_CARE.map((item, i) => {
                return (
                  <MisstionRepairItem
                    isCheck={item.alertStatus === 'CHECKED'}
                    isSetAlarm={true}
                    key={i}
                  />
                );
              })}
            </>
          )}
          {list.data.HEALTH && list.data.HEALTH.length !== 0 && (
            <>
              <L.Row items={'center'} mt={40} mb={30} ph={25}>
                <SvgIcon name={'iconHealth'} size={62} />
                <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                  건강
                </Font>
              </L.Row>
              {list.data.HEALTH.map((item, i) => {
                return (
                  <MisstionRepairItem
                    isCheck={item.alertStatus === 'CHECKED'}
                    isSetAlarm={true}
                    key={i}
                  />
                );
              })}
            </>
          )}
          {list.data.WORK && list.data.WORK.length !== 0 && (
            <>
              <L.Row items={'center'} mt={40} mb={30} ph={25}>
                <SvgIcon name={'iconWorking'} size={62} />
                <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                  일
                </Font>
              </L.Row>
              {list.data.WORK.map((item, i) => {
                return (
                  <MisstionRepairItem
                    isCheck={item.alertStatus === 'CHECKED'}
                    isSetAlarm={true}
                    key={i}
                  />
                );
              })}
            </>
          )}
          {list.data.MINDSET && list.data.MINDSET.length !== 0 && (
            <>
              <L.Row items={'center'} mt={40} mb={30} ph={25}>
                <SvgIcon name={'iconMindSet'} size={62} />
                <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                  마인드셋
                </Font>
              </L.Row>
              {list.data.MINDSET.map((item, i) => {
                return (
                  <MisstionRepairItem
                    isCheck={item.alertStatus === 'CHECKED'}
                    isSetAlarm={true}
                    key={i}
                  />
                );
              })}
            </>
          )}
          {list.data.SELF_DEVELOPMENT &&
            list.data.SELF_DEVELOPMENT.length !== 0 && (
              <>
                <L.Row items={'center'} mt={40} mb={30} ph={25}>
                  <SvgIcon name={'iconGrowth'} size={62} />
                  <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
                    자기개발
                  </Font>
                </L.Row>
                {list.data.SELF_DEVELOPMENT.map((item, i) => {
                  return (
                    <MisstionRepairItem
                      isCheck={item.alertStatus === 'CHECKED'}
                      isSetAlarm={true}
                      key={i}
                    />
                  );
                })}
              </>
            )}
        </ScrollView>
      </FrameLayout>
      <FloatingButton
        text={'홈(임시버튼)'}
        onPress={() => navigation.navigate('Home')}
      />
    </>
  );
};
