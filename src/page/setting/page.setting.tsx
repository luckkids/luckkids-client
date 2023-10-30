import React from 'react';
import styled from 'styled-components/native';
import { FrameLayout } from '@frame/frame.layout';
import { AppScreens, IPage } from '@types-common/page.types';

const S = {
  Text: styled.Text({
    textAlign: 'center',
  }),
  Button: styled.Button({}),
};

export const PageSetting: React.FC<IPage> = (props) => {
  return (
    <FrameLayout>
      <S.Text>설정</S.Text>
      <S.Button
        title={'프로필수정'}
        onPress={() => props.navigation.navigate(AppScreens.SettingProfile)}
      />
      <S.Button
        title={'알림'}
        onPress={() => props.navigation.navigate(AppScreens.SettingAlarm)}
      />
      <S.Button
        title={'계정'}
        onPress={() => props.navigation.navigate(AppScreens.SettingInfo)}
      />
      <S.Button
        title={'비밀번호 및 보안'}
        onPress={() => props.navigation.navigate(AppScreens.SettingSecurity)}
      />
      <S.Button
        title={'공지사항'}
        onPress={() => props.navigation.navigate(AppScreens.SettingNotice)}
      />
      <S.Button title={'브랜드 스토리'} />
      <S.Button title={'버전정보'} />
      <S.Button
        title={'로그아웃'}
        onPress={() => props.navigation.navigate(AppScreens.Login)}
      />
      <S.Button
        title={'탈퇴하기'}
        onPress={() => props.navigation.navigate(AppScreens.SettingAccount)}
      />
    </FrameLayout>
  );
};
