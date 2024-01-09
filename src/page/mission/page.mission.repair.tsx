import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Font, L, SvgIcon } from '@design-system';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MisstionRepairItem } from '@components/page/mission/misstion.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { DataDummyMissionRepair } from '../../data/dummy/data.dummy.mission.repair';

export const PageMissionRepair: React.FC = () => {
  const navigation = useNavigationService();
  const list = { ...DataDummyMissionRepair };
  return (
    <>
      <FrameLayout NavBar={<StackNavBar useBackButton />}>
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
        {list.data.map((item, i) => {
          if (item.missionType === 'HOUSEKEEPING') {
            return (
              <MisstionRepairItem
                isCheck={item.alertStatus === 'CHECKED'}
                isSetAlarm={true}
                key={i}
              />
            );
          }
        })}
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconHomeCare'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            집 정돈
          </Font>
        </L.Row>
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconSelfCare'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            셀프 케어
          </Font>
        </L.Row>
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconHealth'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            건강
          </Font>
        </L.Row>
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconWorking'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            일
          </Font>
        </L.Row>
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconMindSet'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            마인드셋
          </Font>
        </L.Row>
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconGrowth'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            자기개발
          </Font>
        </L.Row>
        <MisstionRepairItem isCheck={true} isSetAlarm={true} />
        <L.Row items={'center'} mt={40} mb={30} ph={25}>
          <SvgIcon name={'iconHomeCare'} size={62} />
          <Font type={'TITLE3_SEMIBOLD'} style={{ marginLeft: 16 }}>
            집 정돈
          </Font>
        </L.Row>
        <MisstionRepairItem isCheck={true} />
        <MisstionRepairItem />
        <MisstionRepairItem isSetAlarm={true} />
      </FrameLayout>
      <FloatingButton
        text={'홈(임시버튼)'}
        onPress={() => navigation.navigate('Home')}
      />
    </>
  );
};
