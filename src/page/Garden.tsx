import React, {useEffect, useMemo, useState} from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { Button, Colors, Font, L, SvgIcon } from '@design-system';
import {DataDummyGarden} from "../data/dummy/data.dummy.garden";
import { ActionIcon } from '@components/common/ActionIcon';
import { GardenItem } from '@components/page/garden/garden.item';
import {GardenNavbar} from "@components/page/garden/garden.navbar";
import { GardenPopup } from '@components/page/garden/garden.popup';
import { FrameLayout } from '@frame/frame.layout';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import useNavigationService from '@hooks/navigation/useNavigationService';
import { useFetch } from '@hooks/useFetch';
import {IGardenItem} from "@types-common/page.types";

const S = {
  listWrap: styled.View({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    rowGap: 8,
    paddingHorizontal: 17,
  }),
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
  const dummyData = DataDummyGarden;
  const friendData = dummyData.data.friendList.content;
  const myData = dummyData.data.myProfile;
  const [show, setShow] = useState<IGardenItem>({isShow:false, nickname:'',luckPhrase:'',imageFileUrl:''});
  const [data, setData] = useState();
  const dummy = {
    nickname: "럭키즈 친구 2",
    luckPhrase: "행운 문구 2",
    imageFileUrl: 'assets/images/garden/charactor-lucky.png',
    characterCount: 1,
  };
  const dimProfile = useMemo(()=>{
    const temArray = [];
    for (let i =0; i < 15 - (friendData.length + 1); i++){
      temArray.push(<GardenItem {...dummy} isDimProfile={true} onPress={() =>{}}/>)
    }
    return temArray;
  },[])
  const { onFetch: missionList, isSuccess: missionListIsSuccess } = useFetch({
    method: 'GET',
    url: '/friends',
    value: {},
    // onSuccessCallback: (rtn) => setData(JSON.stringify()),
  });
  useEffect(() => {
    missionList();
    // console.log(data);
  }, []);
  return (
    <FrameLayout NavBar={<GardenNavbar/>}>
      <L.Row pt={20} pb={24} ph={25} justify={'space-between'}>
        <Font type={'TITLE1_BOLD'}>가든</Font>
        <TouchableWithoutFeedback onPress={() => console.log('ranking')}>
          <SvgIcon name={'album'} size={22} />
        </TouchableWithoutFeedback>
      </L.Row>
      <S.listWrap>
        {myData && <GardenItem {...myData} onPress={() => setShow({isShow:true, ...myData})} isSelf={true}/>}
        {friendData.map((item, i)=>{
          return <GardenItem {...item} onPress={() => setShow({isShow:true, ...item})} key={i}/>
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
