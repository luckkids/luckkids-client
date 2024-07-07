import React from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { DEFAULT_MARGIN } from '@constants';
import { Font, L, SvgIcon } from '@design-system';
import { useHomeInfo } from '@queries';
import { getCompletedCharacterCount } from '@utils';
import useNavigationService from '@hooks/navigation/useNavigationService';

const HomeNavbar: React.FC = () => {
  const navigation = useNavigationService();

  const handlePressAlarm = () => {
    navigation.navigate('HomeAlarm');
  };

  const { data: homeInfo } = useHomeInfo();
  const { userCharacterSummaryResponse, hasUncheckedAlerts } = homeInfo || {};
  const { completedCharacterCount } = userCharacterSummaryResponse || {};

  const handlePressLuckKids = () => {
    //TODO 이쪽 기획 확정되면 진행
  };

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
            {completedCharacterCount && (
              <Font type={'BODY_REGULAR'}>
                {getCompletedCharacterCount(completedCharacterCount)}
              </Font>
            )}
          </L.Row>
        </TouchableWithoutFeedback>
        {/* 푸시 아이콘 */}
        <TouchableWithoutFeedback onPress={handlePressAlarm}>
          <L.Row items="center">
            <SvgIcon
              name={hasUncheckedAlerts ? 'bell_badge' : 'bell_white'}
              size={20}
              color="WHITE"
            />
          </L.Row>
        </TouchableWithoutFeedback>
      </L.Row>
    </L.Row>
  );
};

export default HomeNavbar;
