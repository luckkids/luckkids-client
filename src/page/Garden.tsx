import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';
import { CONSTANTS, Font, L, SvgIcon } from '@design-system';
import { ActionIcon } from '@components/common/ActionIcon';
import GardenBottomSheet from '@components/page/garden/garden.bottom.sheet';
import { GardenHorizontalItem } from '@components/page/garden/garden.horizontal.item';
import { GardenItem } from '@components/page/garden/garden.item';
import { GardenNavbar } from '@components/page/garden/garden.navbar';
import { GardenPopup } from '@components/page/garden/garden.popup';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { IGarden, IGardenItem } from '@types-common/page.types';

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

const onInviteHandler = () => {
  BottomSheet.show({
    component: <GardenBottomSheet />,
  });
};

export const Garden: React.FC = () => {
  const navigation = useNavigationService();
  const [data, setData] = useState<IGarden>();
  const isFocusScreen = useIsFocused();
  const { onFetch } = useFetch({
    method: 'GET',
    url: '/garden/list?page=1&size=12',
    value: {},
    onSuccessCallback: (rtn) => setData(rtn),
    onFailCallback: () => {
      Alert.alert('데이터가 없습니다.');
      navigation.goBack();
    },
  });

  const friendData: Array<IGardenItem> | undefined = data?.friendList.content;

  const [isList, setIsList] = useState<boolean>(false);

  const [show, setShow] = useState<IGardenItem | null>(null);

  const myData = data?.myProfile;

  const dimProfile = useMemo(() => {
    if (!friendData) return [];
    const temArray = [];
    if (isList) {
      for (let i = 0; i < 5 - (friendData.length + 1); i++) {
        temArray.push(
          <GardenHorizontalItem item={null} key={i} isSelf={false} />,
        );
      }
    } else {
      for (let i = 0; i < 15 - (friendData.length + 1); i++) {
        temArray.push(<GardenItem item={null} key={i} isSelf={false} />);
      }
    }
    return temArray;
  }, [isList, friendData]);

  const handlePressFriendProfile = (friendItem: IGardenItem) => {
    setShow({ ...friendItem });
    const { friendId } = friendItem;

    if (!friendId) return;

    return navigation.navigate('GardenFriendProfile', {
      friendId,
    });
  };

  useEffect(() => {
    if (isFocusScreen) onFetch();
  }, [isFocusScreen]);

  return (
    <FrameLayout NavBar={<GardenNavbar />}>
      <L.Row pt={20} pb={24} ph={25} justify={'space-between'}>
        <Font type={'TITLE1_BOLD'}>가든</Font>
        <TouchableWithoutFeedback onPress={() => setIsList(!isList)}>
          <View>
            <SvgIcon name={!isList ? 'list' : 'album'} size={22} />
          </View>
        </TouchableWithoutFeedback>
      </L.Row>
      <ScrollView
        contentInset={{
          bottom: CONSTANTS.BOTTOM_TABBAR_HEIGHT + 132,
        }}
      >
        <S.listWrap isList={isList}>
          {myData &&
            (isList ? (
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
            ))}
          {friendData?.map((item, i) => {
            if (isList) {
              return (
                <GardenHorizontalItem
                  item={item}
                  onPress={() => handlePressFriendProfile(item)}
                  key={i}
                />
              );
            } else {
              return (
                <GardenItem
                  item={item}
                  onPress={() => handlePressFriendProfile(item)}
                  key={i}
                />
              );
            }
          })}
          {dimProfile}
        </S.listWrap>
      </ScrollView>
      <ActionIcon
        title={'친구를 초대할게요!'}
        isIcon={true}
        onPress={() => onInviteHandler()}
      />
      {show && <GardenPopup show={show} setShow={setShow} />}
    </FrameLayout>
  );
};
