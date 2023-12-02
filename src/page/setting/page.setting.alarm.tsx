import React, {useState} from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import StackNavBar from "@components/common/StackNavBar/StackNavBar";
import {ButtonText, Font, SvgIcon, L, Colors, Toggle} from "@design-system";
import toggle from "../../design-system/components/Toggle/Toggle";

const S = {
    onAlarm: styled.View({
        paddingVertical:25,
        paddingHorizontal:30,
        flexDirection:'row',
        borderWidth:'0.5px',
        borderStyle:'solid',
        borderTopColor:Colors.GREY5,
        borderBottomColor:Colors.GREY5,
    }),
    onAlarmWrap:styled.View({
        flexDirection:'column',
        alignItems:'baseline',
        marginLeft:16
    }),
    itemContainer:styled.View({})
};

export const PageSettingAlarm: React.FC = () => {
    const [commentAlarm,setCommentAlarm] = useState<boolean>(false);
    const [appPush,setAppPush] = useState<boolean>(false);
    const [marketing,setMarketing] = useState<boolean>(false);
  return (
    <FrameLayout NavBar={<StackNavBar title={'알림'} useBackButton/>}>
      <S.onAlarm>
          <SvgIcon name={'bell'} size={20}/>
          <S.onAlarmWrap>
              <Font type={'BODY_REGULAR'} color={'GREY0'}>알림을 켜주세요.</Font>
              <ButtonText onPress={()=>console.log('알림설정')} fontType={'CAPTION1_SEMIBOLD'} text={'알림 설정'} cssProp={{
                  backgroundColor:Colors.LUCK_GREEN,
                  paddingHorizontal:14,
                  paddingVertical:8,
                  borderRadius:20,
                  marginTop:20
              }}/>
          </S.onAlarmWrap>
      </S.onAlarm>
        <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
            <Font type={'BODY_REGULAR'}>알림음</Font>
            <ButtonText onPress={()=>console.log('알림음')} text={'럭키'} textColor={'LUCK_GREEN'}/>
        </L.Row>
        <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
            <L.Col>
                <Font type={'BODY_REGULAR'}>오늘의 한마디 받아보기</Font>
                {!commentAlarm && <Font type={'FOOTNOTE_REGULAR'} color={'GREY1'}>매일 오전 7시에 행운의 한마디를 보내드려요.</Font>}
            </L.Col>
            <Toggle value={commentAlarm} onChange={setCommentAlarm} />
        </L.Row>
        <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
            <Font type={'BODY_REGULAR'}>앱 푸시 알림</Font>
            <Toggle value={appPush} onChange={setAppPush} />
        </L.Row>
        <L.Row ph={25} pv={20} justify={'space-between'} items={'center'}>
            <Font type={'BODY_REGULAR'}>마케팅 알림</Font>
            <Toggle value={marketing} onChange={setMarketing} />
        </L.Row>
    </FrameLayout>
  );
};
