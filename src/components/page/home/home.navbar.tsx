import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L, SvgIcon } from '@design-system';
import useNavigationService from '@hooks/navigation/useNavigationService';

const HomeNavbar: React.FC = () => {
  const isNewAlarmExist = true;
  const navigation = useNavigationService();

  const handlePressAlarm = () => {
    navigation.navigate('HomeAlarm');
  };

  const handlePressLuckKids = () => {};

  return (
    <L.Row
      w="100%"
      justify="space-between"
      ph={DEFAULT_MARGIN}
      pv={10}
      items="center"
    >
      <Image
        source={require('@design-system/assets/images/nav-logo.png')}
        style={{
          resizeMode: 'contain',
          width: 113,
          height: 20,
        }}
      />
      <L.Row g={16}>
        {/* 레벨 */}
        <TouchableWithoutFeedback onPress={handlePressLuckKids}>
          <L.Row items="center" g={8}>
            <SvgIcon name="iconHomeLuckkids" size={20} />
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
