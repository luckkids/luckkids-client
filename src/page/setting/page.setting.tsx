import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';
import { Font, SvgIcon, L } from '@design-system';
import ButtonText from '../../design-system/components/Button/ButtonText';

const S = {
  Wrap: styled.View({
    paddingVertical: 30,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#2C2C2C',
  }),
};

export const PageSetting: React.FC<IPage> = (props) => {
  return (
    <FrameLayout
      NavBar={
        <L.Row pt={12} pb={10} justify={'center'}>
          <Font type={'HEADLINE_SEMIBOLD'} color={'WHITE'} textAlign={'center'}>
            설정
          </Font>
        </L.Row>
      }
    >
      <S.Wrap>
        <Font type={'BODY_REGULAR'}>정럭키</Font>
        <ButtonText
          onPress={() => props.navigation.navigate(AppScreens.SettingProfile)}
          text={'프로필 수정'}
          textColor={'GREY1'}
        />
      </S.Wrap>
      <ButtonText
        onPress={() => props.navigation.navigate(AppScreens.SettingAlarm)}
      >
        <L.Row justify={'space-between'} ph={25} pv={20}>
          <Font type={'BODY_REGULAR'}>알림</Font>
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </ButtonText>
      <ButtonText
        onPress={() => props.navigation.navigate(AppScreens.SettingInfo)}
      >
        <L.Row justify={'space-between'} ph={25} pv={20}>
          <Font type={'BODY_REGULAR'}>계정</Font>
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </ButtonText>
      <ButtonText
        onPress={() => props.navigation.navigate(AppScreens.SettingSecurity)}
      >
        <L.Row justify={'space-between'} ph={25} pv={20}>
          <Font type={'BODY_REGULAR'}>보안</Font>
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </ButtonText>
      <ButtonText
        onPress={() => props.navigation.navigate(AppScreens.SettingNotice)}
      >
        <L.Row justify={'space-between'} ph={25} pv={20}>
          <Font type={'BODY_REGULAR'}>공지사항</Font>
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </ButtonText>
      <ButtonText
        onPress={() => props.navigation.navigate(AppScreens.SettingSecurity)}
      >
        <L.Row justify={'space-between'} ph={25} pv={20}>
          <Font type={'BODY_REGULAR'}>브랜드 스토리</Font>
          <SvgIcon name={'arrow_right_gray'} size={14} />
        </L.Row>
      </ButtonText>
      <L.Row justify={'space-between'} ph={25} pv={20}>
        <Font type={'BODY_REGULAR'}>버전 정보</Font>
        <Font type={'BODY_REGULAR'} color={'GREY1'}>
          최신 버전이에요!
        </Font>
      </L.Row>
      <ButtonText
        text={'로그아웃'}
        textColor={'WHITE'}
        cssProp={{
          paddingVertical: 20,
          paddingHorizontal: 25,
        }}
        onPress={() => props.navigation.navigate(AppScreens.Login)}
      />
      <ButtonText
        text={'탈퇴하기'}
        textColor={'WHITE'}
        cssProp={{
          paddingVertical: 20,
          paddingHorizontal: 25,
        }}
        onPress={() => props.navigation.navigate(AppScreens.SettingAccount)}
      />
    </FrameLayout>
  );
};
