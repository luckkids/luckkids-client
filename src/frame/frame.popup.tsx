import styled from 'styled-components/native';
import { Colors, Font, L } from '@design-system';
import { RecoilPopupState } from '@recoil/recoil.popup';
import { useRecoilValue } from 'recoil';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Dim from 'react-native-linear-gradient';
import { DEFAULT_MARGIN } from '@constants';

export interface IPopup {
  title?: string;
  txt?: string;
  onClick?: TClick;
  onCancel?: TClick;
}

type TClick = {
  label: string;
  action?: () => void;
  isActive?: boolean;
};

const PopupBoxStyle = StyleSheet.create({
  Wrap: {
    backgroundColor: Colors.BG_SECONDARY,
    borderRadius: 15,
  },
  activeBtn: {
    backgroundColor: Colors.LUCK_GREEN,
  },
  inactiveBtn: {
    backgroundColor: Colors.BG_TERTIARY,
  },
});

const S = {
  Dim: styled.View({
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  }),
  ClickBtn: styled.View(
    {
      display: 'flex',
      borderRadius: 15,
      padding: 14,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    (props: { isActive?: boolean; isTwoColumn?: boolean }) => {
      return {
        backgroundColor: props.isActive
          ? Colors.LUCK_GREEN
          : Colors.BG_TERTIARY,
      };
    },
  ),
  PopupContainer: styled.View({
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  }),
};

export default function FramePopup() {
  const { isShow, title, txt, onClick, onCancel } =
    useRecoilValue(RecoilPopupState);
  if (!isShow) return <></>;
  return (
    <S.PopupContainer>
      <TouchableWithoutFeedback onPress={onCancel?.action}>
        <Dim
          colors={['#000', '#000']}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '100%',
            opacity: 0.6,
          }}
        ></Dim>
      </TouchableWithoutFeedback>
      <L.Col m={DEFAULT_MARGIN} style={PopupBoxStyle.Wrap}>
        <L.Col w={'100%'} p={16}>
          <Font type={'TITLE2_BOLD'}>{title}</Font>
          {txt !== '' && (
            <Font type={'BODY_REGULAR'} mt={10}>
              {txt}
            </Font>
          )}
          <L.Row mt={26} g={8}>
            <TouchableWithoutFeedback onPress={onCancel?.action}>
              <S.ClickBtn
                style={
                  onCancel?.isActive
                    ? PopupBoxStyle.activeBtn
                    : PopupBoxStyle.inactiveBtn
                }
                isActive={onCancel?.isActive}
                isTwoColumn={onClick !== undefined}
              >
                <Font
                  type={'BODY_SEMIBOLD'}
                  color={onCancel?.isActive ? 'BLACK' : 'WHITE'}
                >
                  {onCancel?.label}
                </Font>
              </S.ClickBtn>
            </TouchableWithoutFeedback>
            {onClick !== undefined && (
              <TouchableWithoutFeedback onPress={onClick.action}>
                <S.ClickBtn
                  isTwoColumn={true}
                  style={
                    onClick.isActive
                      ? PopupBoxStyle.activeBtn
                      : PopupBoxStyle.inactiveBtn
                  }
                >
                  <Font
                    type={'BODY_SEMIBOLD'}
                    color={onClick.isActive ? 'BLACK' : 'WHITE'}
                  >
                    {onClick.label}
                  </Font>
                </S.ClickBtn>
              </TouchableWithoutFeedback>
            )}
          </L.Row>
        </L.Col>
      </L.Col>
    </S.PopupContainer>
  );
}
