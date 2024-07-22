import { createElement } from 'react';
import { Platform, TouchableWithoutFeedback } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import styled from 'styled-components/native';
import { Button, Colors, Font, SvgIcon } from '@design-system';
import BottomSheet from '@global-components/common/BottomSheet/BottomSheet';
import SnackBar from '@global-components/common/SnackBar/SnackBar';
import Share from 'react-native-share';

const S = {
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

const onSnackBarHandler = () => {
  SnackBar.show({
    leftElement: createElement(SvgIcon, {
      name: 'lucky_check',
      size: 20,
    }),
    width: 185,
    title: `링크가 복사됐어요`,
    position: 'bottom',
  });
};

const shareOptions = {
  title: 'KaKao Title',
  message: '초대합니다',
  url: 'https://www.naver.com',
};

const onShare = async () => {
  try {
    const kakaoURL = `kakaolink://send?url=${encodeURIComponent(shareOptions.url)}&text=${encodeURIComponent(shareOptions.message)}`;
    const result = await Share.open(shareOptions);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};

export default function GardenBottomSheet() {
  /* const onSendMessage = async () => {
    try {
      const result = await login();
      if (result) {
        console.log(result);
        const msg = {
          templateId: '',
          templateArgs: {},
        };
      } else {
        console.log('Login Failed');
      }
    } catch (error) {
      console.log('[Error Code]: ', error);
      /!*snackBar.show({
            })*!/
    }
  };*/

  return (
    <S.popupWrap>
      <Font type={'HEADLINE_SEMIBOLD'} style={{ marginBottom: 10 }}>
        친구를 어떻게 부를까요?
      </Font>
      <TouchableWithoutFeedback onPress={() => onShare()}>
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
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => onSnackBarHandler()}>
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
      </TouchableWithoutFeedback>
      <S.buttonWrap>
        <Button
          type={'action'}
          text={'닫기'}
          bgColor={'LUCK_GREEN'}
          onPress={BottomSheet.hide}
        />
      </S.buttonWrap>
    </S.popupWrap>
  );
}
