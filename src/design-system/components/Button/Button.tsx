import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled, { css } from 'styled-components/native';
import { ColorKeys, Font, IconNames, L, SvgIcon } from '@design-system';

type ButtonStatus = 'normal' | 'disabled' | 'completed';
type ButtonType = 'action';
type ButtonSizing = 'fit-content' | 'stretch';

type ButtonProps = {
  type: ButtonType;
  text?: string;
  bgColor?: ColorKeys;
  textColor?: ColorKeys;
  sizing?: ButtonSizing;
  status?: ButtonStatus;
  onPress?: (status: ButtonStatus) => void;
  iconName?: IconNames;
  iconPosition?: 'leading' | 'tailing';
  iconGap?: number;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  onPress,
  iconName,
  sizing = 'fit-content',
  status = 'normal',
  bgColor = 'WHITE',
  textColor = 'BLACK',
  iconPosition = 'leading',
  iconGap = 4,
  disabled = false,
}) => {
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress && onPress(status)}
    >
      <Container
        type={type}
        sizing={sizing}
        bgColor={bgColor}
        status={status}
        pressed={pressed}
      >
        {!!iconName && iconPosition === 'leading' && (
          <L.Row pr={iconGap}>
            <SvgIcon name={iconName} size={20} color={textColor} />
          </L.Row>
        )}
        <Font type={'BODY_SEMIBOLD'} color={textColor}>
          {text}
        </Font>
        {!!iconName && iconPosition === 'tailing' && (
          <L.Row pl={iconGap}>
            <SvgIcon name={iconName} size={20} color={textColor} />
          </L.Row>
        )}
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View<{
  type: ButtonType;
  bgColor: ColorKeys;
  sizing: ButtonSizing;
  status: ButtonStatus;
  pressed: boolean;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, bgColor }) => theme[bgColor]};
  overflow: hidden;
  opacity: ${({ status, pressed }) => {
    if (pressed) return 0.9;
    return status === 'normal' ? 1 : 0.8;
  }};
  height: 52px;
  border-radius: 15px;
  ${({ sizing }) =>
    sizing === 'stretch'
      ? css`
          align-self: stretch;
          flex: 1;
        `
      : css`
          padding: 0 100px;
        `}
`;

export default Button;
