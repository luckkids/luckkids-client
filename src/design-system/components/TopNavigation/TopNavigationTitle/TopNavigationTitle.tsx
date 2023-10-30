import React from 'react';
import styled from 'styled-components/native';
import { ColorKeys, Font } from '@design-system';

const TopNavigationTitle: React.FC<TopNavigationTitleProps> = ({
  text,
  color = 'WHITE',
}) => {
  return (
    <Container>
      <Font type="BODY_SEMIBOLD" color={color} numberOfLines={1}>
        {text}
      </Font>
    </Container>
  );
};

const Container = styled.View`
  position: absolute;
  left: 20%;
  right: 20%;
  width: 60%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

type TopNavigationTitleProps = {
  text: string;
  color?: ColorKeys;
};

export default TopNavigationTitle;
