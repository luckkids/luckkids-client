import React from 'react';
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import styled from 'styled-components/native';
import { ColorKeys } from '@design-system';
import Icon from './TopNavigationIcon/TopNavigationIcon';
import LeftTitle from './TopNavigationLeftTitle/TopNavigationLeftTitle';
import Title from './TopNavigationTitle/TopNavigationTitle';
import L from '../../foundations/Layout';

export interface TopNavigationProps {
  useBackButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onBackPress?: () => void;
  bgColor?: ColorKeys;
  title?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  CenterComponent?: React.ReactNode;
}

const TopNavigation = ({
  useBackButton = true,
  containerStyle,
  onBackPress,
  bgColor,
  title,
  RightComponent,
  LeftComponent,
  CenterComponent,
}: TopNavigationProps) => {
  return (
    <Container bgColor={bgColor} style={containerStyle}>
      {/* title */}
      {!!title && <Title text={title} />}
      {/* CenterComponent */}
      {!!CenterComponent && (
        <CenterContainer>{CenterComponent}</CenterContainer>
      )}
      {/* BackButton / LeftComponent */}
      <IconContainer>
        {useBackButton && (
          <TouchableWithoutFeedback onPress={onBackPress}>
            <Icon
              onPress={onBackPress}
              color={'LUCK_GREEN'}
              name={'arrow_left'}
              size={24}
            />
          </TouchableWithoutFeedback>
        )}
        {LeftComponent}
      </IconContainer>
      {/* RightComponent */}
      <L.Row mr={16}>{RightComponent}</L.Row>
    </Container>
  );
};

const TOP_NAVIGATION_HEIGHT = 58;

const Container = styled.View<{ bgColor?: ColorKeys }>`
  width: 100%;
  height: ${TOP_NAVIGATION_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme, bgColor }) => theme[bgColor || 'TRANSPARENT']};
`;

const IconContainer = styled.View`
  flex-direction: row;
  margin-left: 16px;
`;

const CenterContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid green;
`;

TopNavigation.Icon = Icon;
TopNavigation.LeftTitle = LeftTitle;
TopNavigation.HEIGHT = TOP_NAVIGATION_HEIGHT;

export default TopNavigation;

export { TOP_NAVIGATION_HEIGHT };
