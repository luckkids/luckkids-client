import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Font, L } from '@design-system';
import { useInfiniteHomeNotification } from '@queries';
import { formatCreatedAt } from '@utils';
import { readNotification } from '@apis/home';
import { userApis } from '@apis/user';
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
      case 'FRIEND': {
        const friendInfo = await userApis.getUserInfo(
          Number(alertDestinationInfo),
        );

        // 조회한 유저가 없는 경우
        if (!friendInfo) {
          return AlertPopup.show({
            title: '탈퇴한 친구예요! 🥹',
          });
        } else {
          return navigation.navigate('GardenFriendProfile', {
            friendInfo,
          });
        }
      }

      case 'MISSION':
        return navigation.navigate('Mission');
      case 'WEBVIEW':
        return navigation.navigate('WebView', {
          url: String(alertDestinationInfo),
        });
      case 'FRIEND_CODE':
        // 이 경우 아무런 동작 안하도록 함
        return;
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
