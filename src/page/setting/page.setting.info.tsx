import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import useNavigationService from '@hooks/navigation/useNavigationService';
import StackNavBar from "@components/common/StackNavBar/StackNavBar";
import {ButtonText, Colors, Font, L} from '@design-system';

const S = {
  Border: styled.View({
    borderTopColor:Colors.GREY5,
      borderTopWidth:'0.5px'
  }),
};

export const PageSettingInfo: React.FC = () => {

  return (
    <FrameLayout NavBar={<StackNavBar title={'계정'} useBackButton/>}>
        <S.Border/>
        <L.Col ph={25} pt={25} pb={15}>
            <Font type={'FOOTNOTE_SEMIBOLD'}>계정 정보</Font>
            <L.Col pt={30}>
                <Font type={'BODY_REGULAR'}>이메일</Font>
                <L.Col pt={7}>
                    <Font type={'SUBHEADLINE_REGULAR'} color={'GREY1'}>Luckids@gmail.com</Font>
                </L.Col>
            </L.Col>
        </L.Col>
        <L.Col ph={25} pt={25}>
            <Font type={'FOOTNOTE_SEMIBOLD'}>기타</Font>
            <L.Col pt={30}>
                <ButtonText onPress={()=> console.log('서비스이용약관')} text={'서비스 이용약관'} textColor={'WHITE'}/>
            </L.Col>
        </L.Col>
    </FrameLayout>
  );
};
