import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L, SvgIcon } from '@design-system';
import useNavigationService from '@hooks/navigation/useNavigationService';

const HomeNavbar: React.FC = () => {
  const isNewAlarmExist = true;
  const navigation = useNavigationService();

  const handlePressAlarm = () => {
    navigation.navigate('HomeAlarm');
  };

  const handlePressLevel = () => {};

  return (
    <L.Row
      w="100%"
      justify="space-between"
      ph={DEFAULT_MARGIN}
      pv={10}
      items="center"
    >
      <Font type="LARGE_TITLE_BOLD" color="WHITE">
        Luck Kids
      </Font>
      <L.Row g={16}>
        {/* 레벨 */}
        <TouchableWithoutFeedback onPress={handlePressLevel}>
          <L.Row items="center" g={8}>
            <L.Row rounded={10} bg="LUCK_GREEN" w={20} h={20} />
            <Font type={'BODY_REGULAR'}>21</Font>
          </L.Row>
        </TouchableWithoutFeedback>
        {/* 푸시 아이콘 */}
        <TouchableWithoutFeedback onPress={handlePressAlarm}>
          <L.Row>
            <SvgIcon name={isNewAlarmExist ? 'bell_badge' : 'bell'} size={20} />
          </L.Row>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};

export default HomeNavbar;
