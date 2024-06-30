import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { SvgIcon, L, Font, ButtonText } from '@design-system';
import { useInfiniteHomeNotification } from '@queries';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import HomeAlarmItem from '@components/page/home/home.alarm.item';
import { FrameLayout } from '@frame/frame.layout';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useAsyncEffect from '@hooks/useAsyncEffect';

export const PageHomeAlarm: React.FC = () => {
  const [deviceId, setDeviceId] = React.useState<string>('');
  const { requestPermissionIfNot, hasPermission } = useFirebaseMessage();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteHomeNotification(deviceId);

  //TODO 이쪽 기획 확정되면 진행
  const handlePressAllowAlarm = () => {
    // requestPermissionIfNot().then(() => {
    // })
  };

  useAsyncEffect(async () => {
    setDeviceId(await DeviceInfo.getUniqueId());
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <HomeAlarmItem
      key={item.id}
      title={item.alertDescription}
      createdAt={item.createdDate}
    />
  );

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <FrameLayout NavBar={<StackNavbar title="알림" />}>
      {/* 알림 허용 정보 */}
      <L.Row w="100%" ph={25} pv={30} justify="flex-start">
        <SvgIcon name="bell" size={20} />
        <L.Col ml={16} g={20}>
          <Font type="BODY_REGULAR" color="GREY0">
            알림을 놓치지 마세요
          </Font>
          <ButtonText
            textColor="LUCK_GREEN"
            onPress={handlePressAllowAlarm}
            text="알림 사용"
          />
        </L.Col>
      </L.Row>
      {/* 알림 리스트 */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data?.pages.flatMap((page) => page.content) || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}
    </FrameLayout>
  );
};
