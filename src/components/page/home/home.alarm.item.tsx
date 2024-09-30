import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Font, L } from '@design-system';
import { useInfiniteHomeNotification } from '@queries';
import { formatCreatedAt } from '@utils';
import { readNotification } from '@apis/home';
import AlertPopup from '@global-components/common/AlertPopup/AlertPopup';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { RecoilDevice } from '@recoil/recoil.device';
import { NotificationItem } from '@types-common/noti.types';

const HomeAlarmItem: React.FC<NotificationItem> = (notification) => {
  const navigation = useNavigationService();
  const { deviceId } = useRecoilValue(RecoilDevice);

  const { refetch } = useInfiniteHomeNotification(deviceId);

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

    await refetch();

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
      case 'FRIEND_CODE': {
        // 친구 팝업 띄우기
        return AlertPopup.show({
          title: alertDescription,
          body: '친구 초대에 응하면 가든 목록에 추가됩니다.',
          yesText: '친구하기',
          noText: '거절하기',
          onPressYes: () => {},
        });
      }
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
