import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Linking } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components/native';
import { SvgIcon, Font, ButtonText, Colors } from '@design-system';
import { useInfiniteHomeNotification } from '@queries';
import StackNavbar from '@components/common/StackNavBar/StackNavBar';
import HomeAlarmItem from '@components/page/home/home.alarm.item';
import { FrameLayout } from '@frame/frame.layout';
import useFirebaseMessage from '@hooks/notification/useFirebaseMessage';
import useAppStateEffect from '@hooks/useAppStateEffect';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { RecoilDevice } from '@recoil/recoil.device';
import { NotificationItem } from '@types-common/noti.types';

export const PageHomeAlarm: React.FC = () => {
  const { hasPermission } = useFirebaseMessage();
  const [showPushSetting, setShowPushSetting] = useState(false);
  const { deviceId } = useRecoilValue(RecoilDevice);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteHomeNotification(deviceId);

  const handlePressAllowAlarm = () => {
    Linking.openSettings();
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <HomeAlarmItem {...item} />
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

  const syncHasPermission = async () => {
    const isPermitted = await hasPermission();
    setShowPushSetting(isPermitted);
  };

  useAsyncEffect(syncHasPermission, []);
  useAppStateEffect(syncHasPermission, []);

  return (
    <FrameLayout NavBar={<StackNavbar title="알림" />}>
      {/* 알림 허용 정보 */}
      {!showPushSetting && (
        <S.onAlarm>
          <SvgIcon name={'bell'} size={20} />
          <S.onAlarmWrap>
            <Font type={'BODY_REGULAR'} color={'GREY0'}>
              알림이 꺼져있어요!
            </Font>
            <ButtonText
              onPress={handlePressAllowAlarm}
              fontType={'CAPTION1_SEMIBOLD'}
              text={'iOS 알림 설정'}
              cssProp={{
                backgroundColor: Colors.LUCK_GREEN,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
                marginTop: 20,
              }}
            />
          </S.onAlarmWrap>
        </S.onAlarm>
      )}
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

const S = {
  onAlarm: styled.View({
    paddingVertical: 25,
    paddingHorizontal: 30,
    flexDirection: 'row',
    borderWidth: '0.5px',
    borderStyle: 'solid',
    borderTopColor: Colors.GREY5,
    borderBottomColor: Colors.GREY5,
  }),
  onAlarmWrap: styled.View({
    flexDirection: 'column',
    alignItems: 'baseline',
    marginLeft: 16,
  }),
  itemContainer: styled.View({}),
};
