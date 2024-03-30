import React, { useEffect, useMemo, useState } from 'react';
import { Alert, TouchableWithoutFeedback, View } from 'react-native';
import styled from 'styled-components/native';
import { Button, Colors, Font, L, SvgIcon } from '@design-system';
import { DataDummyGarden } from '../data/dummy/data.dummy.garden';
import { ActionIcon } from '@components/common/ActionIcon';
import { GardenItem } from '@components/page/garden/garden.item';
import { GardenNavbar } from '@components/page/garden/garden.navbar';
import { GardenPopup } from '@components/page/garden/garden.popup';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import { IGarden, IGardenItem } from '@types-common/page.types';
import { GardenHorizontalItem } from '@components/page/garden/garden.horizontal.item';

const S = {
  listWrap: styled.View(
    {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    (props: { isList: boolean }) => {
      return {
        rowGap: props.isList ? 0 : 8,
        paddingHorizontal: props.isList ? 0 : 17,
      };
    },
  ),
  popupWrap: styled.View({
    backgroundColor: Colors.BG_SECONDARY,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 30,
    paddingHorizontal: 25,
  }),
  popupItemContainer: styled.View({
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  popupItemWrap: styled.View({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  popupItemLogo: styled.View({
    width: 50,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.GREY4,
    borderRadius: 50,
  }),
  buttonWrap: styled.View({
    marginTop: 35,
  }),
};

const onInviteHandler = () => {
  BottomSheet.show({
    component: (
      <S.popupWrap>
        <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
          친구를 어떻게 부를까요?
        </Font>
        <S.popupItemContainer>
          <S.popupItemWrap>
            <S.popupItemLogo style={{ backgroundColor: Colors.KAKAO_YELLOW }}>
              <SvgIcon name={'iconKakao'} size={20} />
            </S.popupItemLogo>
            <Font type={'BODY_REGULAR'} style={{ marginLeft: 16 }}>
              카카오톡 열기
            </Font>
          </S.popupItemWrap>
          <SvgIcon name={'arrow_right_gray'} size={8} />
        </S.popupItemContainer>
        <S.popupItemContainer>
          <S.popupItemWrap>
            <S.popupItemLogo>
              <SvgIcon name={'iconClip'} size={20} />
            </S.popupItemLogo>
            <Font type={'BODY_REGULAR'} style={{ marginLeft: 16 }}>
              초대 링크 복사
            </Font>
          </S.popupItemWrap>
          <SvgIcon name={'arrow_right_gray'} size={8} />
        </S.popupItemContainer>
        <S.buttonWrap>
          <Button
            type={'action'}
            text={'닫기'}
            bgColor={'LUCK_GREEN'}
            onPress={BottomSheet.hide}
          />
        </S.buttonWrap>
      </S.popupWrap>
    ),
  });
};

export const Garden: React.FC = () => {
  const navigation = useNavigationService();
  const [data, setData] = useState<IGarden>();
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
  useEffect(() => {
    onFetch();
  }, []);
  const friendData: Array<IGardenItem> | undefined = data?.friendList.content;
  const myData = data?.myProfile;
  const [isList, setIsList] = useState<boolean>(false);
  const [show, setShow] = useState<IGardenItem>({
    isShow: false,
    nickname: '',
    luckPhrase: '',
    imageFileUrl: '',
  });
  const dimProfile = useMemo(() => {
    if (!friendData) return;
    const temArray = [];
    if (isList) {
      for (let i = 0; i < 5 - (friendData.length + 1); i++) {
        temArray.push(
          <GardenHorizontalItem
            {...friendData[i]}
            isDimProfile={true}
            onPress={() => {}}
          />,
        );
      }
    } else {
      for (let i = 0; i < 15 - (friendData.length + 1); i++) {
        temArray.push(
          <GardenItem
            {...friendData[i]}
            isDimProfile={true}
            onPress={() => {}}
          />,
        );
      }
    }
    return temArray;
  }, [isList, data]);
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
      <S.listWrap isList={isList}>
        {myData &&
          (isList ? (
            <GardenHorizontalItem
              {...myData}
              onPress={() => setShow({ isShow: true, ...myData })}
              isSelf={true}
            />
          ) : (
            <GardenItem
              {...myData}
              onPress={() => setShow({ isShow: true, ...myData })}
              isSelf={true}
            />
          ))}
        {friendData?.map((item, i) => {
          if (isList) {
            return (
              <GardenHorizontalItem
                {...item}
                onPress={() => setShow({ isShow: true, ...item })}
                key={i}
              />
            );
          } else {
            return (
              <GardenItem
                {...item}
                onPress={() => setShow({ isShow: true, ...item })}
                key={i}
              />
            );
          }
        })}
        {dimProfile}
      </S.listWrap>
      <ActionIcon
        title={'친구를 초대할게요!'}
        isIcon={true}
        onPress={() => onInviteHandler()}
      />
      <GardenPopup
        title={show.luckPhrase}
        img={show.imageFileUrl}
        name={show.nickname}
        isShow={show.isShow ? show.isShow : false}
        setShow={setShow}
      />
    </FrameLayout>
  );
};
