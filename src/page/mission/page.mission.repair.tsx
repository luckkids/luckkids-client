import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Font, L, SvgIcon } from '@design-system';
import FloatingButton from '@components/common/FloatingButton/FloatingButton';
import StackNavBar from '@components/common/StackNavBar/StackNavBar';
import { MisstionRepairItem } from '@components/page/mission/misstion.repair.item';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';

export const PageMissionRepair: React.FC = () => {
  const navigation = useNavigationService();
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
        <MisstionRepairItem isCheck={true} isSetAlarm={true} />
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
