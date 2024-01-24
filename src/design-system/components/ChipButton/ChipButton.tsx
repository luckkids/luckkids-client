import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { ColorKeys, Font, IconNames, SvgIcon } from '@design-system';

type ChipButtonProps = {
  bgColor?: ColorKeys;
  textColor?: ColorKeys;
  onPress?: () => void;
  text: string;
  iconName?: IconNames;
};

const ChipButton: React.FC<ChipButtonProps> = ({
  text,
  onPress,
  bgColor = 'WHITE',
  textColor = 'BLACK',
  iconName,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container bgColor={bgColor}>
        <Font type={'BODY_SEMIBOLD'} mr={!!iconName ? 7 : 0} color={textColor}>
          {text}
        </Font>
        {!!iconName && <SvgIcon name={iconName} size={8} color={textColor} />}
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View<{
  bgColor: ColorKeys;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, bgColor }) => theme[bgColor]};
  border-radius: 999px;
  padding: 8px 14px;
`;

export default ChipButton;
