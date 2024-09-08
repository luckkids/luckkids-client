import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Font, L } from '@design-system';
import { formatCreatedAt } from '@utils';
import { readNotification } from '@apis/home';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { NotificationItem } from '@types-common/noti.types';

const HomeAlarmItem: React.FC<NotificationItem> = (notification) => {
  const navigation = useNavigationService();

  const {
    id,
    alertHistoryStatus,
    createdDate,
    alertDescription,
    alertDestinationInfo,
    alertDestinationType,
  } = notification;

  const handlePressAlarmItem = async () => {
    await readNotification(id);

    switch (alertDestinationType) {
      case 'FRIEND':
        return navigation.navigate('GardenFriendProfile', {
          friendId: Number(alertDestinationInfo),
        });
      case 'MISSION':
        return navigation.navigate('Mission');
      case 'WEBVIEW':
        return navigation.navigate('WebView', {
          url: String(alertDestinationInfo),
        });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressAlarmItem}>
      <L.Row
        w="100%"
        ph={25}
        justify="space-between"
        h={72}
        items="center"
        bg={alertHistoryStatus === 'CHECKED' ? 'TRANSPARENT' : 'BG_SECONDARY'}
      >
        <Font type="BODY_REGULAR">{alertDescription}</Font>
        <Font type="BODY_REGULAR" color="GREY1">
          {formatCreatedAt(createdDate)}
        </Font>
      </L.Row>
    </TouchableWithoutFeedback>
  );
};

export default HomeAlarmItem;
