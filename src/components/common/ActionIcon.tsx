import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Dim from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { Font, SvgIcon } from '@design-system';
import Colors from '../../design-system/colors';

interface IActionIcon {
  title: string;
  isIcon?: boolean;
  bgColor?: string;
  isDim?: boolean;
}

const S = {
  wrap: styled.View({
    position: 'absolute',
    paddingHorizontal: 25,
    bottom: 35,
    width: '100%',
  }),
  button: styled.View(
    {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderRadius: 15,
      width: '100%',
    },
    (props: { bgColor?: string }) => {
      return {
        backgroundColor: props.bgColor ? props.bgColor : Colors.BG_TERTIARY,
      };
    },
  ),
  dimWrap: styled.View({
    height: 132,
  }),
};

export const ActionIcon: React.FC<IActionIcon> = ({
  title,
  isIcon,
  bgColor,
  isDim,
}) => {
  return (
    <>
      {isDim !== false && (
        <Dim
          colors={['transparent', '#000']}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <S.dimWrap />
        </Dim>
      )}
      <TouchableWithoutFeedback onPress={() => console.log('action')}>
        <S.wrap>
          <S.button bgColor={bgColor}>
            <Font type={'BODY_SEMIBOLD'} mr={isIcon ? 7 : 0}>
              {title}
            </Font>
            {isIcon && <SvgIcon name={'iconPlus'} size={20} />}
          </S.button>
        </S.wrap>
      </TouchableWithoutFeedback>
    </>
  );
};
