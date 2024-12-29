import React, { createElement, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { CONSTANTS, Font, L, SvgIcon } from '@design-system';
import { useInfiniteGardenList } from '@queries';
import { ActionIcon } from '@components/common/ActionIcon';
import GardenBottomSheet from '@components/page/garden/garden.bottom.sheet';
import { GardenHorizontalItem } from '@components/page/garden/garden.horizontal.item';
import { GardenItem } from '@components/page/garden/garden.item';
import { GardenNavbar } from '@components/page/garden/garden.navbar';
import { GardenPopup } from '@components/page/garden/garden.popup';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import useNavigationRoute from '@hooks/navigation/useNavigationRoute';
import useGoogleAnalytics from '@hooks/useGoogleAnalytics';
import { IGardenItem } from '@types-common/page.types';

const S = {
  listWrap: styled.View(
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginTop: 8,
    },
    (props: { isList: boolean }) => {
      return {
        rowGap: props.isList ? 0 : 8,
        paddingHorizontal: props.isList ? 0 : 21,
      };
    },
  ),
};

export const Garden: React.FC = () => {
  const { params } = useNavigationRoute('Garden');
  // const [data, setData] = useState<IGarden>();
  // const isFocusScreen = useIsFocused();
  // const { onFetch } = useFetch({
  //   method: 'GET',
  //   url: '/garden/list?page=1&size=12',
  //   value: {},
  //   onSuccessCallback: (rtn) => setData(rtn),
  //   onFailCallback: () => {
  //     Alert.alert('데이터가 없습니다.');
  //     navigation.goBack();
  //   },
  // });

  const { logEvent } = useGoogleAnalytics();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteGardenList();

  const friendData: Array<IGardenItem> | undefined =
    data?.pages.flatMap((page) => page.friendList.content) || [];
  const myData = data?.pages[0]?.myProfile;

  const [isList, setIsList] = useState<boolean>(false);

  const [show, setShow] = useState<IGardenItem | null>(null);

  // const dimProfile = useMemo(() => {
  //   if (!friendData) return [];
  //   const temArray = [];
  //   if (isList) {
  //     for (let i = 0; i < 5 - (friendData.length + 1); i++) {
  //       temArray.push(
  //         <GardenHorizontalItem item={null} key={i} isSelf={false} />,
  //       );
  //     }
  //   } else {
  //     for (let i = 0; i < 15 - (friendData.length + 1); i++) {
  //       temArray.push(<GardenItem item={null} key={i} isSelf={false} />);
  //     }
  //   }
  //   return temArray;
  // }, [isList, friendData]);

  const onInviteHandler = () => {
    BottomSheet.show({
      component: <GardenBottomSheet />,
    });

    logEvent({
      eventName: 'INVITE_FRIEND',
    });
  };

  const handlePressFriendProfile = (friendItem: IGardenItem) => {
    setShow({ ...friendItem });
    const { friendId } = friendItem;

    if (!friendId) return;
  };

  const renderItem = ({ item }: { item: IGardenItem | null }) => {
    if (!item) {
      if (isList) {
        return <GardenHorizontalItem item={null} isSelf={false} />;
      }
      return <GardenItem item={null} isSelf={false} />;
    }
    // 나
    if (item.myId) {
      if (!myData) return null;
      return isList ? (
        <GardenHorizontalItem
          item={myData}
          onPress={() => setShow({ ...myData })}
          isSelf={true}
        />
      ) : (
        <GardenItem
          item={myData}
          onPress={() => setShow({ ...myData })}
          isSelf={true}
        />
      );
    } else {
      if (isList) {
        return (
          <GardenHorizontalItem
            item={item}
            onPress={() => handlePressFriendProfile(item)}
          />
        );
      }
      return (
        <GardenItem
          item={item}
          onPress={() => handlePressFriendProfile(item)}
        />
      );
    }
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (params && params.isAddFriend)
      SnackBar.show({
        leftElement: createElement(SvgIcon, {
          name: 'lucky_check',
          size: 20,
        }),
        width: 200,
        title: '친구가 추가되었어요',
        position: 'bottom',
        rounded: 25,
        offsetY: 76,
      });
  }, [params, params?.isAddFriend]);

  return (
    <FrameLayout NavBar={<GardenNavbar />}>
      <L.Row pt={20} pb={24} ph={25} justify={'space-between'} outline="RED">
        <Font type={'TITLE1_BOLD'}>가든</Font>
        <TouchableWithoutFeedback onPress={() => setIsList(!isList)}>
          <View>
            <SvgIcon name={!isList ? 'list' : 'album'} size={22} />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          contentInset={{
            bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT + 132,
          }}
          data={(() => {
            const itemList = myData ? [myData, ...friendData] : friendData;
            const currentPage =
              data?.pages[data.pages.length - 1]?.friendList.pageInfo
                .currentPage || 1;
            const targetLength = 12 * currentPage;
            if (itemList.length < targetLength) {
              return [
                ...itemList,
                ...Array(targetLength - itemList.length).fill(null),
              ];
            }
            return itemList;
          })()}
          renderItem={renderItem}
          key={isList ? 'list' : 'grid'}
          horizontal={isList}
          numColumns={!isList ? 3 : 1}
          keyExtractor={(item, index) =>
            item?.myId?.toString() ||
            item?.friendId?.toString() ||
            index.toString()
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          style={{
            rowGap: isList ? 0 : 8,
            backgroundColor: 'red',
          }}
        />
      )}
      <ActionIcon
        title={'친구를 초대할게요!'}
        isIcon={true}
        onPress={() => onInviteHandler()}
      />
      {show && <GardenPopup show={show} setShow={setShow} />}
    </FrameLayout>
  );
};
