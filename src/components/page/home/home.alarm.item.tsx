import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Colors, Font, L, SvgIcon } from '@design-system';
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

  const hasNavigation =
    alertDestinationType === 'FRIEND' ||
    alertDestinationType === 'MISSION' ||
    alertDestinationType === 'WEBVIEW';

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
            title: '아쉽게도,\n이 친구는 럭키즈를 떠났어요. 🥹',
            body: '다시 만날 날을 기다리며, 행운 가득한 하루 되세요!',
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
      case 'WELCOME':
        // 이 경우 아무런 동작 안하도록 함
        return;
      default:
        return;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressAlarmItem}>
      <L.Row
        w="100%"
        ph={25}
        justify="space-between"
        pt={!hasNavigation ? 25 : 15}
        pb={!hasNavigation ? 25 : 10}
        items="center"
        bg={alertHistoryStatus === 'CHECKED' ? 'TRANSPARENT' : 'BG_SECONDARY'}
        g={10}
      >
        <L.Col justify="center" flex-1>
          <Font type="BODY_REGULAR">{alertDescription}</Font>
          {hasNavigation && (
            <L.Row g={7} mt={10} items="center">
              <Font type="BODY_REGULAR" color="LUCK_GREEN">
                {'자세히 보기'}
              </Font>
              <SvgIcon name="arrow_right_green" size={12} />
            </L.Row>
          )}
        </L.Col>
        <Font type="BODY_REGULAR" color="GREY1">
          {formatCreatedAt(createdDate)}
        </Font>
      </L.Row>
    </TouchableWithoutFeedback>
  );
};

export default HomeAlarmItem;
